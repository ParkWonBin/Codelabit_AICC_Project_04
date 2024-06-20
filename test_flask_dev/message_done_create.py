from flask import Flask  # Flask 모듈 임포트
from flask_cors import CORS
from flask_session import Session
import os
from dotenv import load_dotenv
from openai import AssistantEventHandler, OpenAI
from typing_extensions import override


load_dotenv()
# Flask 애플리케이션 초기화
app = Flask(__name__)
CORS(app)


# 세션 설정
app.config['SECRET_KEY'] = 'codelab1234'  # 보안을 위한 시크릿 키 설정, 실제 시크릿 키는 추측이 불가능하게 보안강도를 높여서 생성한다.
app.config['SESSION_TYPE'] = 'filesystem'  # 세션 데이터를 파일 시스템에 저장
Session(app)


# OpenAI API key 설정
OPEN_API_KEY =  os.getenv("OPEN_API_KEY_DECODING")
ASSISTANT_ID =  os.getenv("ASSISTANT_ID")


# 확인용 출력
print(f"OPEN_API_KEY: {OPEN_API_KEY}")
print(f"ASSISTANT_ID: {ASSISTANT_ID}")


if OPEN_API_KEY is None:
    raise ValueError("OPEM API Key 가 환경변수에 정의 되지 않았습니다.")


client = OpenAI(api_key=OPEN_API_KEY)

# Create a vector store called "Financial Statements"
vector_store = client.beta.vector_stores.create(name="Financial Statements")

# Ready the files for upload to OpenAI
file_paths = ["msg/goog-10k.txt", "msg/brka-10k.txt"]

file_streams = [open(path, "rb") for path in file_paths]

file_streams = [] 
for path in file_paths:
    absolute_path = os.path.abspath(path)
    if not os.path.exists(path):
        raise FileNotFoundError(f"File not found: {absolute_path}")
    file_streams.append(open(absolute_path, 'rb'))


# Use the upload and poll SDK helper to upload the files, add them to the vector store,
# and poll the status of the file batch for completion.
file_batch = client.beta.vector_stores.file_batches.upload_and_poll(
    vector_store_id=vector_store.id, files=file_streams
)

print(f"vector_store_id: {vector_store.id}")

batch = client.beta.vector_stores.file_batches.create_and_poll(
    vector_store_id="vs_abc123",
    file_ids=['file_1', 'file_2', 'file_3', 'file_4', 'file_5']
)

# You can print the status and the file counts of the batch to see the result of this operation.
print(f"file_batch.status: {file_batch.status}")
print(f"file_batch.status: {file_batch.file_counts}")

# Upload the user provided file to OpenAI
with open("msg/aapl-10k.pdf", "rb") as file:
    message_file = client.files.create(
        file=file, purpose="assistants"
    )

# Create a thread and attach the file to the message
thread = client.beta.threads.create(
    messages=[
        {
            "role": "user",
            "content": "10월 말 기준으로 AAPL의 발행 주식 수는 얼마였습니까??",
            "attachments": [
                {"file_id": message_file.id, "tools": [{"type": "file_search"}]}
            ],
        }
    ]
)

assistant = client.beta.assistants.update(
    assistant_id=ASSISTANT_ID,
    tool_resources={"file_search": {"vector_store_ids": [vector_store.id]}},
)

# The thread now has a vector store with that file in its tool resources.
print(thread.tool_resources.file_search)


class EventHandler(AssistantEventHandler):
    @override
    def on_text_created(self, text) -> None:
        print(f"\n{assistant} > ", end="", flush=True)

    @override
    def on_tool_call_created(self, tool_call):
        print(f"\n{assistant} > {tool_call.type}\n", flush=True)

    @override
    def on_message_done(self, message) -> None:
        # print a citation to the file searched
        message_content = message.content[0].text
        annotations = message_content.annotations
        citations = []
        for index, annotation in enumerate(annotations):
            message_content.value = message_content.value.replace(
                annotation.text, f"[{index}]"
            )
            if file_citation := getattr(annotation, "file_citation", None):
                cited_file = client.files.retrieve(file_citation.file_id)
                citations.append(f"[{index}] {cited_file.filename}")

        print(message_content.value)
        print("\n".join(citations))


# Then, we use the stream SDK helper
# with the EventHandler class to create the Run
# and stream the response.
with client.beta.threads.runs.stream(
    thread_id=thread.id,
    assistant_id=ASSISTANT_ID,
    instructions="Please address the user as Jane Doe. The user has a premium account.",
    event_handler=EventHandler(),
) as stream:
    stream.until_done()


# Retrieve the message object
message = client.beta.threads.messages.retrieve(
  thread_id="...",
  message_id="..."
)
# Extract the message content
message_content = message.content[0].text
annotations = message_content.annotations
citations = []
# Iterate over the annotations and add footnotes
for index, annotation in enumerate(annotations):
    # Replace the text with a footnote
    message_content.value = message_content.value.replace(annotation.text, f' [{index}]')
    # Gather citations based on annotation attributes
    if (file_citation := getattr(annotation, 'file_citation', None)):
        cited_file = client.files.retrieve(file_citation.file_id)
        citations.append(f'[{index}] {file_citation.quote} from {cited_file.filename}')
    elif (file_path := getattr(annotation, 'file_path', None)):
        cited_file = client.files.retrieve(file_path.file_id)
        citations.append(f'[{index}] Click <here> to download {cited_file.filename}')
        # Note: File download functionality not implemented above for brevity
# Add footnotes to the end of the message before displaying to user
message_content.value += '\n' + '\n'.join(citations)


if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=3000)

from typing_extensions import override
from openai import AssistantEventHandler, OpenAI
 
client = OpenAI()


vector_store = client.beta.vector_stores.create(name="Financial Statements")
 

file_paths = ["goog-10k.txt", "brka-10k.txt"]
file_streams = [open(path, "rb") for path in file_paths]
 
file_batch = client.beta.vector_stores.file_batches.upload_and_poll(
  vector_store_id=vector_store.id, files=file_streams
)
 

print(file_batch.status)
print(file_batch.file_counts)


message_file = client.files.create(
  file=open("api_10.txt", "rb"), purpose="assistants"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
)
 
thread = client.beta.threads.create(
  messages=[
    {
      "role": "user",
      "content": "How many shares of AAPL were outstanding at the end of of October 2023?",
      "attachments": [
        { "file_id": message_file.id, "tools": [{"type": "file_search"}] }
      ],
    }
  ]
)
 

print(thread.tool_resources.file_search)


assistant = client.beta.assistants.update(
  assistant_id=assistant.id,
  tool_resources={"file_search": {"vector_store_ids": [vector_store.id]}},
)

 
thread = client.beta.threads.create(
  messages=[
    {
      "role": "user",
      "content": "How many shares of AAPL were outstanding at the end of of October 2023?",
      "attachments": [
        { "file_id": message_file.id, "tools": [{"type": "file_search"}] }
      ],
    }
  ]
)
 

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



with client.beta.threads.runs.stream(
    thread_id=thread.id,
    assistant_id=assistant.id,
    instructions="Please address the user as Jane Doe. The user has a premium account.",
    event_handler=EventHandler(),
) as stream:
    stream.until_done()



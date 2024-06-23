import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
  api_key=os.getenv('OPENAI_API_KEY')
)

# my_assistants = client.beta.assistants.list(
#     order="desc",
#     limit="20",
# )
# print(my_assistants.data)

messages = client.beta.threads.messages.list(
    thread_id='thread_rbxeQ7knR8dfgE3IhY90rHUC',
    run_id = 'run_Wo3lEcOtWSaOuwZTAsx1dPyQ'
)

print(messages.data[0])


# {'data': [{'id': 'msg_tIVaLe7DGYs1WKA2znqSBRHK', 'assistant_id': 'asst_upMIcya1jn9Hjezi3sJeFnYp', 'attachments': [], 'content': [{'text': {'annotations': [], 'value': '안녕하세요! 
# 무엇을 도와드릴까요?'}, 'type': 'text'}], 'created_at': 1719138472, 'metadata': {}, 'object': 'thread.message', 'role': 
# 'assistant', 'run_id': 'run_Wo3lEcOtWSaOuwZTAsx1dPyQ', 'thread_id': 'thread_rbxeQ7knR8dfgE3IhY90rHUC'}], 'object': 'list', 'first_id': 'msg_tIVaLe7DGYs1WKA2znqSBRHK', 'last_id': 'msg_tIVaLe7DGYs1WKA2znqSBRHK', 'has_more': False}
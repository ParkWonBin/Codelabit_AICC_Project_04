import os
from test_init import init_env
import requests

init_env()


OPENAI_API_URL = 'https://api.openai.com'
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

# headers = {
#     'Authorization': f'Bearer {OPENAI_API_KEY}',
#     'Content-Type': 'application/json',
#     'OpenAI-Beta': 'assistants=v2'
# }

# response = requests.get(f"{OPENAI_API_URL}/v1/assistants", headers=headers)
# print(response.json())

#-----------------------------------------------
import openai
openai.api_key = os.getenv('OPENAI_API_KEY')

client = openai.OpenAI()
  
assistant = client.beta.assistants.create(
  name="Math Tutor",
  instructions="You are a personal math tutor. Write and run code to answer math questions.",
  tools=[],
  model="gpt-3.5-turbo",
)
print(assistant)
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
  api_key=os.getenv('OPENAI_API_KEY')
)

my_assistants = client.beta.assistants.list(
    order="desc",
    limit="20",
)
print(my_assistants.data)

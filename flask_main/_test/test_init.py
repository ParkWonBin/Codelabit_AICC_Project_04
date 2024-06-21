import os
from dotenv import load_dotenv

# 환경변수 불러오기
def init_env():
    load_dotenv()

    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
    print(f"OPENAI_API_KEY : {OPENAI_API_KEY}")
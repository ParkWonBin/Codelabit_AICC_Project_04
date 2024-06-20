import os
import openai
from flask import Flask
from flask_cors import CORS

from routes.gpt_assistant import gpt_assistant_bp
from routes.gpt_thread import gpt_thread_bp
from utils.db import init_db



# app 생성
app = Flask(__name__)
app.config.from_object('config.Config')  # 환경변수 받기 포함
openai.api_key = os.getenv('OPENAI_API_KEY')

# app 초기설정 
CORS(app)  
init_db(app)

# 라우터 설정
app.register_blueprint(gpt_assistant_bp, url_prefix='/api/assistant')
app.register_blueprint(gpt_thread_bp, url_prefix='/api/thread')

# 실행방법1 : flask run
# 실행방법2 : python app.py
if __name__ == '__main__':
    print( f"서버 실행 |  http://localhost:{CONFIG['port']}")
    app.run(
        host= os.getenv("FLASK_RUN_HOST"), 
        port= os.getenv("FLASK_RUN_PORT"), 
        debug= True if os.getenv("FLASK_ENV")== 'development' else False
    )

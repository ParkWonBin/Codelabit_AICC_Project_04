from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

# .env 파일에서 환경 변수를 로드합니다
load_dotenv()

app = Flask(__name__)
CORS(app)  # CORS 설정 추가

# 환경 변수 접근
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

@app.route('/')
def home():
    return f"""
    Hello, Flask with dotenv and CORS! 
    FLASK_ENV : {os.getenv('FLASK_ENV')}
    """

if __name__ == '__main__':
    app.run()
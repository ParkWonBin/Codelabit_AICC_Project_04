# Flask 개발을 위한 가이드
flask 설치 및 CORS 설정하기를 위한 가이드입니다. 
Flask 애플리케이션에 CORS (Cross-Origin Resource Sharing)를 설정하려면 `flask-cors` 패키지를 사용해야 합니다. 


#### 1. 필요한 패키지 설치
PowerShell을 열고 다음 명령어를 실행하여 필요한 패키지를 설치합니다:

```powershell
pip install flask python-dotenv flask-cors
```

#### 2. 프로젝트 및 `.env` 파일 생성
`flask_main` 디렉토리에 프로젝트 파일 및 `.env` 파일을 새로 생성합니다. 

프로젝트 폴더 및 파일 생성
```powershell
mkdir flask_main
cd flask_main
New-Item -Path .env -ItemType File
New-Item -Path app.py -ItemType File
New-Item -Path .gitignore -ItemType File
```

.env 파일 예시
```
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=test123
```

.gitignore 파일 예시
```
__pycache__/
```

#### 3. Flask에서 CORS 및 환경 변수 로드
`app.py`를 수정하여 `flask-cors`를 사용해 CORS를 설정하고 `python-dotenv`를 사용해 `.env` 파일에서 환경 변수를 로드합니다. 

```python
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
```

### 4. Flask 앱 실행

```powershell
flask run
```

-----

## 파일구조 확인
```
flask_main/
│
├── app.py
├── config.py
├── models.py
├── routes/
│   ├── gpt_assistant.py
│   └── gpt_thread.py
├── utils/
│   └── db.py
├── .env
└── requirements.txt
```

### 각 파일의 간단한 설명

- **app.py**: Flask 애플리케이션의 엔트리 포인트로, 블루프린트를 등록하고 서버를 실행합니다.
- **config.py**: 환경 변수를 로드하고 Flask 설정을 관리합니다.
- **models.py**: 데이터베이스 모델 정의 (해당 예제에서는 사용하지 않음).
- **routes/**: Flask 블루프린트를 사용하여 API 엔드포인트를 정의합니다.
  - **gpt_assistant.py**: OpenAI Assistants API와 통신하는 엔드포인트를 정의합니다.
  - **gpt_thread.py**: GPT Thread와 관련된 엔드포인트를 정의합니다.
- **utils/**: 유틸리티 함수 및 데이터베이스 초기화 코드를 포함합니다.
  - **db.py**: Oracle 데이터베이스와의 연결을 관리합니다.
- **.env**: 중요한 환경 변수를 저장합니다.
- **requirements.txt**: 프로젝트에서 필요한 Python 패키지를 나열합니다.
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
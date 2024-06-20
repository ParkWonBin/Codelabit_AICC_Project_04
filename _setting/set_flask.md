### 패키지 일괄 다운로드

`requirements.txt` 파일을 사용하여 필요한 패키지를 설치하려면, 프로젝트 루트 디렉토리에서 다음 명령어를 실행하세요:

```bash
pip install -r requirements.txt
```

### .env 설정 및 Flask 실행

`.env` 파일에 `FLASK_APP` 환경 변수를 설정하면 Flask CLI 명령어를 통해 애플리케이션을 실행할 수 있습니다.

#### `.env`
```
FLASK_APP=app.py
DATABASE_URI=oracle://username:password@host:port/service_name
SECRET_KEY=your_secret_key
OPENAI_API_KEY=your_openai_api_key
DB_USER=your_db_user
DB_PASSWORD=your_db_password
```

### Flask 애플리케이션 실행

프로젝트 루트 디렉토리에서 다음 명령어를 사용하여 Flask 애플리케이션을 실행할 수 있습니다:

```bash
flask run
```

이 명령어는 `FLASK_APP` 환경 변수에 지정된 파일(`app.py`)을 사용하여 애플리케이션을 실행합니다.

이제 `requirements.txt` 파일을 사용하여 필요한 패키지를 설치하고, `.env` 파일을 설정하여 Flask 애플리케이션을 쉽게 실행할 수 있습니다. 

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

---
이해했습니다. 그러면 Flask 애플리케이션에서는 OpenAI Assistants API에 요청을 보내고, cx_Oracle을 사용하여 Oracle 데이터베이스와 통신하도록 설정하겠습니다. `Flask-SQLAlchemy`를 배제하고 `cx_Oracle`만 사용하는 방식으로 코드를 수정하겠습니다.

### 1. 필요한 라이브러리 목록
`requirements.txt` 파일에 필요한 라이브러리 목록을 추가합니다.

#### `requirements.txt`
```
Flask
cx_Oracle
python-dotenv
requests
```

### 2. 환경 변수 설정
`.env` 파일을 사용하여 API 키와 데이터베이스 URI 등의 중요한 정보를 관리합니다.

#### `.env`
```
DATABASE_URI=oracle://username:password@host:port/service_name
SECRET_KEY=your_secret_key
OPENAI_API_KEY=your_openai_api_key
```

### 3. OpenAI Assistants API와 Oracle 데이터베이스 통합

#### `app.py`
```python
from flask import Flask
from routes.gpt_assistant import gpt_assistant_bp
from routes.gpt_thread import gpt_thread_bp
from utils.db import init_db

app = Flask(__name__)
app.config.from_object('config.Config')

init_db(app)

app.register_blueprint(gpt_assistant_bp, url_prefix='/api/assistant')
app.register_blueprint(gpt_thread_bp, url_prefix='/api/thread')

if __name__ == '__main__':
    app.run(debug=True)
```

#### `config.py`
```python
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    DATABASE_URI = os.getenv('DATABASE_URI')
    SECRET_KEY = os.getenv('SECRET_KEY')
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
```

#### `utils/db.py`
```python
import cx_Oracle

def init_db(app):
    dsn = cx_Oracle.makedsn('host', 'port', service_name='service_name')
    app.config['dsn'] = dsn
    app.config['db_user'] = 'username'
    app.config['db_password'] = 'password'

def get_db_connection():
    conn = cx_Oracle.connect(
        user='username',
        password='password',
        dsn=dsn
    )
    return conn
```

#### `routes/gpt_assistant.py`
```python
from flask import Blueprint, request, jsonify
import requests
import os

gpt_assistant_bp = Blueprint('gpt_assistant', __name__)

OPENAI_API_URL = 'https://platform.openai.com/assistants'
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

headers = {
    'Authorization': f'Bearer {OPENAI_API_KEY}',
    'Content-Type': 'application/json'
}

@gpt_assistant_bp.route('/', methods=['GET'])
def get_assistants():
    response = requests.get(OPENAI_API_URL, headers=headers)
    return jsonify(response.json())

@gpt_assistant_bp.route('/', methods=['POST'])
def create_assistant():
    data = request.get_json()
    response = requests.post(OPENAI_API_URL, headers=headers, json=data)
    return jsonify(response.json()), response.status_code

@gpt_assistant_bp.route('/<assistant_id>', methods=['GET'])
def get_assistant(assistant_id):
    response = requests.get(f'{OPENAI_API_URL}/{assistant_id}', headers=headers)
    return jsonify(response.json())

@gpt_assistant_bp.route('/<assistant_id>', methods=['PUT'])
def update_assistant(assistant_id):
    data = request.get_json()
    response = requests.put(f'{OPENAI_API_URL}/{assistant_id}', headers=headers, json=data)
    return jsonify(response.json())

@gpt_assistant_bp.route('/<assistant_id>', methods=['DELETE'])
def delete_assistant(assistant_id):
    response = requests.delete(f'{OPENAI_API_URL}/{assistant_id}', headers=headers)
    return '', response.status_code
```

#### `routes/gpt_thread.py`
```python
from flask import Blueprint, request, jsonify
from utils.db import get_db_connection

gpt_thread_bp = Blueprint('gpt_thread', __name__)

@gpt_thread_bp.route('/', methods=['POST'])
def create_thread():
    data = request.get_json()
    user_id = data['user_id']
    thread_id = data['thread_id']
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO gpt_thread (user_id, thread_id) VALUES (:user_id, :thread_id)",
        user_id=user_id, thread_id=thread_id
    )
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({'message': 'Thread created successfully'}), 201

@gpt_thread_bp.route('/<thread_id>/messages', methods=['GET'])
def get_messages(thread_id):
    # Implement your logic to retrieve messages from your message store
    messages = get_messages_from_store(thread_id)
    return jsonify(messages[:20])

@gpt_thread_bp.route('/<thread_id>/messages/since/<message_id>', methods=['GET'])
def get_messages_since(thread_id, message_id):
    # Implement your logic to retrieve messages since a specific message ID
    messages = get_messages_from_store_since(thread_id, message_id)
    return jsonify(messages)

@gpt_thread_bp.route('/<thread_id>/run', methods=['POST'])
def run_assistant(thread_id):
    data = request.get_json()
    assistant_id = data['assistant_id']
    input_text = data['input']

    # Make a request to OpenAI API to run the assistant
    response = requests.post(
        f'{OPENAI_API_URL}/{assistant_id}/run',
        headers=headers,
        json={'input': input_text}
    )

    return jsonify(response.json())
```

### 4. Oracle 데이터베이스 테이블 생성

Oracle 데이터베이스에 `gpt_thread` 테이블을 생성합니다.

```sql
CREATE TABLE gpt_thread (
    id NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    user_id VARCHAR2(255) NOT NULL,
    thread_id VARCHAR2(255) NOT NULL
);
```
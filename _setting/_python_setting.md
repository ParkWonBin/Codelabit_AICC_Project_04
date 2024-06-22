
# 가상환경 만들기
```bash
python -m venv venv
.\venv\Scripts\activate
```

권한 관련 에러난다면 powershell을 관리자 모드로 열고
아래 명령 시도 후 재시도
```shell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

# 실행
```shell
# 가상환경 생성, 다운로드, 실행
.\venv\Scripts\activate
pip install -r requirements.txt
flask run
```

```shell
# 빠져나가기
deactivate
```

# 환경변수 경로 관련해서 에러나면 아래 확인해보기
```python
import sys
print(sys.executable)

import openai
print(openai.__version__)
```


--------------
### .env 설정 및 Flask 실행

`.env` 파일에 `FLASK_APP` 환경 변수를 설정하면 Flask CLI 명령어를 통해 애플리케이션을 실행할 수 있습니다.

#### `.env`
```
FLASK_APP=app.py

FLASK_ENV=development
FLASK_RUN_HOST=localhost
FLASK_RUN_PORT=5001
```
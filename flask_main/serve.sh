#!/bin/bash
#--------------------------
# 사용법 : sh 파일에 파일 실행 권한 부여
# chmod +x serve.sh
# 실행
# ./serve.sh
#--------------------------
# 가상 환경 활성화
source venv/bin/activate

# 필요한 경우 주석을 해제하여 종속성을 설치합니다
# pip install -r requirements.txt

# Flask 애플리케이션 실행
flask run

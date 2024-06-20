# init 에서 설정한 Flask 객체 가져오기
from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from flask_restful import Resource

class index(Resource):
    def get(self):
        return {
            '성공여부':'성공', 
            '데이터':[1,2,3,4]
        }

# Flask 객체 초기화
app = Flask(__name__)

# CORS 적용
CORS(app)  

# 라우터 설정
api = Api(app)

# 경로없이 들어오면 정적 파일 보여주기
api.add_resource(index, '/')

# app.run : Flask 서버 구동, 기본 포트 5000번
if __name__ == "__main__":
    port = 4000
    print( f"서버 실행 |  http://localhost:{port}")
    app.run(host='localhost', port=port, debug=True)

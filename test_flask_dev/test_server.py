from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse
from flask import current_app
import requests
import json
from dotenv import load_dotenv
import os

load_dotenv()
# apiKey =  os.getenv("apiKey")
# access_key =  os.getenv("access_key")

class testAPI(Resource):
    def get(self):
        # 0. 기본 변수 가져오기
        apiKey =  os.getenv("apiKey")
        access_key =  os.getenv("access_key")

        # 1. 요청정보 만들기
        url = apiKey
        params = {
            'serviceKey': access_key,
            '_type': 'json',
            'instl_place': '구미시 인동가산로(신동) 임시검문소 앞 (가산→구미)',
            'la': 36.09518431,
            'lo' : 128.46654156,
            'mgc_rspnber': '경북지방경찰청',
            'telno' : '054-824-2452'
        }

        # 2. 해당 요청정보로 데이터를 가져온다.
        dataOpenAPI =  json.loads(requests.get(url, params=params).text)

        # 3. 가져온 데이터를 사용해서 결과물을 만든다.
        resultJson ={'data':[]}
        for i in range(len(dataOpenAPI['body'])):
            resultJson['data'].append({
            'name' : dataOpenAPI['body'][i]['mgc_rspnber'],
            '위도' : dataOpenAPI['body'][i]['la'],
            '경도' : dataOpenAPI['body'][i]['lo']
        })

        # 4. 결과물을 고객?에게 전달해준다. (리턴)
        return resultJson


class GeocordResource(Resource):
    def get(self):
        return searchAddress(request.args.get('address'))

def searchAddress(address):
    apikeyAddr = os.getenv("apikeyAddr")
    apiurl = "https://api.vworld.kr/req/search?"
    params = {
        "service": "search",
        "request": "search",
        "crs": "EPSG:4326",
        "query": address,
        "type": "address",
        "category": "road",
        "format": "json",
        "key": apikeyAddr,
    }
    
    response = requests.get(apiurl, params=params)
    print(response)

    data = response.json()
    print(data)


    result = {'data':[]}
    if data.get('response') and data['response'].get('result') and data['response']['result'].get('items'):
        for x in data['response']['result']['items']:
            result['data'].append({
                '주소': x['address']['road'],
                '위도': x['point']['y'],
                '경도': x['point']['x']
            })
    else:
        result['error'] = 'No results found'

    return result


def route_app(app):
    api = Api(app)

    # 경로없이 들어오면 정적 파일 보여주기
    api.add_resource(testAPI,'/')
    api.add_resource(GeocordResource, '/getGeocord')

def create_app():
    # Flask 객체 초기화
    app = Flask(__name__)

    # 정적 파일 디렉토리 설정
    app.static_folder = 'public'
    
    # URL 경로의 prefix 제거
    app.static_url_path = ''

    # CORS 적용
    CORS(app)  

    return app


app = create_app()
route_app(app)


# app.run : Flask 서버 구동, 기본 포트 5000번
if __name__ == "__main__":
    port = 4000
    print( f"서버 실행 |  http://localhost:{port}")
    app.run(host= '0.0.0.0',
        port= port, 
        debug= True)

from flask import Flask, request, jsonify, render_template, make_response
from geopy.geocoders import Nominatim
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse
from flask import current_app
import requests
import json
import random  # random 모듈 추가
from dotenv import load_dotenv
import os

load_dotenv()
# apiKey =  os.getenv("apiKey")
# access_key =  os.getenv("access_key")

class testAPI(Resource):
    def get(self):
        # 0. 기본 변수 가져오기
        url = os.getenv("url")
        access_keyA = os.getenv("access_keyA")
        # access_keyB = os.getenv("access_keyB")

        # 1. 요청정보 만들기
        url = url
        params = {
           'serviceKey': access_keyA, 
           'LAWD_CD': '11110', 
           'DEAL_YMD': '202305',
           '_type': 'json'
        }

        # 2. 해당 요청정보로 데이터를 가져온다.
        
        response = requests.get(url, params=params)
        dataOpenAPI =  json.loads(requests.get(url, params=params).text)
        # dataOpenAPI =  json.loads(response.text)
        # return response.text

        print(response)

        data = response.json()
        print(data)

        # 3. 가져온 데이터를 사용해서 결과물을 만든다.
        # resultJson ={'data':[]}
        # for i in range(len(dataOpenAPI['response']['body']['items']['item'])):
        #     resultJson['data'].append({
        #     # '건물면적' : dataOpenAPI['response']['body']['items']['item'][i]['건물면적'],
        #     '주소' : dataOpenAPI['response']['body']['items']['item']['법정동'],
        #     '주소지역' : dataOpenAPI['response']['body']['items']['item'][i]['시군구'],
        #     '용도지역' : dataOpenAPI['response']['body']['items']['item'][i]['용도지역']
        # })

        # 4. 결과물을 고객?에게 전달해준다. (리턴)
        # return resultJson

        resultJson ={'data':[]}
        items = dataOpenAPI.get('response', {}).get('body', {}).get('items', {}).get('item', [])
        
        geolocator = Nominatim(user_agent='chiricuto')
        for item in items:
            location = geolocator.geocode(item.get('시군구'))

            # print(f'AAAAAAA:',addr)  
            # latitude = location.latitude
            # longitude = location.longitude 
            # print(f'위도:',latitude)  
            # print(f'경도:',longitude)  
        
            # try:
            resultJson['data'].append({
                '건물면적': item.get('건물면적'),
                '주소': item.get('법정동'),
                '주소지역': item.get('시군구'),
                '용도지역': item.get('용도지역'),
                '위도':location.latitude,
                '경도':location.longitude
            })
            # except KeyError as e:
                # continue  # 또는 로그 찍기 등의 예외 처리
        # 결과를 JSON 문자열로 변환하여 반환
        # return json.dumps(resultJson, ensure_ascii=False)
        return jsonify(resultJson)
        


# class GeocordResource(Resource):
#     def get(self):
#         return searchAddress(request.args.get('address'))

# def searchAddress(address):
#     apikeyAddr = os.getenv("apikeyAddr")
#     apiurl = "https://api.vworld.kr/req/search?"
#     params = {
#         "service": "search",
#         "request": "search",
#         "crs": "EPSG:4326",
#         "query": address,
#         "type": "address",
#         "category": "road",
#         "format": "json",
#         "key": apikey,
#     }
    
#     response = requests.get(apiurl, params=params)
#     print(response)

#     data = response.json()
#     print(data)


#     result = {'data':[]}
#     if data.get('response') and data['response'].get('result') and data['response']['result'].get('items'):
#         for x in data['response']['result']['items']:
#             result['data'].append({
#                 '주소': x['address']['road'],
#                 '위도': x['point']['y'],
#                 '경도': x['point']['x']
#             })
#     else:
#         result['error'] = 'No results found'

#     return result

class BudongInfo(Resource):
           
    def get(self):
        
        item = ["청운동", "통의동", "체부동", "당주동", "신문로1가", "청진동", "수송동", "삼청동", "계동", "돈의동"]
        result = {'info': item}  # 모든 이름을 'info' 키에 리스트로 저장
        return result

        # temp =  ["상철", "영희", "철수", "미자", "준호", "수진", "태영", "지원", "민수", "서연"]
        # result ={'info':[]}
        # for i in temp:

            # 랜덤하게 이름 선택
            # budong_info = random.choice(i)
            # Api(app).add_resource(BudongInfo,'/budong_info')
            #  top_product = i
        # return {"name": top_product}
        #    info = {"name": i}
        # return info

class getData(Resource):
    def get(self):
        data =  [
           {"번호": 1, "건물면적": 680.83, "용도지역": "제1종일반주거", "위도": 37.5806949 ,"경도": 126.9827989 , "주소": "통의동"  , "주소지역": "종로구" },
           {"번호": 2, "건물면적": 680.83, "용도지역": "제1종일반주거", "위도": 37.5806949 ,"경도": 126.9827989 , "주소": "통의동"  , "주소지역": "종로구" },
           {"번호": 3, "건물면적": 680.83, "용도지역": "제1종일반주거", "위도": 37.5806949 ,"경도": 126.9827989 , "주소": "통의동"  , "주소지역": "종로구" },
           {"번호": 4, "건물면적": 345.28, "용도지역": "제2종일반주거", "위도": 37.5806949, "경도": 126.9827989,  "주소": "체부동",   "주소지역": "종로구" },
           {"번호": 5, "건물면적": 14.34,  "용도지역": "일반상업",      "위도": 37.5806949, "경도": 126.9827989,  "주소": "당주동",   "주소지역": "종로구" },
           {"번호": 6, "건물면적": 26.04,  "용도지역": "일반상업",      "위도": 37.5806949,  "경도": 126.9827989, "주소": "당주동",    "주소지역": "종로구"},
           {"번호": 7, "건물면적": 728.18, "용도지역": "일반상업",      "위도": 37.5806949,  "경도": 126.9827989, "주소": "신문로1가",  "주소지역": "종로구"}
        ]
        return data

class Detail(Resource):
    def get(self):
        # return {"data": data}, 200
        html = render_template('detail.html')
        
        # make_response를 사용하여 응답 객체 생성
        response = make_response(html)

        response.headers['Content-Type'] = 'text/html'
        
        return response


def route_app(app):
   
    # 경로없이 들어오면 정적 파일 보여주기
    Api(app).add_resource(testAPI,'/')
    # api.add_resource(GeocordResource, '/getGeocord')
    Api(app).add_resource(BudongInfo,'/budong_info')
    Api(app).add_resource(getData,'/getData')
    Api(app).add_resource(Detail,'/detail')
    
    
def create_app():
    # Flask 객체 초기화
    app = Flask(__name__, template_folder='templates')

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

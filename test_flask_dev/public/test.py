import requests
from dotenv import load_dotenv
import os

load_dotenv()

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


address = "서울%20금천구%20가산디지털2로%20144%20현대테라타워%20가산DK%20A동%2020층"
print(searchAddress(address))
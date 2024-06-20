from flask import Flask, request, jsonify,  make_response
import cx_Oracle
import json
from flask_cors import CORS  # 추가
from dotenv import load_dotenv
import os

# 메세지 flask 컨트롤러 서버부분/ CRUD 데이터 처리 및 저장 부분입니다. [데이터입력, 검색 테스트만 가능]

app = Flask(__name__)
CORS(app)
load_dotenv()
# 오라클 데이터베이스 연결 정보
dsn_tns = cx_Oracle.makedsn('localhost', '1521', service_name='xe')
connection = cx_Oracle.connect(user='chat_table', password='1111', dsn=dsn_tns)

# 쓰레드아이디: thread_id를 입력하면 새로운 채탕방 생성   thread_id
# thread_id = os.getenv("thread_id")

@app.route('/add_client_thread', methods=['POST'])
def add_client_thread():
    data = request.json
    
    content = data['content']
    # thread_id = data['thread_id']
    # assistant_id = data['assistant_id']
    print(f"request.json: {jsonify(data)}")
    cursor = connection.cursor()

    query  =  "INSERT INTO security_info_old (thread_id, assistant_id, message_content) VALUES (:1, :2, :3)"
    cursor.execute(query,('thread_112124525t_qwert', 'azues123455', content) )
    connection.commit()
    cursor.close()

    response = {
        'status': 'success',
        'answer': '질문이 성공적으로 저장되었습니다.'
    }

    return jsonify(response)

@app.route('/get_client_threads', methods=['GET'])
def get_client_threads():
    cursor = connection.cursor()
    cursor.execute("SELECT thread_id, assistant_id, message_content FROM security_info_old")
    rows = cursor.fetchall()
    cursor.close()
    client_threads = []

    idx = 1  # 인덱스를 1로 초기화
    for row in rows:
        client_threads.append({
            'index': idx,         
            'thread_id': row[0],
            'assistant_id': row[1],
            'message_content': row[2]
        })
        idx += 1 

    return jsonify(client_threads)


@app.route('/get_thread_messages/<thread_id>', methods=['GET'])
def get_thread_messages(thread_id):
    print(f"thread_id: {thread_id}")
    cursor = connection.cursor()
    cursor.execute("SELECT thread_id, assistant_id, message_content FROM security_info_old WHERE thread_id = :thread_id", {'thread_id': thread_id})
    
    rows = cursor.fetchall()
    cursor.close()
    messages = [{'thread_id': row[0], 'assistant_id': row[1], 'message_content': row[2].encode('utf-8').decode('utf-8')} for row in rows]



     # JSON 응답 생성
    response_data = json.dumps(messages, ensure_ascii=False, indent=4)
    response = make_response(response_data)
    response.headers['Content-Type'] = 'application/json; charset=utf-8'
    
    print(f"message_content: {response.get_data(as_text=True)}")
    return response


if __name__ == '__main__':
    app.run(debug=True, host='localhost')

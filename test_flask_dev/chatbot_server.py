import socket
import threading
import requests
import json

# 서버 설정
HOST = '0.0.0.0'
PORT = 4000
FLASK_API_URL = 'http://localhost:{PORT}/add_client_thread'

# 클라이언트 핸들링 함수
def handle_client(client_socket, assistant_id, thread_id):
    print(f"새로운 연결 시작: {assistant_id} (Thread ID: {thread_id})")

    # thread_id와 assistant_id를 Flask 서버로 전송하여 DB에 저장
    data = {
        'thread_id': thread_id,
        'assistant_id': f"{assistant_id[0]}:{assistant_id[1]}"
    }
    headers = {'Content-Type': 'application/json'}
    response = requests.post(FLASK_API_URL, data=json.dumps(data), headers=headers)
    print(response.json())
    print(f"FLASK_API_URL : {FLASK_API_URL}")

    while True:
        try:
            message = client_socket.recv(1024).decode('utf-8')
            if not message:
                break
            print(f"[{thread_id}] {assistant_id}: {message}")
            client_socket.send(f"Received: {message}".encode('utf-8'))
        except:
            break
    client_socket.close()
    print(f"Connection closed: {assistant_id} (Thread ID: {thread_id})")

# 서버 시작
def start_server():
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind((HOST, PORT))
    server_socket.listen(5)
    print("서버 실행 중.. Waiting for connections 연결을 기다립니다...")

    thread_id = 0
    while True:
        client_socket, assistant_id = server_socket.accept()
        thread_id += 1
        client_thread = threading.Thread(target=handle_client, args=(client_socket, assistant_id, thread_id))
        client_thread.start()

if __name__ == "__main__":
    start_server()

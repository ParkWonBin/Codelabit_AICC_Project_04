from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_session import Session
from openai import OpenAI
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)
load_dotenv()
# dotenv 중요한 정보는 코드에 넣지 말고, 코드 파일 밖으로 빼기
# 세션 설정
app.config['SECRET_KEY'] = 'codelab1234'  # 보안을 위한 시크릿 키 설정, 실제 시크릿 키는 추측이 불가능하게 보안강도를 높여서 생성한다.
app.config['SESSION_TYPE'] = 'filesystem'  # 세션 데이터를 파일 시스템에 저장
Session(app)

# OpenAI API key 설정
OPEN_API_KEY = os.getenv("OPEN_API_KEY_DECODING")
ASSISTANT_ID = os.getenv("ASSISTANT_ID")

client = OpenAI(api_key=OPEN_API_KEY)

@app.route('/ere', methods=['POST'])
def solve_equation():
    content = request.json['content']
    print(f'content:  {content}')

    # 쓰레드 ID가 세션에 없으면 새로운 쓰레드 생성
    if 'thread_id' not in session:
        thread = client.beta.threads.create()
        print(f'thread_id: {thread.id}')
        session['thread_id'] = thread.id

    try:
        # 사용자 메시지를 처리하는 메시지 생성
        message = client.beta.threads.messages.create(
            thread_id=session['thread_id'],
            role="user",
            content=content
        )
        # 결과를 받기 위해 실행
        run = client.beta.threads.runs.create_and_poll(
            thread_id=session['thread_id'],
            assistant_id=ASSISTANT_ID,
        )

        if run.status == 'completed':

            # 모든 메시지를 가져오고 마지막 메시지의 내용을 반환
            messages = client.beta.threads.messages.list(thread_id=session['thread_id'])
            last_message = next((m for m in reversed(messages.data) if m.role == 'assistant'), None)
            print(f'last_message: {last_message}')
            if last_message:
                return jsonify({"status": "success", "answer": last_message.content[0].text.value})
            else:
                return jsonify({"status": "error", "message": "No response from assistant"})
        else:
            return jsonify({"status": "error", "message": "Failed to complete the run"})

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})


if __name__ == '__main__':
    app.run(debug=True, host='localhost',  port=4000)

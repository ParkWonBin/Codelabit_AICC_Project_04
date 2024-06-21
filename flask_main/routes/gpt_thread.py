from flask import Blueprint, request, jsonify
from utils.db import get_db_connection
import openai

client = openai.OpenAI()
# https://platform.openai.com/docs/api-reference/threads

gpt_thread_bp = Blueprint('gpt_thread', __name__)
#생성 # curl -X POST http://localhost:5001/api/thread/
#조회 # curl -X GET http://localhost:5001/api/thread/{thread_id}
#삭제 # curl -X POST http://localhost:5001/api/thread/delete/{thread_id}

@gpt_thread_bp.route('/', methods=['POST'])
def create_thread():
    # curl -X POST http://localhost:5001/api/thread/
    # OK
    try:
        empty_thread = client.beta.threads.create()
        print(empty_thread)

        thread_id = empty_thread.id
        
        # data = request.get_json()
        # user_id = data['user_id']
        # Uncomment and use the below lines to save to the database
        # conn = get_db_connection()
        # cursor = conn.cursor()
        # cursor.execute(
        #     "INSERT INTO gpt_thread (user_id, thread_id) VALUES (:user_id, :thread_id)",
        #     user_id=user_id, thread_id=thread_id
        # )
        # conn.commit()
        # cursor.close()
        # conn.close()
        resultData = {
            'message': 'Thread created successfully', 
            'thread_id': thread_id
            }
        
        return jsonify(resultData), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@gpt_thread_bp.route('/<string:thread_id>', methods=['GET'])
def get_messages(thread_id):
    messages = client.beta.threads.messages.list(thread_id)
    return jsonify(messages.to_dict())


@gpt_thread_bp.route('/delete/<string:thread_id>', methods=['POST'])
def delete_thread(thread_id):
    try:
        thread = client.beta.threads.delete(thread_id)
        print(thread)

        # data = request.get_json()
        # user_id = data['user_id']

        # conn = get_db_connection()
        # cursor = conn.cursor()
        # cursor.execute(
        #     "DLETE gpt_thread WHERE user_id = :user_id AND thread_id = :thread_id",
        #     user_id=user_id, thread_id=thread_id
        # )
        # conn.commit()
        # cursor.close()
        # conn.close()
        # resultData = {
        #     'message': 'Thread Deleted successfully',
        #     'response': response.todic()
        #     }
        # 
        
        threads_data = thread.to_dict() 
        return jsonify(threads_data), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

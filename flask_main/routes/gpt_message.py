from flask import Blueprint, request, jsonify
import openai

client = openai.OpenAI()
### 참고 ### https://platform.openai.com/docs/api-reference/messages

gpt_message_bp = Blueprint('gpt_message', __name__)

# 메시지 생성
@gpt_message_bp.route('/<string:thread_id>', methods=['POST'])
def create_message(thread_id):
    data = request.get_json()

    role = data.get('role',"user")
    content = data.get('content')

    try:
        message = client.beta.threads.messages.create(
            thread_id=thread_id,
            role=role,
            content=content
        )
        return jsonify(message.to_dict()), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# 메시지 조회
@gpt_message_bp.route('/<string:thread_id>/<string:message_id>', methods=['GET'])
def get_message(thread_id,message_id):
    try:
        message = client.beta.threads.messages.retrieve(
            message_id=message_id,
            thread_id=thread_id
        )
        return jsonify(message.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# 메시지 삭제
@gpt_message_bp.route('/delete/<string:thread_id>/<string:message_id>', methods=['POST'])
def delete_message(thread_id,message_id):
    try:
        client.beta.threads.messages.delete(
            message_id=message_id,
            thread_id=thread_id
        )
        # TODO: 삭제 성공 후 응답 안돌아오는 이슈 있음.
        return jsonify({'message': 'Message deleted successfully'}), 204
    except Exception as e:
        return jsonify({'error': str(e)}), 400

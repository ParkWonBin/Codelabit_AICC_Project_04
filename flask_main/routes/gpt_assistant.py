from flask import Blueprint, request, jsonify
import openai
 
client = openai.OpenAI()
# https://platform.openai.com/docs/api-reference/assistants

gpt_assistant_bp = Blueprint('gpt_assistant', __name__)
#전체 # curl -X GET http://localhost:5001/api/assistant/
#생성 # curl -X POST http://localhost:5001/api/assistant/
#조회 # curl -X GET
#수정 # curl -X GET
#삭제 # curl -X GET

# asst_LzYnKK8vcsK7SOYkQ9LRbzDr

@gpt_assistant_bp.route('/', methods=['GET'])
def get_assistants():
    try:
        assistants = client.beta.assistants.list(
            order="desc",
            limit="20",
        )
         # JSON 직렬화 가능하도록 변환
        assistants_data = [assistant.to_dict() for assistant in assistants]
        return jsonify(assistants_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@gpt_assistant_bp.route('/', methods=['POST'])
def create_assistant():
    # curl -X POST http://localhost:5001/api/assistant/
    data = request.get_json()
    print(data)
    
    name = data.get('name')
    instructions = data.get('instructions')
    tools = data.get('tools', [])
    model = data.get('model', "gpt-3.5-turbo")

    try:
        assistant = client.beta.assistants.create(
            name=name,
            instructions=instructions,
            tools=tools,
            model=model
        )

        return jsonify(assistant.to_dict() ), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@gpt_assistant_bp.route('/<assistant_id>', methods=['GET'])
def get_assistant(assistant_id):
    try:
        assistant = client.beta.assistants.retrieve(assistant_id)
        return jsonify(assistant.to_dict() )
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@gpt_assistant_bp.route('/<assistant_id>', methods=['PUT'])
def update_assistant(assistant_id):
    data = request.get_json()
    updates = {key: data[key] for key in data if key in ['name', 'instructions', 'tools', 'model']}

    try:
        assistant = client.beta.assistants.update(assistant_id, **updates)
        assistants_data = assistant.to_dict() 
        return jsonify(assistants_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@gpt_assistant_bp.route('/<assistant_id>', methods=['DELETE'])
def delete_assistant(assistant_id):
    try:
        client.beta.assistants.delete(assistant_id)
        return '', 204
    except Exception as e:
        return jsonify({'error': str(e)}), 400

from flask import Blueprint, request, jsonify
import openai

client = openai.OpenAI()

gpt_runs_bp = Blueprint('gpt_runs', __name__)

# 실행 생성
@gpt_runs_bp.route('/<string:thread_id>/<string:assistant_id>', methods=['POST'])
def create_run(thread_id,assistant_id):
    try:
        run = client.beta.threads.runs.create(
            thread_id=thread_id,
            assistant_id=assistant_id
        )
        return jsonify(run.to_dict()), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# 실행 조회
@gpt_runs_bp.route('/<string:thread_id>/<string:run_id>', methods=['GET'])
def get_run(thread_id,run_id):
    try:
        run = client.beta.threads.runs.retrieve(
            thread_id=thread_id,
            run_id=run_id
        )
        return jsonify(run.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 400

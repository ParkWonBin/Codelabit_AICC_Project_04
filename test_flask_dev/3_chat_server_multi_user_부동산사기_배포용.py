from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_session import Session
import os
from dotenv import load_dotenv
from konlpy.tag import Okt
from openai import OpenAI  # Assuming OpenAI is the client for OpenAI's API

app = Flask(__name__)
CORS(app)
load_dotenv()
# 세션 설정
app.config['SECRET_KEY'] = 'codelab1234'  # 보안을 위한 시크릿 키 설정
app.config['SESSION_TYPE'] = 'filesystem'  # 세션 데이터를 파일 시스템에 저장
Session(app)

# OpenAI API key 설정
OPEN_API_KEY = os.getenv("OPEN_API_KEY_DECODING")
ASSISTANT_ID = os.getenv("ASSISTANT_ID")

client = OpenAI(api_key=OPEN_API_KEY)

fraud_words_kor = {
    '사기': -1.0, '기만': -1.0, '속임수': -1.0, '위조': -1.0, '횡령': -1.0,
    '조작': -1.0, '탈세': -1.0, '편취': -1.0, '불법': -1.0, '유용': -1.0,
    '부정': -1.0, '공갈': -1.0, '뇌물': -1.0, '사취': -1.0, '사기꾼': -1.0,
    '속임': -1.0, '사기행위': -1.0, '부정행위': -1.0, '허위': -1.0, '가짜': -1.0,
    '위증': -1.0, '위계': -1.0, '속임계획': -1.0, '사기꾼': -1.0, '사기꾼들': -1.0,
    '기만행위': -1.0, '거짓말': -1.0, '부정이익': -1.0, '사기행각': -1.0, '부정소득': -1.0,
    '사기범': -1.0, '사기집단': -1.0, '불법활동': -1.0, '위장': -1.0, '사기성': -1.0,
    '기만전술': -1.0, '편법': -1.0, '사기거래': -1.0, '사기성거래': -1.0, '사기적': -1.0,
    '사기행위자': -1.0, '사기집단': -1.0, '사기범죄': -1.0, '범죄행위': -1.0, '범죄자': -1.0,
    '범죄집단': -1.0, '사기기술': -1.0, '사기술': -1.0, '위반행위': -1.0, '위반자': -1.0,
    '위법행위': -1.0, '위법자': -1.0, '위법': -1.0, '불법자금': -1.0, '불법거래': -1.0,
    '불법이익': -1.0, '불법소득': -1.0, '불법행위': -1.0, '범죄의혹': -1.0, '범죄혐의': -1.0,
    '범죄수익': -1.0, '범죄자산': -1.0, '범죄행위자': -1.0, '사기범죄자': -1.0, '사기피해자': -1.0,
    '사기피해': -1.0, '사기손실': -1.0, '사기금액': -1.0, '사기금': -1.0, '사기수법': -1.0,
    '사기수단': -1.0, '사기기법': -1.0, '사기전술': -1.0, '사기술수': -1.0, '사기행각': -1.0,
    '사기행동': -1.0, '사기성향': -1.0, '사기범행': -1.0, '사기의혹': -1.0, '사기혐의': -1.0,
    '사기조작': -1.0, '사기계획': -1.0, '사기증거': -1.0, '사기행적': -1.0, '사기진술': -1.0,
    '사기조사': -1.0, '사기조작자': -1.0, '사기증언': -1.0, '사기배후': -1.0, '사기음모': -1.0,
    '사기공작': -1.0, '사기계략': -1.0, '사기꾼의': -1.0, '사기소송': -1.0, '사기행위자': -1.0,
    '사기비리': -1.0, '사기혐의자': -1.0, '사기증거물': -1.0, '사기수익자': -1.0, '사기성수익': -1.0
}

real_estate_fraud_words_kor = {
    '부동산 사기': -1.0, '전세 사기': -1.0, '임대 사기': -1.0, '허위 매물': -1.0, '무허가 건축물': -1.0,
    '가짜 계약서': -1.0, '전세금 반환 사기': -1.0, '불법 전대': -1.0, '이중 계약': -1.0, '가압류': -1.0,
    '매도인 사기': -1.0, '명도 소송': -1.0, '명의 도용': -1.0, '위장 전입': -1.0, '전세금 사기': -1.0,
    '중개사기': -1.0, '사기 분양': -1.0, '허위 공시가격': -1.0, '위조 문서': -1.0, '부동산 대출 사기': -1.0,
    '불법 증축': -1.0, '불법 매도': -1.0, '임차권 양도 사기': -1.0, '무자격 중개업': -1.0, '허위 보증금': -1.0,
    '담보 사기': -1.0, '부당한 매매': -1.0, '가격 담합': -1.0, '불법 재개발': -1.0, '허위 감정평가': -1.0,
    '불법 점유': -1.0, '불법 임대': -1.0, '가짜 중개인': -1.0, '불법 중개 수수료': -1.0, '불법 분양': -1.0,
    '계약 해지 사기': -1.0, '위조 인감': -1.0, '불법 경매': -1.0, '불법 전대차 계약': -1.0, '무자격 감정평가': -1.0,
    '허위 등기': -1.0, '허위 채권': -1.0, '부당 해약': -1.0, '명의 대여': -1.0, '무허가 건축': -1.0,
    '불법 임대 수익': -1.0, '불법 점유권': -1.0, '계약금 사기': -1.0, '분양 대행 사기': -1.0, '불법 용도 변경': -1.0,
    '가압류 해제 사기': -1.0, '불법 담보 대출': -1.0, '사기 임대인': -1.0, '허위 임차인': -1.0,
    '불법 대출': -1.0, '가짜 공인중개사': -1.0, '임대료 사기': -1.0, '위조 서류': -1.0, '명의 위조': -1.0,
    '가짜 서류': -1.0, '임대차 계약 사기': -1.0, '가짜 세입자': -1.0, '부정 임대': -1.0, '위조 인감증명서': -1.0,
    '사기 매수인': -1.0, '위조 공증': -1.0, '가짜 계약금': -1.0, '위조 대출서류': -1.0, '불법 부동산 펀드': -1.0,
    '사기 건축업자': -1.0, '불법 건축 승인': -1.0, '허위 임대료': -1.0, '사기 부동산 투자': -1.0, '무허가 분양': -1.0,
    '위조 분양서류': -1.0, '사기 등기': -1.0, '사기 매매계약': -1.0, '불법 명의변경': -1.0, '허위 부동산 정보': -1.0,
    '위조 대출문서': -1.0, '불법 부동산 매매': -1.0, '사기 임대차 계약서': -1.0, '불법 전대차': -1.0, '위조 서명': -1.0,
    '사기 공인중개사': -1.0, '가짜 임대인': -1.0, '부동산 사기대출': -1.0, '위조 부동산 서류': -1.0, '사기 건축물': -1.0,
    '가짜 명의': -1.0, '불법 임대차 계약서': -1.0, '위조 임대차 서류': -1.0, '허위 부동산 매물': -1.0
}

combined_fraud_weights = fraud_words_kor.copy()
combined_fraud_weights.update(real_estate_fraud_words_kor)
print(combined_fraud_weights)

# 사기수법 및 전세사기수법 행위 분석 함수
def analyze_fraud(text):
    okt = Okt()
    tokens = okt.pos(text, stem=True)

    real_estate_fraud_score = 0
    for token, pos in tokens:
        if pos in ['Noun', 'Adjective', 'Adverb'] and token in combined_fraud_weights:
            real_estate_fraud_score += combined_fraud_weights[token]

    # 0> 긍정적, 0<: 부정적, 0: 중립적
    return "심각성낮음" if real_estate_fraud_score > 0 else "심각성높음" if real_estate_fraud_score < 0 else "심각성보통"

@app.route('/ere', methods=['POST'])
def solve_equation():
    content = request.json.get('content')
    if not content:
        return jsonify({"status": "error", "message": "Content is missing"}), 400

    print(f'content: {content}')

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
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/fraud_words', methods=['POST'])
def fraud_words_okt():
    content = request.json.get('content')
    if not content:
        return jsonify({"status": "error", "message": "Content is missing"}), 400

    print(f'content: {content}')

    # 쓰레드 ID가 세션에 없으면 새로운 쓰레드 생성
    if 'thread_id' not in session:
        thread = client.beta.threads.create()
        print(f'thread_id: {thread.id}')
        session['thread_id'] = thread.id

    try:
        real_estate_fraud = analyze_fraud(content)
        print(f"텍스트: {content}")
        print(f"사기수법 및 행위: {real_estate_fraud}")

        return jsonify({"status": "success", "analysis": real_estate_fraud})

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=4000)
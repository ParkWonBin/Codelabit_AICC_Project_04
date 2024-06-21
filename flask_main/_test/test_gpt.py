# assistant (챗봇)
### 참고 ### https://platform.openai.com/docs/api-reference/assistants
### 전체 ### curl -X GET http://localhost:5001/api/assistant/
### 생성 ### curl -X POST http://localhost:5001/api/assistant/ -H "Content-Type: application/json" -d "{\"name\": \"testbot\",\"instructions\":\"test\",\"tools\":[],\"model\":\"gpt-3.5-turbo\"}"
### 조회 ### curl -X GET http://localhost:5001/api/assistant/{string:assistant_id}
### 수정 ### curl -X POST http://localhost:5001/api/assistant/{string:assistant_id} -H "Content-Type: application/json" -d "{\"name\": \"testbot123\",\"instructions\":\"test123\",\"tools\":[],\"model\":\"gpt-3.5-turbo\"}"
### 삭제 ### curl -X POST http://localhost:5001/api/assistant/delete/{string:assistant_id}

# thread (채팅방)
### 참고 ### https://platform.openai.com/docs/api-reference/threads
### 생성 ### curl -X POST http://localhost:5001/api/thread/
### 조회 ### curl -X GET http://localhost:5001/api/thread/{string:thread_id}
### 삭제 ### curl -X POST http://localhost:5001/api/thread/delete/{string:thread_id}

# message (메시지)
### 참고 ### https://platform.openai.com/docs/api-reference/messages
### 생성 ### curl -X POST http://localhost:5001/api/message/{string:thread_id} -H "Content-Type: application/json" -d "{\"role\": \"user\", \"content\":\"Hello!\"}"
### 조회 ### curl -X GET http://localhost:5001/api/message/{string:thread_id}/{string:message_id}
### 삭제 ### curl -X POST http://localhost:5001/api/message/delete/{string:thread_id}/{string:message_id}

# runs  (AI 응답 생성)
### 참고 ### https://platform.openai.com/docs/api-reference/runs
### 생성 ### curl -X POST http://localhost:5001/api/runs/{string:thread_id}/{string:assistant_id}
### 조회 ### curl -X GET http://localhost:5001/api/runs/{string:thread_id}/{string:run_id}


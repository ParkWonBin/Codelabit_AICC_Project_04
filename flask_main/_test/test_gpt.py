# assistant (챗봇)
### 참고 ### https://platform.openai.com/docs/api-reference/assistants
###O전체 ### curl -X GET http://localhost:5001/api/assistant/
###O생성 ### curl -X POST http://localhost:5001/api/assistant/ -H "Content-Type: application/json" -d "{\"name\": \"testbot\",\"instructions\":\"test\",\"tools\":[],\"model\":\"gpt-3.5-turbo\"}"
###X조회 ### curl -X GET http://localhost:5001/api/assistant/{string:assistant_id}
###O수정 ### curl -X POST http://localhost:5001/api/assistant/{string:assistant_id} -H "Content-Type: application/json" -d "{\"name\": \"testbot123\",\"instructions\":\"test123\",\"tools\":[],\"model\":\"gpt-3.5-turbo\"}"
###O삭제 ### curl -X POST http://localhost:5001/api/assistant/delete/{string:assistant_id}

# thread (채팅방)
### 참고 ### https://platform.openai.com/docs/api-reference/threads
###O생성 ### curl -X POST http://localhost:5001/api/thread/
###X조회 ### curl -X GET http://localhost:5001/api/thread/{string:thread_id}
### 삭제 ### curl -X POST http://localhost:5001/api/thread/delete/{string:thread_id}

# message (메시지)
### 참고 ### https://platform.openai.com/docs/api-reference/messages
###O생성 ### curl -X POST http://localhost:5001/api/message/{string:thread_id} -H "Content-Type: application/json" -d "{\"role\": \"user\", \"content\":\"Hello!\"}"
###X조회### curl -X GET http://localhost:5001/api/message/{string:thread_id}/{string:message_id}
### 삭제 ### curl -X POST http://localhost:5001/api/message/delete/{string:thread_id}/{string:message_id}

# runs  (AI 응답 생성)
### 참고 ### https://platform.openai.com/docs/api-reference/runs
###O생성 ### curl -X POST http://localhost:5001/api/runs/{string:thread_id}/{string:assistant_id}
###X조회 ### curl -X GET http://localhost:5001/api/runs/{string:thread_id}/{string:run_id}


# curl -X POST http://localhost:5001/api/runs/thread_rbxeQ7knR8dfgE3IhY90rHUC/{string:assistant_id}
# curl -X GET http://localhost:5001/api/runs/thread_rbxeQ7knR8dfgE3IhY90rHUC/run_1hfxBESW0yv2dXTl2hzM9qGw

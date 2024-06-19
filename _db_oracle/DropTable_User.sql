-- 트리거 삭제
DROP TRIGGER trg_users_id;

-- 테이블 삭제
DROP TABLE Users CASCADE CONSTRAINTS;

-- 시퀀스 삭제
DROP SEQUENCE user_seq;

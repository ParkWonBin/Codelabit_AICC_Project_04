
# DB 계정 생성
SQL PLUS / Run SQL Command Line 

```sql
conn / as sysdba
startup

CREATE USER your_new_user IDENTIFIED BY your_password;
GRANT CONNECT, RESOURCE TO your_new_user;
GRANT CREATE TABLE TO your_new_user;
GRANT CREATE SESSION TO your_new_user;
```

# Table 생성

```sql
-- 시퀀스 생성
CREATE SEQUENCE user_seq START WITH 1 INCREMENT BY 1;

-- 테이블 생성
CREATE TABLE Users (
    id NUMBER PRIMARY KEY,
    email VARCHAR2(100) NOT NULL UNIQUE,
    username VARCHAR2(50) NOT NULL UNIQUE,
    password VARCHAR2(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 트리거 생성
CREATE OR REPLACE TRIGGER trg_users_id
BEFORE INSERT ON Users
FOR EACH ROW
BEGIN
    SELECT user_seq.NEXTVAL INTO :new.id FROM dual;
END;

```
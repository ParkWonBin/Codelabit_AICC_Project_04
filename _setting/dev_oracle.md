# Oracle DB 설정 가이드
Oracle SQL Command Line (SQL*Plus)을 사용하여 데이터베이스 계정을 생성 및 테이블을 설정 안내

### 1. 계정 생성 절차

1. **SQL*Plus 실행**: Oracle SQL Command Line을 열고 관리자 계정으로 로그인합니다.
    ```sql
    conn / as sysdba
    ```

2. **새 계정 생성**: 새 사용자 계정을 생성하고, 필요한 권한을 부여합니다.
    ```sql
    -- 새로운 사용자 생성
    CREATE USER your_new_user IDENTIFIED BY your_password;

    -- 사용자에게 필요한 권한 부여
    GRANT CONNECT, RESOURCE TO your_new_user;

    -- 사용자에게 테이블 생성 권한 부여
    GRANT CREATE TABLE TO your_new_user;

    -- 사용자에게 세션 생성 권한 부여
    GRANT CREATE SESSION TO your_new_user;
    ```

3. **새 계정으로 로그인**: 새로 생성한 계정으로 로그인합니다.
    ```sql
    sqlplus your_new_user/your_password@localhost/XE
    ```

### 2. User 테이블 생성 스키마 및 SQL 문

1. **User 테이블 생성**: 새 계정으로 로그인한 후, User 테이블을 생성합니다.
    ```sql
    -- 시퀀스 생성
    CREATE SEQUENCE user_seq START WITH 1 INCREMENT BY 1;

    -- 테이블 생성
    CREATE TABLE Users (
        id NUMBER PRIMARY KEY,
        username VARCHAR2(50) NOT NULL UNIQUE,
        password VARCHAR2(255) NOT NULL,
        email VARCHAR2(100) NOT NULL UNIQUE,
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

2. **샘플 데이터 삽입 (선택 사항)**: 테스트를 위해 샘플 데이터를 삽입할 수 있습니다.
    ```sql
    -- 샘플 데이터 삽입
    INSERT INTO Users (username, password, email) VALUES ('user1', 'password1', 'user1@example.com');
    INSERT INTO Users (username, password, email) VALUES ('user2', 'password2', 'user2@example.com');
    INSERT INTO Users (username, password, email) VALUES ('user3', 'password3', 'user3@example.com');
    ```

### 3. User 테이블 삭제 SQL 문
테스트를 위해 만든 테이블을 삭제합니다.

```sql
-- 트리거 삭제
DROP TRIGGER trg_users_id;

-- 테이블 삭제
DROP TABLE Users CASCADE CONSTRAINTS;

-- 시퀀스 삭제
DROP SEQUENCE user_seq;
```
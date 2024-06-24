
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


# 방호벽 보안설정
인바운드 규칙에서 포트 열어놨는지 확인
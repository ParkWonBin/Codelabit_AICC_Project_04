# Docker > Oracle11g DB 진입
[AWS-Docker 세팅방법](https://blog.naver.com/wbpark14/223350490048)

Docker - Oracle11g 설치 후 실행
```shell
sudo docker search oracle-xe-11g
sudo docker pull jaspeen/oracle-xe-11g
sudo docker run --name oracle11g -d -p 1521:1521 jaspeen/oracle-xe-11g
```

# DB 계정 관리자 권한으로 진입
Docerk - Oracle11g 컨테이너 진입
```shell
sudo docker ps -a
sudo docker start oracle11g
sudo docker exec -it oracle11g bash
su - oracle
sqlplus / as sysdba
```

# DB 계정 생성
```sql
CREATE USER your_new_user IDENTIFIED BY your_password;
GRANT CONNECT, RESOURCE TO your_new_user;
GRANT CREATE TABLE TO your_new_user;
GRANT CREATE SESSION TO your_new_user;
```

# AWS 보안설정
EC2 보안정책에서 포트 열려있는지 확인
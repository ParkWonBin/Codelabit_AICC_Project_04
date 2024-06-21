import cx_Oracle
import os

def get_db_connection():
    dsn = cx_Oracle.makedsn('host', 'port', service_name='service_name')
    connection = cx_Oracle.connect(
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        dsn=dsn
    )
    return connection
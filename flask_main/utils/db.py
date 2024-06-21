import cx_Oracle
import os

print(f"DB_USER : {os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_SERVICE_NAME')}")

dsn = cx_Oracle.makedsn(
        os.getenv('DB_HOST'),
        os.getenv('DB_PORT'),
        service_name=os.getenv('DB_SERVICE_NAME')
    )

def init_db(app):
    app.config['dsn'] = dsn
    app.config['db_user'] = os.getenv('DB_USER')
    app.config['db_password'] = os.getenv('DB_PASSWORD')

def get_db_connection():
    conn = cx_Oracle.connect(
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        dsn=dsn
    )
    return conn

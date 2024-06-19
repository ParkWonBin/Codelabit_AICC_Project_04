import oracledb from 'oracledb';

oracledb.autoCommit = true;

export default {
  user: process.env.DB_USER || 'your_db_user',
  password: process.env.DB_PASSWORD || 'your_db_password',
  connectString: process.env.DB_CONNECT_STRING || 'localhost/XE'
};

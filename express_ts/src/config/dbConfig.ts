import oracledb from 'oracledb';

oracledb.autoCommit = true;

// console.log(JSON.stringify({
//   user: process.env.DB_USER || 'xxxx',
//   password: process.env.DB_PASSWORD || 'xxxx',
//   connectString: process.env.DB_CONNECT_STRING || 'xxxx',
// }))

export default {
  user: process.env.DB_USER || 'your_db_user',
  password: process.env.DB_PASSWORD || 'your_db_password',
  connectString: process.env.DB_CONNECT_STRING || 'localhost:1521/xe'
};

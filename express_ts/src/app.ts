import express, { Application } from 'express';
import userRoutes from './routes/userRoutes';
import oracledb from 'oracledb';
import path from 'path'
 
import config from './config/dbConfig';
import cors from 'cors';


// app 을 생성 및 설정합니다.
const app: Application = express();

// 미들웨어
app.use(cors());
app.use(express.json());

// 라우터
const buildPath = path.join(__dirname, '../build')
app.use(express.static(buildPath)) 
app.use('/api/users', userRoutes);

//db 
oracledb.initOracleClient({ libDir:process.env.ORACLE_CLIENT }); // db 연결에 필요
oracledb.fetchAsString = [ oracledb.CLOB ]; // 게시글 CLOB 읽는데 필요

oracledb.createPool(config)
  .then(() => console.log('Oracle DB connected'))
  .catch((error: Error) => console.error('Oracle DB connection error:', error));

export default app;

import express, { Application } from 'express';
import userRoutes from './routes/userRoutes';
import oracledb from 'oracledb';
import config from './config/dbConfig';

import dotenv from 'dotenv';

// .env 파일의 환경 변수를 로드합니다.
dotenv.config();

// app 을 생성 및 설정합니다.
const app: Application = express();
app.use(express.json());
app.use('/api/users', userRoutes);

oracledb.createPool(config)
  .then(() => console.log('Oracle DB connected'))
  .catch((error: Error) => console.error('Oracle DB connection error:', error));

export default app;



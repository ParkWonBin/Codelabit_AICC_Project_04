import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';

// .env 파일의 환경 변수를 로드합니다.
dotenv.config();

const app: Application = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express and dotenv!');
});

export default app;
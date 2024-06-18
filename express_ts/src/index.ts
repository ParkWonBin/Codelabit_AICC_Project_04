import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';

// .env 파일의 환경 변수를 로드합니다.
dotenv.config();

const app: Application = express();
const port: number = parseInt(process.env.EXPRESS_PORT as string, 10) || 4000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express and dotenv!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
// .env 파일의 환경 변수를 로드합니다.
import dotenv from 'dotenv';
dotenv.config();

import app from './src/app';

const PORT: number = parseInt(process.env.EXPRESS_PORT as string, 10) || 4000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
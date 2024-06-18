
# TypeScritp - Express 개발을 위한 가이드
TypeScript를 사용한 Express 프로젝트 생성 방법입니다.

### 1. 프로젝트 초기화

```bash
mkdir Express_ts
cd Express_ts
npm init -y
```

### 2. TypeScript 및 관련 패키지 설치

```bash
npm install typescript ts-node @types/node @types/express express
```

### 3. TypeScript 설정 파일 생성

```bash
npx tsc --init
```

### 4. `tsconfig.json` 파일 수정 (필요에 따라 수정)

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist"
  },
  "include": ["src", "src/@types"]
}
```

### 5. `src` 디렉토리와 `index.ts` 파일 생성

리눅스
```bash
mkdir src
touch src/index.ts
```

윈도우
```powershell
mkdir src
New-Item -Path .\src\index.ts -ItemType File
```


### 6. dotenv 패키지 설치
```bash
npm install dotenv
```

### 7. `.env` 파일 생성

프로젝트 루트 디렉토리에 `.env` 파일을 생성하고 필요한 환경 변수를 정의합니다.

```powershell
New-Item -Path .\.env -ItemType File
```

`.env` 파일:

```plaintext
EXPRESS_PORT=4000
```

### 8. `src/index.ts` 파일에 기본 Express 서버 코드 작성
`src/index.ts` 파일에서 `dotenv` 패키지를 사용하여 환경 변수를 로드합니다.
`src/index.ts` 파일을 열고 다음과 같이 수정합니다.

```typescript
import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';

// .env 파일의 환경 변수를 로드합니다.
dotenv.config();

const app: Application = express();
const port: number = parseInt(process.env.EXPRESS_PORT as string, 10) || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express and dotenv!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
```

### 9. TypeScript에서 환경 변수 타입 정의

TypeScript에서 `process.env`를 사용할 때 타입 정의를 추가하면 더욱 안전하게 사용할 수 있습니다.  
`src` 디렉토리 안에 `@types` 디렉토리를 만들고 `env.d.ts` 파일을 생성합니다.

```powershell
mkdir src\@types
New-Item -Path .\src\@types\env.d.ts -ItemType File
```

`src/@types/env.d.ts` 파일을 다음과 같이 작성합니다.

```typescript
declare namespace NodeJS {
  interface ProcessEnv {
    EXPRESS_PORT?: string;
  }
}
```

### 10. 서버 실행

```bash
npx ts-node src/index.ts
```
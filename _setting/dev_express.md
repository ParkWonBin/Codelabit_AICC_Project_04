
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
npm install typescript ts-node @types/node 
npm install express @types/express 
```

프로젝트 관련 패지지 설치
```bash
npm install dotenv
npm install cors @types/cors
npm install bcrypt @types/bcrypt
npm install jsonwebtoken @types/jsonwebtoken
npm install oracledb @types/oracledb

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
EXPRESS_PORT=4001

DB_USER=your_new_user
DB_PASSWORD=your_password
DB_CONNECT_STRING=localhost:1521/xe
ORACLE_CLIENT=C:\wbpark\util\instantclient_21_13

JWT_SECRET=mysecretkey

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

      DB_USER: string;
      DB_PASSWORD: string;
      DB_CONNECT_STRING: string;
      
      JWT_SECRET: string;
    }
  }
  
```

### 10. 서버 실행

```bash
npx ts-node src/index.ts
```


---
# 자료 조사하면서 알게된 것
typescript express 돌릴 때는 반드시 npx ts-node 로 돌려야한다.  
npx 빼먹으면 에러남..
package.json 에 ```npm start``` 등록 잘 해나야한다.
```json
...
  "scripts": {
    "start": "npx ts-node ./server.ts"
  },
```


## Layered Architecture
이 구조는 코드베이스를 여러 개의 기능적 모듈로 나누어 각각의 모듈이 특정 역할을 담당하도록 설계된 아키텍처 스타일입니다.  

### 특징
1. **Config**: 환경 설정 파일 및 데이터베이스 설정 파일을 포함합니다.
2. **Controllers**: 요청을 처리하고 적절한 서비스 레이어를 호출하여 응답을 반환하는 컨트롤러 파일을 포함합니다.
3. **Middlewares**: Express 미들웨어 파일을 포함하여 요청을 처리하는 단계에서 특정 작업을 수행합니다.
4. **Models**: 데이터베이스 모델 정의 파일을 포함하여 데이터 스키마와 ORM 모델을 정의합니다.
5. **Routes**: API 라우트 정의 파일을 포함하여 URL 경로와 해당 컨트롤러를 매핑합니다.
6. **Services**: 비즈니스 로직을 포함한 서비스 레이어 파일을 포함하여 데이터 처리와 트랜잭션 관리를 수행합니다.
7. **Types**: TypeScript 타입 정의 파일을 포함하여 프로젝트 전반에서 사용할 타입을 정의합니다.
8. **Utils**: 유틸리티 함수 파일을 포함하여 다양한 모듈에서 재사용할 수 있는 함수들을 정의합니다.

### Layered Architecture의 장점
1. **모듈성**: 각 기능이 독립적인 모듈로 분리되어 있어 유지보수와 확장이 용이합니다.
2. **재사용성**: 코드의 재사용성을 높일 수 있으며, 특정 모듈이나 기능을 쉽게 재사용할 수 있습니다.
3. **테스트 용이성**: 각 레이어가 독립적이므로 단위 테스트가 용이합니다.
4. **협업 용이성**: 팀 내에서 역할과 책임이 명확히 나누어져 있어 협업이 용이합니다.

이 구조는 특히 규모가 크고 복잡한 애플리케이션에서 코드의 유지보수성과 확장성을 높이기 위해 많이 사용됩니다.
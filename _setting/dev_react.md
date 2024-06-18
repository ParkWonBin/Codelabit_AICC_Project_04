
# TypeScritp - React 개발을 위한 가이드
TypeScript를 사용한 React 프로젝트 생성 방법입니다.
React 프로젝트에서 `.env` 파일을 생성하고 환경 변수를 설정합니다. 
Webpack 5의 폴리필 문제를 해결하기 위한 설정도 포함되어 있습니다.

### 1. Create React App 설치 및 프로젝트 생성
Create React App을 사용하여 새로운 TypeScript 프로젝트를 생성합니다.

```powershell
mkdir react_ts
npx create-react-app react_ts --template typescript
cd react_ts
```

### 2. .env 파일 생성 및 환경 변수 설정
Create React App은 `.env` 파일을 자동으로 로드하기 때문에 `dotenv` 패키지를 직접 설치할 필요가 없습니다.  
프로젝트 루트 디렉토리에 `.env` 파일을 생성하고 필요한 환경 변수를 추가합니다.  

```powershell
New-Item -Path .env -ItemType File
```

```plaintext
REACT_APP_API_URL=https://wbpark.app
REACT_APP_API_KEY=test123

PORT=3001
# REACT_APP_ 으로 시작하는 환경변수만 build 해줌.
# PORT 는 개발환경에서 로컬 호스팅 할 때만 쓰는 환경변수임.
# PORT 로 환경변수 설정해주면 React 내부에서 해당 값 읽어서 포트번호 설정해줌.
```

### 3. `src/react-app-env.d.ts` 파일 수정
TypeScript로 환경 변수를 사용할 때 타입을 정의하는 것이 좋습니다.  
이를 위해 새로운 파일을 생성하여 환경 변수의 타입을 정의합니다.

`src/react-app-env.d.ts`
```typescript
/// <reference types="react-scripts" />

interface ImportMetaEnv {
    readonly REACT_APP_API_URL: string;
    readonly REACT_APP_API_KEY: string;
    readonly PORT: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
```

### 4. 환경 변수 사용 예시
React 컴포넌트에서 환경 변수를 사용하여 타입을 명시합니다.

예시: `src/App.tsx`

```typescript
import React from 'react';
import './App.css';

const App: React.FC = () => {
  const apiUrl: string = process.env.REACT_APP_API_URL as string;
  const apiKey: string = process.env.REACT_APP_API_KEY as string;
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Environment Variables in React</h1>
        <p>API URL: {apiUrl}</p>
        <p>API Key: {apiKey}</p>
      </header>
    </div>
  );
};

export default App;
```

### 5. Webpack 설정을 오버라이드하여 폴리필 추가
Webpack 5에서 Node.js 코어 모듈에 대한 폴리필을 추가하려면 `react-app-rewired`와 필요한 패키지를 설치하고 설정 파일을 추가합니다.

```powershell
npm install react-app-rewired path-browserify os-browserify crypto-browserify --save-dev
```


```powershell
New-Item -Path config-overrides.js -ItemType File
```

프로젝트 루트 디렉토리에 `config-overrides.js` 파일을 생성하고 다음과 같이 설정합니다.

```javascript
module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    "path": require.resolve("path-browserify"),
    "os": require.resolve("os-browserify/browser"),
    "crypto": require.resolve("crypto-browserify"),
    "fs": false,
    "net": false,
    "tls": false
  });
  config.resolve.fallback = fallback;
  return config;
};

```

### 6. `package.json` 수정
`package.json` 파일에서 `scripts` 부분을 수정하여  
`react-scripts` 대신 `react-app-rewired`를 사용하도록 합니다.

```json
"scripts": {
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test",
  "eject": "react-scripts eject"
}
```

### 7. 애플리케이션 실행
이제 프로젝트를 실행하면 `.env` 파일에 설정된 포트에서 애플리케이션이 호스팅됩니다.

```powershell
npm start
```
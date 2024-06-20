/// <reference types="react-scripts" />

interface ImportMetaEnv {
    readonly REACT_APP_API_URL: string;
    readonly REACT_APP_API_KEY: string;
    readonly PORT: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
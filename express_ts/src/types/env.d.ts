declare namespace NodeJS {
    interface ProcessEnv {
      EXPRESS_PORT?: string;

      DB_USER: string;
      DB_PASSWORD: string;
      DB_CONNECT_STRING: string;
      
      JWT_SECRET: string;
    }
  }
  
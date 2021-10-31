declare namespace NodeJS {
  interface ProcessEnv {
      DB_URL: string;
      PORT: number;
      CORS_URL: string;
      DISCORD_CLIENT_ID: string | undefined;
      DISCORD_REDIRECT_URL: string | undefined;
      DISCORD_CLIENT_SECRET: string | undefined;
      VK_CLIENT_ID: number | undefined;
      VK_CLIENT_SECRET: string | undefined;
      VK_REDIRECT_URL: string | undefined;
      VK_API_KEY: string | undefined;
      YOOMONEY_NUMBER: number;
      YOOMONEY_CALLBACK_SECRET: string;
      DA_SECRET: string | undefined;
      QIWI_SECRET_KEY: string | undefined;
      QIWI_THEME: string | undefined;

  }
}

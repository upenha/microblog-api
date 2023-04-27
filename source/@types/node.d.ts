/* eslint-disable no-unused-vars */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string
      SECURITY_TOKEN: string
    }
  }
}

export {}

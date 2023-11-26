export const config = {
  db: {
    dbConfig: {
      apiKey: process.env.REACT_APP_FB_API_KEY,
      autoDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_PROJECT_ID,
      storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_APP_ID,
    }
  }
}

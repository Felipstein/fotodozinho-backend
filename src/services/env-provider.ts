const EnvProvider = {
  host: process.env.HOST,
  port: process.env.PORT,
  secretKey: process.env.SECRET_KEY,
  tokensExpirationTime: {
    accessToken: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
    refreshToken: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
    validateToken: process.env.VALIDATE_TOKEN_EXPIRATION_TIME,
  },
  adminPassword: process.env.ADMIN_PASSWORD,
  storageType: process.env.STORAGE_TYPE,
  aws: {
    bucketName: process.env.AWS_BUCKET_NAME,
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  smtp: {
    email: process.env.SMTP_EMAIL,
    host: process.env.SMTP_HOST,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};

export { EnvProvider };

const EnvProvider = {
  host: process.env.HOST,
  port: process.env.PORT,
  secretKey: process.env.SECRET_KEY,
  storageType: process.env.STORAGE_TYPE,
  aws: {
    bucketName: process.env.AWS_BUCKET_NAME,
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};

export { EnvProvider };

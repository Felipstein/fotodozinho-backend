import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';

class S3ClientService {

  readonly client: S3Client;

  constructor(region: string, accessKeyId: string, secretAccessKey: string) {
    this.client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  async deleteFile(bucketName: string, imageKey: string) {
    await this.client.send(new DeleteObjectCommand({
      Bucket: bucketName,
      Key: imageKey,
    }));
  }

}

export { S3ClientService };

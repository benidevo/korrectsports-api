import { S3 } from 'aws-sdk';

class StorageProvider {
  private client: S3;
  private bucketName: string;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    this.bucketName = process.env.AWS_BUCKET_NAME;
  }

  public async saveFile(file: Express.Multer.File): Promise<string> {
    const uploadedImage = await this.client
      .upload({
        Bucket: this.bucketName,
        Key: file.originalname,
        Body: file.buffer,
      })
      .promise();

    return uploadedImage.Location;
  }

  public async deleteFile(fileUrl: string) {
    const fileName = fileUrl.split('/').pop();
    await this.client
      .deleteObject({
        Bucket: this.bucketName,
        Key: fileName,
      })
      .promise();
  }
}

export default StorageProvider;

import { S3 } from 'aws-sdk';

class StorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  public async saveFile(file: Express.Multer.File): Promise<string> {
    const uploadedImage = await this.client
      .upload({
        Bucket: 'korrectsports-dev',
        Key: file.originalname,
        Body: file.buffer,
      })
      .promise();

    return uploadedImage.Location;
  }
}

export default StorageProvider;

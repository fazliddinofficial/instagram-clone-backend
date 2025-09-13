import { PutObjectAclCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { config } from '@common';

@Injectable()
export class UploadService {
  private s3: S3Client;
  constructor() {
    this.s3 = new S3Client({
      region: config.AWS_S3_REGION,
      credentials: {
        accessKeyId: config.AWS_ACCESS_KEY,
        secretAccessKey: config.AWS_PRIVATE_ACCESS_KEY,
      },
    });
  }

  private createPublicUrl(fileName: string) {
    const PORT = config.PORT;

    const HOST = `localhost${PORT}`;

    const filePublicUrl = `http://${HOST}/`
    return `${config.AWS_BUCKET_NAME}/${fileName}`;
  }
}

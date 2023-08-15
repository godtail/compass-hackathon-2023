import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

import { nanoid } from 'nanoid';

export enum EmailTemplate {
  ConfirmationEmail = 'ConfirmationEmail',
  ForgotPassword = 'ForgotPassword',
  CustomDomain = 'CustomDomain',
  NewForecast = 'NewForecast',
  NewCustomAudience = 'NewCustomAudience',
  NewCampaign = 'NewCampaign',
}

@Injectable()
export class AWSService {
  private s3: S3Client;

  constructor(readonly configService: ConfigService) {
    const configuration = {
      region: configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: configService.get('AWS_ACCESSKEY_ID'),
        secretAccessKey: configService.get('AWS_SECRET_ACCESSKEY'),
      },
    };
    this.s3 = new S3Client(configuration);
  }

  async uploadBase64FileToS3(data: string) {
    const [, ext] = data.split(';')[0].split('/');
    const key = `${nanoid()}.${ext}`;
    const bucket = this.configService.get('AWS_BUCKET');
    const command = new PutObjectCommand({
      Key: key,
      Bucket: bucket,
      Body: Buffer.from(data.replace(/^data:.+;base64,/, ''), 'base64'),
      ContentEncoding: 'base64',
    });
    await this.s3.send(command);
    return `https://${this.configService.get(
      'AWS_BUCKET',
    )}.s3.amazonaws.com/${key}`;
  }
}

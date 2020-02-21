import { Injectable, Logger, Req, Res } from '@nestjs/common';
import * as AWS from 'aws-sdk';
const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const s3 = new AWS.S3();
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';

@Injectable()
export class FileUploadService {
  private logger = new Logger('FileUploadService');

  constructor() {
    try {
      if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
        AWS.config.update({
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });
      }
    } catch (error) {
      this.logger.error(`Failed to set AWS Config ${error}`);
    }
  }

  async fileupload(@Req() req, @Res() res) {
    try {
      this.upload(req, res, function(error) {
        if (error) {
          this.logger.error(`Failed to upload image file: ${error}`);
        }
        this.log(req.files[0].Location);
      });
    } catch (error) {
      this.logger.error(`Failed to upload image file: ${error}`);
    }
  }

  upload = multer({
    storage: multerS3({
      s3: s3,
      Bucket: AWS_S3_BUCKET_NAME,
      ACL: 'public-read',
      Key: function(_, file, cb) {
        cb(null, `${Date.now().toString()} - ${file.originalname}`);
      },
    }),
  }).array('upload', 1);
}

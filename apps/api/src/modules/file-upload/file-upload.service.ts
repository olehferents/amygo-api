import {
  Injectable,
  PayloadTooLargeException,
  ServiceUnavailableException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { constant } from '../../constants';

@Injectable()
export class FileUploadService {
  async upload(file, bucketName: string) {
    const { originalname } = file;

    await this.uploadS3(file.buffer, bucketName, originalname);
  }

  async uploadS3(file, bucket, name) {
    const s3 = this.getS3();
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
    };

    await s3.upload(params, (err, data) => {
      if (err) {
        console.log(err, 'AWS error due connection');
        throw new ServiceUnavailableException(err);
      }
      return data;
    });
  }

  getS3() {
    return new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  isFileValid(file) {
    if (file.size > constant.MAX_FILE_SIZE) {
      throw new PayloadTooLargeException();
    }

    if (!constant.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new UnsupportedMediaTypeException();
    }
  }

  isDocumentsValid(file) {
    if (file.size > constant.MAX_FILE_SIZE) {
      throw new PayloadTooLargeException();
    }

    if (
      ![
        constant.ALLOWED_MIME_TYPES_DOCUMENTS,
        ...constant.ALLOWED_MIME_TYPES,
      ].includes(file.mimetype)
    ) {
      throw new UnsupportedMediaTypeException();
    }
  }

  async delete(imageName, bucketName: string) {
    const s3 = this.getS3();
    const params = {
      Bucket: bucketName,
      Key: imageName.slice(process.env.S3_BUCKET_URL_PROFILE_IMAGES.length),
    };

    await s3.createBucket({ Bucket: bucketName }, function () {
      s3.deleteObject(params, function (err, data) {
        if (err) {
          throw new ServiceUnavailableException(err);
        }
        return data;
      });
    });
  }
}

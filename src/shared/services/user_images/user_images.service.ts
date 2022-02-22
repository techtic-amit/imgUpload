import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserImages } from 'src/modules/entity/user_images.entity';
import { Repository } from 'typeorm';

var AWS = require('aws-sdk');

@Injectable()
export class UserImageService {
  constructor(
    @InjectRepository(UserImages)
    private readonly userImagesRepository: Repository<UserImages>,
  ) { }

  async insertUserImages(payload: any, images) {
    try {

      const ID = 'AKIARY4723JPJQENJRED';
      const SECRET = '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';

      // The name of the bucket that you have created
      const BUCKET_NAME = 'test-s3-task-bucket';
      const s3 = new AWS.S3({
        accessKeyId: ID,
        secretAccessKey: SECRET
      });
      console.log(images);
      let img = images[0];
      console.log(img);

      // Setting up S3 upload parameters
      const params = {
        Bucket: BUCKET_NAME,
        Key: img.originalname, // File name you want to save as in S3
        Body: img.buffer
      };

      s3.createBucket(params, function (err, data) {
        if (err) console.log(err, err.stack);
        else console.log('Bucket Created Successfully', data.Location);
      });



    } catch (error) {
      throw error;
    }
  }
  async getAllData() {
    try {
      let userImgInfo = await this.userImagesRepository.find();

      return userImgInfo;
    } catch (err) {
      throw err;
    }
  }

}

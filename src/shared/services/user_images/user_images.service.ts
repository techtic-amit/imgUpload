import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService as config } from 'src/common/config.service';
import { UserImages } from 'src/modules/entity/user_images.entity';
import { Repository } from 'typeorm';
var AWS = require('aws-sdk');

@Injectable()
export class UserImageService {
  constructor(
    @InjectRepository(UserImages)
    private readonly userImagesRepository: Repository<UserImages>,
  ) { }

  async insertUserImages(payload: any, images, resp) {
    try {


      const ID = config.get('ACCESS_KEY');
      const SECRET = config.get('SECRET_KEY');

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
        Key: payload.name.toString(), // File name you want to save as in S3
        Body: img.buffer
      };

      await s3.upload(params, async (err, data) => {
        if (err) {
          throw err;
        }

        console.log(`File uploaded successfully. ${data.Location}`);
        let userImg = new UserImages();

        userImg.name = payload.name;

        userImg.img = data.Location;
        let imgInfo = await this.userImagesRepository.save(userImg);
        console.log(imgInfo);

        return resp.status(HttpStatus.OK).json({
          status: HttpStatus.OK,
          data: imgInfo,
        });
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

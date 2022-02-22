import {
  BadRequestException,
  Body,
  Controller,
  forwardRef, Get, HttpStatus,
  Inject,
  Post, Res, UploadedFiles, UseInterceptors
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { UserImageService } from '../../shared/services/user_images/user_images.service';



@Controller('api/auth')
export class AuthController {
  constructor(
    @Inject(forwardRef(() => UserImageService))
    private readonly userImageService: UserImageService,

  ) { }

  @Post('image_upload')
  @UseInterceptors(
    FilesInterceptor('files')
  )
  async inserUserimg(
    @Body() payload: any,
    @UploadedFiles() images,
    @Res() res: Response,
  ): Promise<any> {
    try {
      return await this.userImageService
        .insertUserImages(payload, images)
        .then((response_message) => {
          return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            message: response_message,
          });
        })
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
  @Get('getAllData')
  async getallData(
    @Body() payload: any,
    @Res() res: Response,
  ): Promise<any> {
    try {
      return await this.userImageService
        .getAllData()
        .then((response_message) => {
          return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data: response_message,
          });
        })
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }


}

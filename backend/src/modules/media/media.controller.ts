import {
  Body,
  Controller,
  Delete,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ROUTES } from '@constants/routes';
import { MediaService } from './media.service';
import { DeleteMediaDto } from './models/media.dto';

@Controller(ROUTES.MEDIA)
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    return file.path;
  }

  @Delete()
  delete(@Body() file: DeleteMediaDto) {
    return this.mediaService.delete(file.path);
  }
}

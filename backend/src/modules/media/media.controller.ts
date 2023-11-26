import { rmSync } from 'fs';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteMediaDto } from './models/media.dto';

@Controller('media')
export class MediaController {
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    return file.path;
  }

  @Delete()
  delete(@Body() file: DeleteMediaDto) {
    try {
      if (file.path.match(/^files\//)) {
        rmSync(file.path, { force: true });
      }
    } catch {
      throw new BadRequestException();
    }
  }
}

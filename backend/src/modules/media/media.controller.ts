import {
  Body,
  Controller,
  Delete,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ROUTES } from '@constants/routes';
import { JwtAuthGuard } from '@guards/jwt.guard';
import { MediaService } from './media.service';
import { DeleteMediaDto } from './models/media.dto';

@UseGuards(JwtAuthGuard)
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

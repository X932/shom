import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';

@Module({
  controllers: [MediaController],
  imports: [
    MulterModule.register({
      limits: {
        fileSize: 30_000_000,
      },
      storage: diskStorage({
        filename: function (req, file, callback) {
          callback(null, Date.now() + '-' + file.originalname);
        },
        destination: './files',
      }),
    }),
  ],
  providers: [MediaService],
})
export class MediaModule {}

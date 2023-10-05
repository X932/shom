import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';

@Module({
  controllers: [MediaController],
  providers: [MediaService],
  imports: [
    MulterModule.register({
      limits: {
        fileSize: 50_000_000,
      },
      storage: diskStorage({
        filename: function (req, file, callback) {
          callback(null, Date.now() + '-' + file.originalname);
        },
        destination: './files',
      }),
    }),
  ],
})
export class MediaModule {}

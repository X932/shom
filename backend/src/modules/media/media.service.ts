import { rmSync } from 'fs';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class MediaService {
  public delete(filePath: string) {
    try {
      if (filePath.match(/^files\//)) {
        rmSync(filePath, { force: true });
      }
    } catch {
      throw new BadRequestException();
    }
  }
}

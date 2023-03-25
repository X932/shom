import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class TrimPipe implements PipeTransform {
  transform(object: Record<string, any>) {
    const keys = Object.keys(object).filter(
      (key) => typeof object[key] === 'string',
    );
    let newObject = { ...object };

    keys.forEach((key) => {
      const value: string = object[key].trim();
      newObject = {
        ...newObject,
        [key]: value,
      };
    });
    return newObject;
  }
}

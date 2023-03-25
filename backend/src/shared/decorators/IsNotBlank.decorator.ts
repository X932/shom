import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsNotBlank(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsNotBlank',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return typeof value === 'string' && value?.trim().length > 0;
        },
      },
    });
  };
}

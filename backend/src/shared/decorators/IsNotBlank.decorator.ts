import { registerDecorator, ValidationOptions } from 'class-validator';

/**
 *
 * @param validationOptions
 * @returns trimmed string
 */
export function IsNotBlank(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsNotBlank',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate: function (value: string) {
          return typeof value === 'string' && value?.trim().length > 0;
        },
      },
    });
  };
}

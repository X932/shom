import { HttpStatus } from '@nestjs/common';

export function getResponseMessage(status: HttpStatus): string | undefined {
  switch (status) {
    case HttpStatus.OK:
    case HttpStatus.CREATED:
      return 'Успешно';

    case HttpStatus.BAD_REQUEST:
      return 'Данные не верные';

    case HttpStatus.FORBIDDEN:
      return 'Доступ запрещён';

    case HttpStatus.INTERNAL_SERVER_ERROR:
      return 'Ошибка системы';

    case HttpStatus.METHOD_NOT_ALLOWED:
      return 'Вали отсюда';

    case HttpStatus.NOT_FOUND:
      return 'Не найдено';

    case HttpStatus.SERVICE_UNAVAILABLE:
      return 'Система не доступна';

    case HttpStatus.UNAUTHORIZED:
      return 'Вы не авторизованы';

    default:
      return '';
  }
}

export function parseDBMessage(message: string): string | undefined {
  if (message.includes('duplicate key value')) {
    return 'Не должно быть повторяющихся значений';
  }
}

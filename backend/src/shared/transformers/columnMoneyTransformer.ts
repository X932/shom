export class ColumnMoneyTransformer {
  from(data: string): number {
    return parseFloat(data);
  }
  to(data: number): string {
    return data.toFixed(2);
  }
}

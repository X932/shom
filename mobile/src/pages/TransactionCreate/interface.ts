import { ACCOUNT_HISTORY_TYPES } from '../Statistic/interface';

export interface ITransactionCreateForm {
  amount: string;
  description: string;
  accountId: string;
  createdAt: Date;
  type: ACCOUNT_HISTORY_TYPES;
}

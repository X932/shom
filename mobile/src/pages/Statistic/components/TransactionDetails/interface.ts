import { Dispatch, SetStateAction } from 'react';
import { IAccountHistory } from '../../interface';

export interface ITransactionDetailsProps {
  transaction: IAccountHistory;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

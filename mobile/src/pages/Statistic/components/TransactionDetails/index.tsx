import { FC } from 'react';
import { Text, View } from 'react-native';
import { format } from 'date-fns';
import { ITransactionDetailsProps } from './interface';
import { styles } from './styles';
import { ACCOUNT_HISTORY_TYPES } from '../../interface';

export const TransactionDetails: FC<ITransactionDetailsProps> = ({
  transaction,
  setIsModalOpen,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.text, styles.headerText]}>
          {transaction.type === ACCOUNT_HISTORY_TYPES.INCOME
            ? 'Доход'
            : 'Расход'}
        </Text>
        <Text style={styles.headerText} onPress={() => setIsModalOpen(false)}>
          &times;
        </Text>
      </View>
      <Text style={styles.text}>{transaction.account.title}</Text>
      <Text style={styles.text}>{transaction.amount} сом</Text>
      <Text style={styles.text}>{transaction.description}</Text>
      <Text style={styles.text}>
        {format(transaction.createdAt, 'dd.MM.yyyy HH:MM')}
      </Text>
    </View>
  );
};

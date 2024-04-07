import { FC } from 'react';
import { FlatList, Text, View } from 'react-native';
import { format } from 'date-fns';
import { colors } from '@styles';
import { ITransactionsProps } from './interface';
import { styles } from './styles';
import { ACCOUNT_HISTORY_TYPES } from '../../interface';

export const Transactions: FC<ITransactionsProps> = ({ transactions }) => {
  return (
    <FlatList
      data={transactions}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View>
            <Text style={styles.mainCardText}>{item.account.title}</Text>
            <Text>{format(item.createdAt, 'dd.MM.yyyy HH:MM')}</Text>
          </View>
          <Text
            style={[
              styles.mainCardText,
              {
                color:
                  item.type === ACCOUNT_HISTORY_TYPES.INCOME
                    ? colors.blue[100]
                    : colors.red,
              },
            ]}>
            {item.amount}
          </Text>
        </View>
      )}
      contentContainerStyle={styles.container}
      keyExtractor={item => String(item.id)}
    />
  );
};

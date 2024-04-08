import { FC, useState } from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import { format } from 'date-fns';
import { colors } from '@styles';
import { modalStyles } from '@components';
import { ITransactionsProps } from './interface';
import { styles } from './styles';
import { ACCOUNT_HISTORY_TYPES, IAccountHistory } from '../../interface';
import { TransactionDetails } from '../TransactionDetails';

export const Transactions: FC<ITransactionsProps> = ({ transactions }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<IAccountHistory>();

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}>
        {selectedTransaction && (
          <View style={modalStyles.container}>
            <TransactionDetails
              setIsModalOpen={setIsModalOpen}
              transaction={selectedTransaction}
            />
          </View>
        )}
      </Modal>

      <FlatList
        data={transactions}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              setSelectedTransaction(item);
              setIsModalOpen(true);
            }}>
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
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.container}
        keyExtractor={item => String(item.id)}
      />
    </>
  );
};

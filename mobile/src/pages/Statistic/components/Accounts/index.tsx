import { FC, useState } from 'react';
import { Modal, Text, View } from 'react-native';
import { Button, modalStyles } from '@components';
import { styles } from './styles';
import { IAccountsProps } from './interface';

export const Accounts: FC<IAccountsProps> = ({ accounts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <View>
      <Button
        label="Все счета"
        onPress={() => setIsModalOpen(true)}
        variant="outline"
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false);
        }}>
        <View style={modalStyles.container}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Все счета</Text>
              <Text
                style={styles.headerText}
                onPress={() => setIsModalOpen(false)}>
                &times;
              </Text>
            </View>
            {accounts.map((account, index) => (
              <View
                key={account.id}
                style={[
                  styles.accountContainer,
                  { borderBottomWidth: index === accounts.length - 1 ? 0 : 1 },
                ]}>
                <Text style={styles.text}>{account.title}</Text>
                <Text style={styles.text}>{account.amount} сом</Text>
              </View>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

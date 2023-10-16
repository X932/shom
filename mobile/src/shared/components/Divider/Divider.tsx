import { FC } from 'react';
import { StyleSheet, View } from 'react-native';

export const Divider: FC = () => {
  return (
    <View
      style={{
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}
    />
  );
};

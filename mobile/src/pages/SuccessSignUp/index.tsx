import { FC } from 'react';
import { Text } from 'react-native';
import { AuthLayout } from '@ui-layouts';
import { PublicNavigatorScreenProps } from '@interfaces';
import { Button } from '@components';

export const SuccessSignUp: FC<PublicNavigatorScreenProps> = ({
  navigation: { navigate },
}) => {
  return (
    <AuthLayout>
      <Text style={{ textAlign: 'center' }}>Well Done!</Text>
      <Button label="Go to Sign In" onPress={() => navigate('SignUp')} />
    </AuthLayout>
  );
};

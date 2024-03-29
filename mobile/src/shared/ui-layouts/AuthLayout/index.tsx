import { FC, PropsWithChildren, useEffect } from 'react';
import { Image, View } from 'react-native';
import { useAppDispatch } from '@hooks';
import { getToken, removeToken } from '@utils';
import { authentication } from '@slices';
import { styles } from './styles';

export const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();

  const checkAuth = async () => {
    const token = await getToken();

    if (token) {
      dispatch(authentication({ isLoggedIn: true }));
      return;
    }
    dispatch(authentication({ isLoggedIn: false }));
    removeToken();
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <View style={styles.layoutContainer}>
      <Image source={require('../../images/logo.jpeg')} style={styles.logo} />
      <View style={styles.contentContainer}>{children}</View>
    </View>
  );
};

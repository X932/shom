import { FC, PropsWithChildren, useEffect } from 'react';
import { useAppDispatch } from '@hooks';
import { authentication } from '@slices';
import { getToken, removeToken } from '@utils';

export const GuardLayout: FC<PropsWithChildren> = ({ children }) => {
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
    setTimeout(() => {
      checkAuth();
    }, 800);
  }, []);

  return <>{children}</>;
};

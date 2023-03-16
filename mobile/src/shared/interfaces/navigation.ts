import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { ParamListBase } from '@react-navigation/native';

type PublicScrenList = {
  SignUp: undefined;
  SignIn: undefined;
  SuccessSignUp: undefined;
};

export type PublicNavigatorScreenProps = DrawerScreenProps<
  PublicScrenList | ParamListBase,
  keyof PublicScrenList
>;

type PrivateScreenList = {
  Sales: undefined;
};

export type PrivateNavigatorScreenProps = DrawerScreenProps<
  PrivateScreenList | ParamListBase,
  keyof PrivateScreenList
>;

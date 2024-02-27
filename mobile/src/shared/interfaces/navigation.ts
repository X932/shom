import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { ParamListBase } from '@react-navigation/native';
import { IProduct } from './product';

export type PublicScrenList = {
  SignUp: undefined;
  SignIn: undefined;
  SuccessSignUp: undefined;
};

export type PublicNavigatorScreenProps = DrawerScreenProps<
  PublicScrenList | ParamListBase,
  keyof PublicScrenList
>;

export type PrivateScreenList = {
  Sales: undefined;
  ProductCreate: undefined;
  ProductsList: undefined;
  ProductView: Pick<IProduct, 'id'>;
  ProductUpdate: Pick<IProduct, 'id'>;
};

export type PrivateNavigatorScreenProps = DrawerScreenProps<
  PrivateScreenList | ParamListBase,
  keyof PrivateScreenList
>;

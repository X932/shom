import type { ParamListBase } from '@react-navigation/native';
import type { DrawerScreenProps } from '@react-navigation/drawer';

export type RootDrawerParamList =
  | {
      // check is types correct
      SignUp: DrawerScreenProps<RootDrawerParamList, keyof RootDrawerParamList>;
      SuccessSignUp: undefined;
    }
  | ParamListBase;

export type RootDrawerScreenProps<T extends keyof RootDrawerParamList> =
  DrawerScreenProps<RootDrawerParamList, T>;

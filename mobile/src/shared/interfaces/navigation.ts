import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { ParamListBase } from '@react-navigation/native';

type DrawerParamList =
  | {
      SignUp: undefined;
      SuccessSignUp: undefined;
    }
  | ParamListBase;

export type NavigatorScreenProps = DrawerScreenProps<
  DrawerParamList,
  keyof DrawerParamList
>;

import { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { SignIn, SignUp, SuccessSignUp } from '@pages';
import { PrivateNavigatorScreenProps } from '@interfaces';
import { Button } from '@components';
import { useAppDispatch, useAppSelector } from '@hooks';
import { authentication } from '@slices';

const HomeScreen: FC<PrivateNavigatorScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  return (
    <Button
      label="Log out"
      onPress={() => {
        dispatch(authentication({ isLoggedIn: false }));
      }}
    />
  );
};

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer22"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

export const Navigator = (): JSX.Element => {
  const { isLoggedIn, phoneNumber } = useAppSelector(state => state.user);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <>
          {isLoggedIn ? (
            <>
              <Drawer.Screen name="Home" component={HomeScreen} />
            </>
          ) : (
            <>
              {!phoneNumber && (
                <Drawer.Screen
                  name="SignUp"
                  component={SignUp}
                  options={{
                    title: 'Регистрация',
                    headerLeft: () => <></>,
                    headerTitleAlign: 'center',
                    swipeEnabled: false,
                  }}
                />
              )}
              <Drawer.Screen
                name="SuccessSignUp"
                component={SuccessSignUp}
                options={{
                  title: 'Регистрация пройдена',
                  headerLeft: () => <></>,
                  headerTitleAlign: 'center',
                  swipeEnabled: false,
                }}
              />
              <Drawer.Screen
                name="SignIn"
                component={SignIn}
                options={{
                  title: 'Вход',
                  headerLeft: () => <></>,
                  headerTitleAlign: 'center',
                  swipeEnabled: false,
                }}
              />
            </>
          )}
        </>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

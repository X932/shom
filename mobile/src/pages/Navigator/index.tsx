import type { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { SignUp, SuccessSignUp } from '@pages';
import { PrivateNavigatorScreenProps } from '@interfaces';
import { Button } from '@components';

const HomeScreen: FC<PrivateNavigatorScreenProps> = ({ navigation }) => {
  return (
    <Button
      label="Go to Jane's profile"
      onPress={() => navigation.navigate('Home')}
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

const isLoggedIn = false;
const Drawer = createDrawerNavigator();

export const Navigator = (): JSX.Element => {
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
            </>
          )}
        </>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

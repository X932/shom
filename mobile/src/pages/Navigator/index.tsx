import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { Sales, SignIn, SignUp, SuccessSignUp } from '@pages';
import { useAppDispatch, useAppSelector } from '@hooks';
import { authentication } from '@slices';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const dispatch = useAppDispatch();
  const logOutHandler = () => {
    dispatch(authentication({ isLoggedIn: false }));
    props.navigation.closeDrawer();
  };
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Выйти" onPress={logOutHandler} />
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
              <Drawer.Screen name="Sales" component={Sales} />
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
                name="SignIn"
                component={SignIn}
                options={{
                  title: 'Вход',
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

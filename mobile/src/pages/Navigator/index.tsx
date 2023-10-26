import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import {
  ProductCreate,
  ProductsList,
  Sales,
  SignIn,
  SignUp,
  SuccessSignUp,
} from '@pages';
import { useAppDispatch, useAppSelector } from '@hooks';
import { authentication } from '@slices';
import { removePhoneNumber, removeToken } from '@utils';
import { PrivateScreenList } from '@interfaces';
import { ProductView } from '../ProductView';

const EXCLUDED_DRAWER_ROUTES: (keyof PrivateScreenList)[] = ['ProductView'];

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { state, ...restProps } = props;
  const dispatch = useAppDispatch();

  const logOutHandler = () => {
    dispatch(authentication({ isLoggedIn: false }));
    removeToken();
    restProps.navigation.closeDrawer();
  };

  const logOutAccountHandler = async () => {
    await removePhoneNumber();
    await removeToken();
    dispatch(authentication({ isLoggedIn: false }));
    restProps.navigation.closeDrawer();
  };

  const newState = { ...state };
  newState.routes = newState.routes.filter(
    ({ name }) =>
      !EXCLUDED_DRAWER_ROUTES.includes(name as keyof PrivateScreenList),
  );

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...restProps} state={newState} />
      <DrawerItem label="Выйти" onPress={logOutHandler} />
      <DrawerItem label="Выход из акк" onPress={logOutAccountHandler} />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

export const Navigator = (): JSX.Element => {
  const { isLoggedIn, phoneNumber } = useAppSelector(state => state.user);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}
        backBehavior="history">
        <>
          {isLoggedIn ? (
            <>
              <Drawer.Screen
                name="ProductCreate"
                component={ProductCreate}
                options={{
                  title: 'Создание продукта',
                  headerTitleAlign: 'center',
                }}
              />
              <Drawer.Screen
                name="ProductsList"
                component={ProductsList}
                options={{
                  title: 'Список продуктов',
                  headerTitleAlign: 'center',
                }}
              />
              <Drawer.Screen
                name="ProductView"
                component={ProductView}
                options={{
                  title: 'Продукт',
                  headerTitleAlign: 'center',
                }}
              />
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

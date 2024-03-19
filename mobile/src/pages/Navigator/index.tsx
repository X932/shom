import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
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
import { styles } from './styles';
import { ProductView } from '../ProductView';
import { ProductUpdate } from '../ProductUpdate';
import { Statistic } from '../Statistic';
import { TransactionCreate } from '../TransactionCreate';

const EXCLUDED_DRAWER_ROUTES: (keyof PrivateScreenList)[] = [
  'ProductView',
  'ProductUpdate',
];

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

  const currentRoute = {
    index: state.index,
    name: '',
  };

  const newState = { ...state };
  newState.routes = newState.routes.filter(({ name }, index) => {
    if (currentRoute.index === index) {
      currentRoute.name = name;
    }
    return !EXCLUDED_DRAWER_ROUTES.includes(name as keyof PrivateScreenList);
  });

  return (
    <DrawerContentScrollView {...restProps}>
      {newState.routes.map(route => (
        <DrawerItem
          labelStyle={
            currentRoute.name === route.name
              ? styles.activeDrawerItemLabel
              : styles.defaultDrawerItemLabel
          }
          style={
            currentRoute.name === route.name
              ? styles.activeDrawerItemBg
              : styles.defaultDrawerItemBg
          }
          key={route.key}
          label={props.descriptors[route.key]?.options.title || route.name}
          onPress={() => props.navigation.navigate(route.name)}
        />
      ))}
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
              <Drawer.Screen
                name="ProductUpdate"
                component={ProductUpdate}
                options={{
                  title: 'Обновление продукта',
                  headerTitleAlign: 'center',
                }}
              />
              <Drawer.Screen
                name="Sales"
                component={Sales}
                options={{
                  title: 'Продать',
                  headerTitleAlign: 'center',
                }}
              />
              <Drawer.Screen
                name="Statistic"
                component={Statistic}
                options={{
                  title: 'Статистика',
                  headerTitleAlign: 'center',
                }}
              />
              <Drawer.Screen
                name="TransactionCreate"
                component={TransactionCreate}
                options={{
                  title: 'Добавить транзакцию',
                  headerTitleAlign: 'center',
                }}
              />
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

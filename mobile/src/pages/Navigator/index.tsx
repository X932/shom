import type { FC } from 'react';
import { Button, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

const HomeScreen: FC<any> = ({ navigation }) => {
  return (
    <Button
      title="Go to Jane's profile"
      onPress={() => navigation.navigate('profile', { name: 'Jane' })}
    />
  );
};

const ProfileScreen: FC<any> = ({ navigation, route }) => {
  return <Text>This is {route.params?.name}'s profile</Text>;
};

function CustomDrawerContent(props: any) {
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

const isLoggedIn = true;
const Drawer = createDrawerNavigator();

export const Navigator = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <>
          {isLoggedIn ? (
            <>
              <Drawer.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Welcome' }}
              />
            </>
          ) : (
            <>
              <Drawer.Screen
                name="profile"
                component={ProfileScreen}
                options={{
                  title: 'Welcome to profile',
                  headerShown: false,
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

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';


import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import AuthStackNavigator from './src/navigation/AuthStackNavigator';

import AboutUsScreen from './src/screens/Main/AboutUs';
import DrawerContent from './src/screens/Main/DrawerContent';
import Profile from './src/screens/Main/ProfileScreen';
import {connect} from 'react-redux';
import EditProfileScreen from './src/screens/Main/EditProfileScreen';


const Drawer = createDrawerNavigator();
const ProfileStack = createStackNavigator();

const App = (props) => {
  return (
    <>
      <NavigationContainer>
        {props.isLoggedIn == true ? (
          <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={BottomTabNavigator} />
            <Drawer.Screen name="ProfileScreen" component={ProfileStackScreen} />
            <Drawer.Screen name="AboutUsScreen" component={AboutUsScreen} />
          </Drawer.Navigator>
        ) : (
          <AuthStackNavigator />
        )}
      </NavigationContainer>
    </>
  );
};

const ProfileStackScreen = () =>(
  <ProfileStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
      <ProfileStack.Screen name="ProfileScreen" component={Profile} />
      <ProfileStack.Screen name="EditProfileScreen" component={EditProfileScreen} /> 
    </ProfileStack.Navigator>
)

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps, {})(App);

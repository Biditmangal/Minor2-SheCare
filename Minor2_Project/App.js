import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import AuthStackNavigator from './src/navigation/AuthStackNavigator';

import AboutUsScreen from './src/screens/Main/AboutUs';
import DrawerContent from './src/screens/Main/DrawerContent';
import {connect} from 'react-redux';

const Drawer = createDrawerNavigator();

const App = (props) => {
  const item = {
    prImage: 'https://picsum.photos/720',
    prName: 'Giana Dias',
    prUsername: 'gianadias',
    prDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est ut aenean leo nibh leo adipiscing.' +
      'Odio id in ac augue vitae. Dolor vulputate libero est ut.' +
      ' Scelerisque sed cursus tristique proin ipsum pellentesque. Ut et quam ultricies.',
  };

  return (
    <>

      <NavigationContainer>
        
        {props.isLoggedIn == true ? (
          <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={BottomTabNavigator} />
            {/* <Drawer.Screen
              name="Profile"
              component={() => <Profile item={item} />}
            /> */}
            <Drawer.Screen name="AboutUsScreen" component={AboutUsScreen} />
          </Drawer.Navigator>
        ) : (
          <AuthStackNavigator />
        )}
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps, {})(App);

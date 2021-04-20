import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';


import BottomTabNavigator from './src/navigation/BottomTabNavigator'
import Profile from './src/screens/Main/ProfileScreen.js';
import AboutUsScreen from './src/screens/Main/AboutUs';
import DrawerContent from './src/screens/Main/DrawerContent';
import SignUp from './src/screens/Main/SignUp'
import SignIn from './src/screens/Main/SignIn';


const Drawer = createDrawerNavigator();


const App = () => {

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
      {/* <View style={styles.container}>
        <InformationScreen/>
        <Profile item={item} />
      </View> */}

      <NavigationContainer>
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="Home" component={BottomTabNavigator} />
          {/* <Drawer.Screen name="Profile" component={<Profile item={item}/>} /> */}
          <Drawer.Screen name="AboutUsScreen" component={SignUp} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

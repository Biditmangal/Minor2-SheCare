import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SignUp from '../screens/Auth/SignUp';
import SignIn from '../screens/Auth/SignIn';


const authStack = createStackNavigator();

const Stack = () => (
  <authStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <authStack.Screen name="Login" component={SignIn} />
    <authStack.Screen name="Register" component={SignUp} />
  </authStack.Navigator>
);

export default Stack;

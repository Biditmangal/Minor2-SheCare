import * as React from 'react';
import {Icon} from 'react-native-elements';
import { responsiveHeight } from 'react-native-responsive-dimensions';
// import Icon from 'react-native-vector-icons/Octicons';

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  return (
    <Icon
      name={props.name}
      type={props.type}
      size={props.focused ? responsiveHeight(4.5) : responsiveHeight(3.5)}
      // style={{marginBottom: -3}}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}

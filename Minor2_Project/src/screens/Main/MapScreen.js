import React from 'react';
import {Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import Colors from '../../constants/Colors';

const MapScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Icon
        name="developer-mode"
        type="material"
        color={Colors.tintColor}
        size={100}
        solid
      />
      <Text
        style={{
          margin:20,
          fontFamily: 'Montserrat-Medium',
          fontSize:20,
        }}>
        Maps Under Development
      </Text>
    </View>
  );
};

export default MapScreen;

import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import Colors from '../constants/Colors';


const TextButton = ({text}) => {
  return (
    <View
      style={{
        alignItems: 'center',
      }}>
      <TouchableOpacity
        style={{
          marginTop: 40,
        }}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[Colors.primaryColor, Colors.secondaryColor]}
          style={styles.btn}
          useAngle={true}
          angle={120}
          angleCenter={{x: 1, y: 0}}>
          <Text style={styles.btntext}>{text}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(40),
    height: responsiveHeight(4.8),
  },
  btntext: {
    color: Colors.tintColor,
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
});
export default TextButton;

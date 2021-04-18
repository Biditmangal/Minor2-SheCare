import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Card} from 'react-native-elements';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import InputField from '../../components/InputField';
import TextButton from '../../components/TextButton';
import Colors from '../../constants/Colors';

const MapScreen = () => {
  const [text, setText] = useState('');
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.tintColor,
      }}>
      {/* <Text>MapScreen Under Development</Text> */}
      <Card containerStyle={styles.container}>
        <InputField
          icon={true}
          name="Email"
          placeholder="Email"
          onChangeText={setText}
          iconName="user"
          iconType="antdesign"
        />
        <View
          style={{
            marginTop: 30,
          }}
        />
        <InputField
          icon={true}
          name="Password"
          placeholder="Password"
          secureEntry
          onChangeText={setText}
          iconName="lock-outline"
          iconType="material"
        />
        <TextButton text="Login" />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(80),
    paddingTop: responsiveWidth(6),
    paddingHorizontal: responsiveWidth(6),
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
});
export default MapScreen;

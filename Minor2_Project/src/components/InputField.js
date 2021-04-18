import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Icon} from 'react-native-elements';
import Colors from '../constants/Colors';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
const InputField = ({
  placeholder,
  onChangeText,
  icon,
  iconName,
  iconType,
  phoneField,
  numeric,
  secureEntry,
}) => {
  return (
    <View>
      <View style={styles.formElement}>
        {icon ? (
          <Icon
            name={iconName}
            size={responsiveWidth(6)}
            type={iconType}
            color={Colors.tintColor}
            style={{paddingRight: 5}}
          />
        ) : (
          <></>
        )}

        {phoneField ? (
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={Colors.placeholderColor}
            style={styles.input}
            keyboardType={numeric}
            secureTextEntry={secureEntry}
            maxLength={10}
            onChangeText={(Text) => onChangeText(Text)}
          />
        ) : (
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={Colors.placeholderColor}
            style={styles.input}
            keyboardType={numeric}
            secureTextEntry={secureEntry}
            onChangeText={(Text) => onChangeText(Text)}
          />
        )}
      </View>
      <View
        style={{
          marginHorizontal: 10,
          borderBottomColor: Colors.tabIconDefault, 
          borderBottomWidth: 1,
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  formElement: {
    backgroundColor: Colors.tabBar,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    fontSize: responsiveFontSize(1.5),
    width: responsiveWidth(80),
  },
});
export default InputField;

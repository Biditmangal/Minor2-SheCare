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
  icon,
  iconName,
  iconType,
  numeric,
  secureEntry,
  ...props
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

        <TextInput
          placeholder={placeholder}
          placeholderTextColor={Colors.placeholderColor}
          style={styles.input}
          keyboardType={numeric}
          secureTextEntry={secureEntry}
          {...props}
        />
      </View>
      <View
        style={{
          marginHorizontal: 10,
          borderBottomColor: Colors.tabIconDefault,
          borderBottomWidth: 1,
        }}
      />
      <Text style={styles.errorInput}>{props.touched && props.error}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  formElement: {
    backgroundColor: Colors.tabBar,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: -5,
  },
  input: {
    fontSize: responsiveFontSize(1.8),
    width: responsiveWidth(80),
    fontFamily: 'Montserrat-Bold',
  },
  errorInput: {
    color: Colors.tintColor,
    fontSize: responsiveFontSize(1.5),
    paddingHorizontal: responsiveWidth(2),
    fontFamily:'Montserrat-Regular',
  },
});

InputField.propTypes = {
  ...TextInput.propTypes, // this makes the Input component have proptypes of Textinput
};

InputField.defaultProps = {
  touched: false,
  error: null,
};
export default InputField;

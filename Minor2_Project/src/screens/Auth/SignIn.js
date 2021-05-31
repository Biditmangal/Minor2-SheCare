import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Card} from 'react-native-elements';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {connect} from 'react-redux';
import {Login, ResetError, handlePasswordReset} from '../../redux/actions/authActions';
import Snackbar from 'react-native-snackbar';

import InputField from '../../components/InputField';
import TextButton from '../../components/TextButton';
import Colors from '../../constants/Colors';
import ScreenLoader from '../../components/Loader/ScreenLoader';

const SignIn = (props) => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const {loading, error} = props;

  const onClick = () => {
    props.Login(data.email, data.password);
    if (!loading) {
      Snackbar.show({
        text: 'Signed In Successfully',
        duration: Snackbar.LENGTH_LONG,
        textColor: Colors.tabIconDefault,
        fontFamily: 'Montserrat-Bold',
        backgroundColor: Colors.primaryColor,
      });
    }
  };

  if (loading) {
    <ScreenLoader />;
  }

  if (error) {
    Alert.alert(
      'Try again',
      'Server error',
      [{text: 'OK', onPress: () => props.ResetError()}],
      {cancelable: false},
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.tintColor,
      }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SheCare</Text>
        <Text style={styles.subHeaderText}>Curating Content for Women</Text>
      </View>
      <Card containerStyle={styles.container}>
        <InputField
          icon={true}
          placeholder="Email"
          onChangeText={(text) => {
            setData({
              ...data,
              email: text,
            });
          }}
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
          placeholder="Password"
          secureEntry
          iconName="lock-outline"
          iconType="material"
          onChangeText={(text) => {
            setData({
              ...data,
              password: text,
            });
          }}
        />
        <View style={styles.subButton}>
          <TouchableOpacity onPress={() => props.handlePasswordReset("nikita.juneja289@gmail.com")}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 20,
          }}
        />
        <TextButton text="Login" onPress={onClick} />
      </Card>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Not a Member?</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
          <Text style={styles.footerTextButton}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(80),
    paddingVertical: responsiveWidth(6),
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
  header: {
    alignItems: 'center',
    position: 'absolute',
    top: responsiveHeight(7),
  },
  headerText: {
    color: Colors.primaryColor,
    fontSize: responsiveFontSize(5),
    fontFamily: 'Montserrat-Bold',
  },
  subHeaderText: {
    color: Colors.primaryColor,
    fontSize: responsiveFontSize(2),
    fontFamily: 'Montserrat-Bold',
  },
  subButton: {
    marginTop: 10,
    marginHorizontal: responsiveWidth(2),
  },
  forgotPassword: {
    color: Colors.tintColor,
    fontSize: responsiveFontSize(1.7),
    fontFamily: 'Montserrat-Bold',
  },
  footer: {
    position: 'absolute',
    bottom: responsiveHeight(3),
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  footerText: {
    fontSize: responsiveFontSize(1.5),
    color: Colors.additionalColor,
    fontFamily: 'Montserrat-Bold',
  },
  footerTextButton: {
    fontSize: responsiveFontSize(1.9),
    color: Colors.noticeText,
    fontFamily: 'Montserrat-Bold',
  },
});

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isLoggedIn: state.auth.isLoggedIn,
});
// export default SignIn;
export default connect(mapStateToProps, {Login, ResetError, handlePasswordReset})(SignIn);

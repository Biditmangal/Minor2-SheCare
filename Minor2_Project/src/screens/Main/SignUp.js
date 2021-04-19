import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Card} from 'react-native-elements';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {DateTimePickerModal} from 'react-native-modal-datetime-picker';
import moment from 'moment';

import InputField from '../../components/InputField';
import TextButton from '../../components/TextButton';
import Colors from '../../constants/Colors';

const validationSchema = Yup.object().shape({
  name: Yup.string().label('Name').required(),
  email: Yup.string().label('Email Id').required(),
  gender: Yup.string().label('Gender').required(),
  username: Yup.string().label('Username').required('Enter a unique username'),
  password: Yup.string().label('Password').required(),
  mobile_number: Yup.string()
    .label('Mobile No.')
    .required()
    .min(10, 'Contact Number must be of 10 digits. ')
    .max(10, 'Contect Number cannot exceed than 10 digits.'),
  aadhar_number: Yup.string()
    .label('Aadhar No.')
    .required()
    .min(10, 'Contact Number must be of 10 digits. ')
    .max(10, 'Contect Number cannot exceed than 10 digits.'),
});
const SignUp = () => {
  // const separatorSpace = 7;
  const initialValues = {
    name: '',
    email: '',
    gender: '',
    username: '',
    password: '',
    mobile_number: '',
    aadhar_number: '',
  };
  const submitForm = (values) => {
    console.log(values);
  };
  const [dob, setDob] = useState('Date of Birth');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    //console.warn("A date has been picked: ", date);
    let newdate = moment(date).format('DD-MM-YYYY');
    hideDatePicker();
    setDob(newdate);
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.tintColor,
      }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Sign Up</Text>
      </View>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitForm}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          touched,
          errors,
          values,
          isValid,
          isSubmitting,
        }) => {
          return (
            <>
              <Card containerStyle={styles.container}>
                <KeyboardAwareScrollView>
                  <InputField
                    icon={false}
                    placeholder="Name"
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    touched={touched.name}
                    error={errors.name}
                    iconName="user"
                    iconType="antdesign"
                  />
                  <InputField
                    icon={false}
                    placeholder="Email"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    touched={touched.email}
                    error={errors.email}
                  />
                  <InputField
                    icon={false}
                    placeholder="Gender"
                    onChangeText={handleChange('gender')}
                    onBlur={handleBlur('gender')}
                    value={values.gender}
                    touched={touched.gender}
                    error={errors.gender}
                  />
                  <View style={styles.inputDate}>
                    <TouchableOpacity onPress={showDatePicker}>
                      {dob === 'Date of Birth' ? (
                        <Text style={styles.labelDate}>{dob}</Text>
                      ) : (
                        <Text
                          style={[
                            styles.labelDate,
                            {color: Colors.tabIconDefault},
                          ]}>
                          {dob}
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: responsiveFontSize(1),
                      paddingHorizontal: 10,
                    }}>
                    bob
                  </Text>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                  />
                  <InputField
                    icon={false}
                    placeholder="Username"
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                    touched={touched.username}
                    error={errors.username}
                  />
                  <InputField
                    icon={false}
                    placeholder="Password"
                    secureEntry
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    touched={touched.password}
                    error={errors.password}
                  />
                  <InputField
                    icon={false}
                    numeric="phone-pad"
                    placeholder="Mobile No."
                    onChangeText={handleChange('mobile_number')}
                    onBlur={handleBlur('mobile_number')}
                    value={values.mobile_number}
                    touched={touched.mobile_number}
                    error={errors.mobile_number}
                  />
                  <InputField
                    icon={false}
                    numeric="phone-pad"
                    placeholder="Aadhar Card No."
                    onChangeText={handleChange('aadhar_number')}
                    onBlur={handleBlur('aadhar_number')}
                    value={values.aadhar_number}
                    touched={touched.aadhar_number}
                    error={errors.aadhar_number}
                  />
                  <TextButton text="Register" onPress={handleSubmit} />
                </KeyboardAwareScrollView>
              </Card>
            </>
          );
        }}
      </Formik>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already a Member?</Text>
        <TouchableOpacity>
          <Text style={styles.footerTextButton}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(80),
    paddingVertical: responsiveWidth(4),
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
    top: responsiveHeight(2),
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
    bottom: responsiveHeight(1),
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  footerText: {
    fontSize: responsiveFontSize(2.1),
    color: Colors.additionalColor,
    fontFamily: 'Montserrat-Bold',
  },
  footerTextButton: {
    fontSize: responsiveFontSize(2.8),
    color: Colors.noticeText,
    fontFamily: 'Montserrat-Bold',
  },
  inputDate: {
    backgroundColor: Colors.tabBar,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    borderBottomColor: Colors.tabIconDefault,
    borderBottomWidth: 1,
    marginVertical: 5,
  },
  labelDate: {
    marginBottom: responsiveHeight(1.6),
    marginHorizontal: responsiveWidth(0.7),
    fontSize: responsiveFontSize(1.8),
    fontFamily: 'Montserrat-Bold',
    color: Colors.placeholderColor,
  },
});
export default SignUp;

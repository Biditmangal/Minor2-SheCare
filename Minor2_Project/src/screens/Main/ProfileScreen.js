import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {ImageBackground, StyleSheet, Text, View,Alert} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import {getProfile, ResetError} from '../../redux/actions/authActions';
import ScreenLoader from '../../components/Loader/ScreenLoader';

import {
  responsiveWidth,
  useResponsiveHeight,
  useResponsiveWidth,
} from 'react-native-responsive-dimensions';

import {connect} from 'react-redux';

const Profile = (props) => {
  useEffect(() => {
    props.getProfile();

    const listener = props.navigation.addListener('focus', () => {
      props.getProfile();
    });

    return () => listener();
  }, [props.navigation]);

  // if (props.error) {
  //   Alert.alert(
  //     'Try again',
  //     'Error in Profile Screen',
  //     [{text: 'OK', onPress: () => props.ResetError()}],
  //     {cancelable: false},
  //   );
  // }

  return (
    <>
      <ImageBackground source={{uri: props.prImage}} style={styles.container}>
        <View
          style={{
            marginTop: 30,
            marginLeft: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}>
            <Icon
              name="arrow-back"
              type="ionicon"
              size={38}
              color="#fff"
              containerStyle={{
                alignItems: 'flex-start',
                paddingTop: 10,
                paddingLeft: 10,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.MainContainer}>
          <Card containerStyle={styles.Card}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flex: 5,
                  justifyContent: 'flex-start',
                  marginTop: 10,
                }}>
                <Text style={styles.title}>{props.prName}</Text>
                <Text style={styles.username}>{'@' + props.prUsername}</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    console.log('Edit Profile: Clicked');
                    props.navigation.navigate('EditProfileScreen');
                  }}>
                  <Icon
                    name="edit"
                    color="#fff"
                    containerStyle={{
                      width: useResponsiveWidth(13),
                      height: useResponsiveHeight(7),
                      borderRadius: useResponsiveWidth(16),
                      backgroundColor: '#C54D7B',
                      alignContent: 'center',
                      justifyContent: 'center',
                      shadowColor: '#C54D6B',
                      shadowOffset: {
                        width: 2,
                        height: 4,
                      },
                      shadowOpacity: 0.5,
                      shadowRadius: 5.46,
                      elevation: 12,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                paddingTop: 10,
                paddingRight: 5,
              }}>
              <Text style={styles.desc}>{props.prDescription}</Text>
            </View>
          </Card>
        </View>
      </ImageBackground>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    // resizeMode:'cover',
  },
  MainContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  Card: {
    width: responsiveWidth(100),
    marginLeft: 0,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingBottom: 30,
  },
  title: {
    fontSize: 30,
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
  },
  username: {
    fontSize: 18,
    color: '#7E7E7E',
    fontFamily: 'Montserrat-Medium',
  },
  desc: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
    fontFamily: 'Montserrat-Medium',
  },
});

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  prImage: state.auth.profilePic,
  prUsername: state.auth.username,
  prName: state.auth.name,
  prDescription: state.auth.description,
});

export default connect(mapStateToProps, {getProfile, ResetError})(Profile);

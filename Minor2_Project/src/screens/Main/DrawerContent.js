import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, Linking, Text, Alert} from 'react-native';
import {DrawerItem} from '@react-navigation/drawer';
import {Drawer} from 'react-native-paper';
import {Icon} from 'react-native-elements';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {connect} from 'react-redux';
import {Logout, ResetError} from '../../redux/actions/authActions';
import ScreenLoader from '../../components/Loader/ScreenLoader';
import Snackbar from 'react-native-snackbar';
import Colors from '../../constants/Colors';

const DrawerContent = (props) => {

  const {loading, error} = props;
  const onClick = () => {
    console.log('laoding => ', loading, 'error => ', error);
    props.Logout();
    Snackbar.show({
      text: 'Signed Out Successfully',
      duration: Snackbar.LENGTH_LONG,
      textColor: Colors.tabIconDefault,

      fontFamily: 'Montserrat-Bold',
      backgroundColor: Colors.primaryColor,
    });
  };
  // if (loading) {
  //   <ScreenLoader />;
  // }
  // if (error) {
  //   Alert.alert(
  //     'Try again',
  //     'Server error',
  //     [{text: 'OK', onPress: () => props.ResetError()}],
  //     {cancelable: false},
  //   );
  // }
  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            flex: 1.25,
            alignItems: 'flex-start',
            backgroundColor: Colors.tintColor,
          }}>
          {/* <Image
            source={{
              uri: data.profilePic,
            }}
            style={styles.avatar}
          /> */}
          <Image
            source={{
              uri: props.profilePic,
            }}
            style={styles.avatar}
          />
          <Text style={styles.titleName}>{props.name}</Text>
          <Text style={styles.username}>{'@' + props.username}</Text>
        </View>

        <View
          style={{
            flex: 4,
            backgroundColor: '#FFF',
            marginTop: 12,
          }}>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon
                  name="user-alt"
                  type="font-awesome-5"
                  size={size}
                  color={color}
                />
              )}
              inactiveTintColor="#5F5F5F"
              label="Profile"
              onPress={() => {
                console.log('clicked');
                props.navigation.navigate('ProfileScreen');
              }}
              labelStyle={{
                fontSize: 18,
                fontFamily: 'Montserrat-Bold',
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon
                  name="info-circle"
                  type="font-awesome-5"
                  size={size}
                  color={color}
                />
              )}
              inactiveTintColor="#5F5F5F"
              label="About Us"
              onPress={() => {
                props.navigation.navigate('AboutUsScreen');
              }}
              labelStyle={{
                fontSize: 18,
                fontFamily: 'Montserrat-Bold',
              }}
            />
          </Drawer.Section>
        </View>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            icon={({color, size}) => (
              <Icon
                name="sign-out-alt"
                type="font-awesome-5"
                color={color}
                size={size}
              />
            )}
            label="Sign Out"
            inactiveTintColor="#5F5F5F"
            onPress={onClick}
            labelStyle={{
              fontSize: 24,
              fontFamily: 'Montserrat-Medium',
            }}
          />
        </Drawer.Section>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingBottom: 20,
  },
  avatar: {
    margin: 10,
    marginTop: 20,
    height: responsiveHeight(9),
    width: responsiveWidth(18),
    borderRadius: responsiveHeight(30),
  },
  titleName: {
    fontSize: responsiveFontSize(2),
    marginTop: 5,
    marginLeft: 10,
    color: '#FFF',
    fontFamily: 'Montserrat-SemiBold',
  },
  username: {
    fontSize: responsiveFontSize(1.5),
    marginLeft: 10,
    color: '#FFF',
    fontFamily: 'Montserrat-Medium',
  },
  drawerSection: {},
});

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isLoggedIn: state.auth.isLoggedIn,
  username: state.auth.username,
  profilePic: state.auth.profilePic,
  name:state.auth.name,
});

export default connect(mapStateToProps, {Logout, ResetError})(DrawerContent);
// export default DrawerContent;

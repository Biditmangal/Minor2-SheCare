import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import {
  responsiveHeight,
  responsiveWidth,
  //   responsiveFontSize,
  useResponsiveHeight,
  useResponsiveWidth,
} from 'react-native-responsive-dimensions';

const Profile = (props) => {
  return (
    <>
      <ImageBackground
        source={{uri: props.item.prImage}}
        style={styles.container}>
        <View>
          <Icon
            name="arrow-back"
            type="iconinon"
            size={32}
            color="#C54D7B"
            containerStyle={{
              alignItems: 'flex-start',
              paddingTop: 30,
              paddingLeft: 10,
            }}
          />
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
                <Text style={styles.title}>{props.item.prName}</Text>
                <Text style={styles.username}>
                  {'@' + props.item.prUsername}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <Icon
                  name="edit"
                  // type="font-awesome-5"
                  // size={25}
                  color="#fff"
                  containerStyle={{
                    width: useResponsiveWidth(15),
                    height: useResponsiveHeight(8),
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
              </View>
            </View>
            <View
              style={{
                paddingTop: 10,
                paddingRight: 5,
              }}>
              <Text style={styles.desc}>{props.item.prDescription}</Text>
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
  },
  title: {
    fontSize: 30,
    color: '#000',
  },
  username: {
    fontSize: 18,
    color: '#7E7E7E',
  },
  desc: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
});

export default Profile;

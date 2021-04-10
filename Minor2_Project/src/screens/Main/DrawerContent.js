import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, Linking, Text} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';
import {Drawer} from 'react-native-paper';
import {Icon} from 'react-native-elements';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const DrawerContent = (props) => {
  const [data, setData] = useState({
    name: 'Giana Dias',
    username: 'gianadias',
    profilePic:
      'data:image/jpeg;base64,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',
  });
    const item = {
      prImage: 'https://picsum.photos/720',
      prName: 'Giana Dias',
      prUsername: 'gianadias',
      prDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est ut aenean leo nibh leo adipiscing.' +
        'Odio id in ac augue vitae. Dolor vulputate libero est ut.' +
        ' Scelerisque sed cursus tristique proin ipsum pellentesque. Ut et quam ultricies.',
    };

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            flex: 1.25,
            alignItems: 'flex-start',
            backgroundColor: '#C54D7B',
          }}>
          <Image
            source={{
              uri: data.profilePic,
            }}
            style={styles.avatar}
          />
          <Text style={styles.titleName}>{data.name}</Text>
          <Text style={styles.username}>{'@' + data.username}</Text>
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
              // onPress={() => {
              //   props.navigation.navigate('Profile',{
              // 	item
              // });
              // }}
              labelStyle={{
                fontSize: 18,
                fontWeight: 'bold',
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
                fontWeight: 'bold',
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
            // onPress={() => {
            //   signOut();
            // }}
            labelStyle={{
              fontSize: 24,
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
  },
  username: {
    fontSize: responsiveFontSize(1.5),
    marginLeft: 10,
    color: '#FFF',
  },
  drawerSection: {},
});
export default DrawerContent;

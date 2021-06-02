import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constants/Colors';

const AboutUsScreen = (props) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: 10,
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
            color="black"
            containerStyle={{
              alignItems: 'flex-start',
              paddingTop: 10,
              paddingLeft: 10,
            }}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 4,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flex: 1,
            marginLeft: 30,
            marginTop: 30,
            borderRight: 20,
          }}>
          <Image
            style={styles.profileImage}
            resizeMode={'contain'}
            source={{
              uri:
                'https://images.unsplash.com/photo-1599350901064-2280ec14d016?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTUyfHx3b21hbiUyMGFlc3RoZXRpYyUyMGJhY2tncm91bmQlMjBtaW5pbWFsaXN0aWN8ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            }}
          />
        </View>

        <View style={styles.header}>
          <Text style={styles.headerText}>SheCare</Text>
          <Text style={styles.subHeaderText}>Curating Content for Women</Text>
        </View>
      </View>

      <View style={styles.info}>
        <Text>We aim to promote health and nutrition and shape a sustainable community for women with an experiential bent of mindset in an attempt to make their life a bit easier. It provides a safe community forum for women striving towards the same goal, a platform that will provide a check to monitor and manage their health and nutrition levels, will take care of their day to day needs by just a click of a button and also englights them about the various opportunities and the rights they can exercise.</Text>  
        </View> 
        <View style={{
           
        }}>
        <Text style={styles.version}>Version</Text>
        <Text style={styles.versionNo}>1.4</Text>
        </View>
      
       </View>
  );
};


const styles = StyleSheet.create({
  container: {
    //borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 5,
    paddingVertical: 10,
  },
  profileImage: {
    height: responsiveHeight(25),
    width: responsiveWidth(25),
    borderRadius: responsiveWidth(100),
   
  },
  headerText: {
    color: Colors.tintColor,
    fontSize: responsiveFontSize(3),
    fontFamily: 'Montserrat-Bold',
  },
  subHeaderText: {
    color: Colors.tintColor,
    fontSize: responsiveFontSize(1.1),
    fontFamily: 'Montserrat-Bold',
  },
  header: {
    flex: 2,
    paddingLeft: 20,
    height:100,
    top: responsiveHeight(11),
    borderLeftWidth:2,
    borderColor:'#83878d'
  },
  info:{
    marginTop:230,
    marginHorizontal:30,
    fontSize: responsiveFontSize(0.6),
    paddingBottom:20,
    borderBottomWidth:1
  },
  version:{
    fontSize: responsiveFontSize(1.3),
    fontFamily: 'Montserrat-Bold',
    marginLeft:28,
    marginTop:20
  },
  versionNo:{
    fontSize: responsiveFontSize(1.3),
    fontFamily: 'Montserrat',
    marginLeft:28,
    paddingTop:3
  }
});

export default AboutUsScreen;
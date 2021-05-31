import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {ImageBackground, StyleSheet, Text, View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constants/Colors';
import {Card, Icon} from 'react-native-elements';
import InputField from '../../components/InputField';
import TextButton from '../../components/TextButton';
import {
  responsiveWidth,
  responsiveHeight,
  useResponsiveHeight,
  useResponsiveWidth,
} from 'react-native-responsive-dimensions';
import {connect} from 'react-redux';

const EditProfileScreen = (props) => {
  const [data, setData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  return (
    <View style={styles.container}>
      <View
        style={
          {
            // marginTop: 30,
            //marginLeft: 10,
          }
        }>
        <LinearGradient
          colors={[Colors.primaryColor, Colors.secondaryColor]}
          style={styles.gradient}>
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
                type="iconinon"
                size={28}
                color="#fff"
                containerStyle={{
                  width: useResponsiveWidth(11),
                  height: useResponsiveHeight(6),
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
        </LinearGradient>
      </View>
      <View style={styles.MainContainer}>
        <Card containerStyle={styles.Card}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
            }}>
            <View
              style={{
                flex: 2,
                alignItems: 'flex-start',
                marginTop: -30,
              }}>
              <Image
                style={styles.image}
                resizeMode={'contain'}
                source={{uri: props.prImage}}
              />
              <Text style={styles.title}>{props.prName}</Text>
              <Text style={styles.username}>{'@' + props.prUsername}</Text>
            </View>
          </View>
        </Card>
      </View>
      <View>
        <Card containerStyle={styles.card2}>
          <InputField
            icon={true}
            placeholder="Username"
            onChangeText={(text) => {
              setData({
                ...data,
                email: text,
              });
            }}
            iconName="user"
            iconType="antdesign"
          />
          <InputField
            icon={true}
            placeholder="Name"
            iconName="drive-file-rename-outline"
            iconType="material"
            onChangeText={(text) => {
              setData({
                ...data,
                firstName: text,
              });
            }}
          />
          <InputField
            icon={true}
            placeholder="Description"
            iconName="note-outline"
            iconType="material-community"
            onChangeText={(text) => {
              setData({
                ...data,
                lastName: text,
              });
            }}
          />
          {/* <InputField
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
        /> */}
          <View
            style={{
              marginTop: 10,
            }}
          />
          <TextButton text="Edit" />
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  gradient: {
    //borderRadius: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    width: responsiveWidth(100),
    height: responsiveHeight(34),
  },
  Card: {
    marginTop: -90,
    marginBottom: 10,
    width: responsiveWidth(90),
    height: responsiveHeight(20),
    marginLeft: 20,
    borderRadius: 25,
  },
  title: {
    marginTop: -60,
    display: 'flex',
    alignSelf: 'center',
    fontSize: 30,
    color: '#000',
  },
  username: {
    alignSelf: 'center',
    fontSize: 18,
    color: '#7E7E7E',
  },
  image: {
    marginTop: -100,
    height: responsiveHeight(30),
    width: responsiveWidth(30),
    borderRadius: responsiveWidth(6),
    alignSelf: 'center',
  },
  card2: {
    borderRadius: 30,
    marginTop: 20,
  },
});

const mapStateToProps = (state) => ({
  prImage: state.auth.profilePic,
  prUsername: state.auth.username,
  prName: state.auth.name,
});

export default connect(mapStateToProps, {})(EditProfileScreen);

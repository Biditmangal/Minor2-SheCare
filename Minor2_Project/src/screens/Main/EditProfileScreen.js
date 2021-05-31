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
} from 'react-native-responsive-dimensions';
import {connect} from 'react-redux';
import {updateProfile} from '../../redux/actions/authActions';

const EditProfileScreen = (props) => {
  const [data, setData] = useState({
    username: '',
    name: '',
    description: '',
  });

  const onClick = () => {
    props.updateProfile(data.username, data.name, data.desciption);
    props.navigation.navigate('ProfileScreen');
  };

  return (
    <View style={styles.container}>
      <View>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[Colors.primaryColor, Colors.secondaryColor]}
          style={styles.gradient}
          useAngle={true}
          angle={-60}
          angleCenter={{x: 0.3, y: 1}}>
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
                color="#fff"
                containerStyle={{
                  alignItems: 'flex-start',
                  paddingTop: 10,
                  paddingLeft: 10,
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
                username: text,
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
                name: text,
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
                desciption: text,
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
          <TextButton text="Edit" onPress={onClick} />
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
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
    marginTop: -50,
    display: 'flex',
    alignSelf: 'center',
    fontSize: 30,
    color: '#000',
    fontFamily: 'Montserrat-Medium',
  },
  username: {
    alignSelf: 'center',
    fontSize: 18,
    color: '#7E7E7E',
    fontFamily: 'Montserrat-Medium',
  },
  image: {
    marginTop: -120,
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
  loading: state.auth.loading,
  error: state.auth.error,
  prImage: state.auth.profilePic,
  prUsername: state.auth.username,
  prName: state.auth.name,
});

export default connect(mapStateToProps, {updateProfile})(EditProfileScreen);

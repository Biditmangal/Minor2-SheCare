import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import colors from '../constants/Colors';
import {Icon} from 'react-native-elements';

const ImageSelector = (props) => {
  const [filePath, setFilePath] = useState({});
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: false,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        console.log('response ', response.assets[0].uri);
        console.log('full response====>',response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        setFilePath(response);
        props.imageSelector(response.uri);
        props.modalHide(false);
      });
    }
  };

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      setFilePath(response);
      props.imageSelector(response.uri);
      props.modalHide(false);
    });
  };

  return (
    <Modal isVisible={props.visible} style={styles.modalConatiner}>
      <View style={styles.modalBody}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
            textAlign: 'center',
          }}>
          {props.title}
        </Text>
        <View style={styles.buttonWrapper}>
          <View style={styles.btn}>
            <TouchableOpacity
              onPress={() => chooseFile('photo')}
              title="Gallery"
              style={{backgroundColor: 'none'}}>
              <Icon
                name="md-images"
                size={50}
                type="ionicon"
                color={colors.tintColor}
                style={{marginBottom: 4}}
              />
              <Text style={{textAlign: 'center', fontSize: 16}}>Gallery</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btn}>
            <TouchableOpacity
              onPress={() => captureImage('photo')}
              title="Camera"
              style={{backgroundColor: 'none'}}>
              <Icon
                name="ios-camera"
                size={50}
                color={colors.tintColor}
                style={{marginLeft: 5, marginBottom: 4}}
                type="ionicon"
              />
              <Text style={{textAlign: 'center', fontSize: 16}}>Camera</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => props.modalHide(false)}
          title="Cancel">
          {/* <Ionicons name="md-close-circle" /> */}
          <Text style={{textAlign: 'center', fontSize: 16}}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalConatiner: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 0,
    margin: 0,
  },
  modalBody: {
    backgroundColor: 'white',
    paddingTop: 20,
    justifyContent: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    textAlign: 'center',
    width: '100%',
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignContent: 'stretch',
    width: Dimensions.get('window').width,
  },
  btn: {
    width: Dimensions.get('window').width / 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  cancelBtn: {
    backgroundColor: '#f7f7f7',
    padding: 12,
    justifyContent: 'center',
  },
});

export default ImageSelector;

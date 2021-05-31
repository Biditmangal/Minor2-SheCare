import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity,TouchableHighlight} from 'react-native-gesture-handler';
import ImageSelector from './ImageSelector';
import Colors from '../constants/Colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Icon} from 'react-native-elements';


const ChooseFile = ({imagePath, name, selectImage, square}) => {
  let [isImagePicker, setImagePicker] = useState(false);

  const updatePicker = useCallback((value)=>{
    setImagePicker(value);
  })
  return (
    <>
      <View style={styles.formElement}>
        {/* <Text style={styles.label}>{name}</Text> */}
        {/* <TouchableOpacity onPress={() => setImagePicker(true)}> */}
          <View style={styles.choosefile}>
            {/* <Text style={styles.choosebtn}>Add Image</Text> */}
            <Text style={styles.textBtn}>{imagePath}</Text>
          </View>
        {/* </TouchableOpacity> */}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 40,
        }}>
        <TouchableHighlight
          style={{
            backgroundColor: Colors.tintColor,
            borderRadius: 30,
          }}
          onPress={() => setImagePicker(true)}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              padding: 10,
              width: responsiveWidth(80),
            }}>
            <Icon
              name="image"
              size={responsiveHeight(3)}
              type="font-awesome-5"
              color={Colors.noticeText}
            />
            <Text style={styles.btntext}>Add image</Text>
          </View>
        </TouchableHighlight>
      </View>
      <ImageSelector
        title="Select Image"
        modalHide={updatePicker}
        visible={isImagePicker}
        square={square}
        imageSelector={(uri) => selectImage({uri})}
      />
    </>
  );
};

const styles = StyleSheet.create({
  formElement: {
    marginBottom: 10,
    // width: '40%',
    width: '100%',
    margin: 10,
    marginRight: 20,
  },
  label: {
    fontSize: 12,
    textTransform: 'uppercase',
    marginBottom: 10,
    marginLeft: 10,
  },
  choosefile: {
    fontSize: 10,
    width: '100%',
    // backgroundColor: '#A33A5C',
    backgroundColor: '#fff',

    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    textTransform: 'uppercase',
  },
  choosebtn: {
    backgroundColor: '#9F9B9B',
    borderRadius: 4,
    color: '#fff',
    padding: 5,
    fontSize: 8,
    marginRight: 15,
  },
  textBtn: {
    // color: '#fff',
    color: '#000',
  },
  btntext: {
    marginLeft: 10,
    color: Colors.noticeText,
    fontSize: responsiveFontSize(2),
    fontFamily: 'Montserrat-Bold',
  },
});
export default ChooseFile;
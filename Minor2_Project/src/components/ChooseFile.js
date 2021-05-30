import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImageSelector from './ImageSelector';

const ChooseFile = ({imagePath, name, selectImage, square}) => {
  let [isImagePicker, setImagePicker] = useState(false);

  const updatePicker = useCallback((value)=>{
    setImagePicker(value);
  })
  return (
    <>
      <View style={styles.formElement}>
        {/* <Text style={styles.label}>{name}</Text> */}
        <TouchableOpacity onPress={() => setImagePicker(true)}>
          <View style={styles.choosefile}>
            {/* <Text style={styles.choosebtn}>Add Image</Text> */}
            <Text style={styles.textBtn}>{imagePath}</Text>
          </View>
        </TouchableOpacity>
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
    width:'100%',
    margin: 10,
    marginRight:20,
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
});
export default ChooseFile;
import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import {Card} from 'react-native-elements';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import InputField from '../../components/InputField';
//import Textarea from 'react-native-textarea';
import TextButton from '../../components/TextButton';
import Colors from '../../constants/Colors';

const AddPostScreen = () => {
    const [data, setData] = useState({
      post: '',
    });

return(
    <View style={styles.textAreaContainer} >
    <TextInput
      style={styles.textArea}
      //underlineColorAndroid="transparent"
      placeholder="What's on your mind?"
      placeholderTextColor="grey"
      numberOfLines={10}
      multiline={true}
    />
  </View>
);
};

const styles = StyleSheet.create({
    textAreaContainer: {
      //borderColor: "grey",
      borderWidth: 0.6,
      padding: 3
    },
    textArea: {
      height: 150,
      justifyContent: "flex-start"
    }
  })

  export default AddPostScreen;
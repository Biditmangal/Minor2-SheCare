import React from 'react';
import {View, ActivityIndicator, StyleSheet,Text} from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../../constants/Colors';

export default ScreenLoader = ({loading}) => {
  return (
    // <Modal
    //   isVisible={loading}
    //   style={{
    //     flex: 1,
    //   }}>
      <View style={styles.modalContainer}>
        <ActivityIndicator size={50} color={Colors.tintColor} />
        <Text>Loading...</Text>
      </View>
    // </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 10,
    backgroundColor: '#fff',
  },
});

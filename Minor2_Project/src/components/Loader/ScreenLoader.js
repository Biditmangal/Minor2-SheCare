import React from 'react';
import {View, ActivityIndicator, StyleSheet, Modal} from 'react-native';
import Colors from '../../constants/Colors';

export default ScreenLoader = () => {
  return (
    <Modal isVisible>
      <View style={styles.container}>
        <ActivityIndicator size={50} color={Colors.tintColor} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});

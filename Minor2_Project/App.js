import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Information from './src/screens/Main/Information.js';

const App = () => {
  
  return (
    <>
      <View style={styles.container}>
        <Information/>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

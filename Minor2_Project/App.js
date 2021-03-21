import React from 'react';
import {StyleSheet, View} from 'react-native';
import Information from './src/screens/Main/Information.js';
import Profile from './src/screens/Main/Profile.js';

const App = () => {
  const item = {
    prImage: 'https://picsum.photos/720',
    prName: 'Giana Dias',
    prUsername: 'gianadias',
    prDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est ut aenean leo nibh leo adipiscing. Odio id in ac augue vitae. Dolor vulputate libero est ut. Scelerisque sed cursus tristique proin ipsum pellentesque. Ut et quam ultricies.',
  };
  return (
    <>
      <View style={styles.container}>
        {/* <Information/> */}
        <Profile item={item} />
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

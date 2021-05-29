import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, LogBox} from 'react-native';
import {Text, View, ScrollView} from 'react-native';
import CommunityCard from '../../components/CommunityCard';
import {FAB} from 'react-native-paper';
import {TouchableOpacity} from 'react-native';
import Colors from '../../constants/Colors';
import {postRef} from '../../Firebase';
import moment from 'moment';
import {connect} from 'react-redux';
import {getposts} from '../../redux/actions/authActions';

let post_id; // for unique post number

const HomeScreen = (props) => {
  const [isClicked, updateClick] = useState(false);

  LogBox.ignoreLogs(['Setting a timer']); // to ignore the Warning of Set a timer

  // const [data, setData] = useState({
  //   posts: [
  //     {
  //       userid: 1,
  //       profilePic:
  //         'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
  //       name: 'Joe Stockton',
  //       posted: '3 days ago',
  //       description:
  //         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate consequat urna, eu faucibus dolor rhoncus a. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
  //     },
  //     {
  //       userid: 2,
  //       profilePic:
  //         'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
  //       name: 'Joe Stockton',
  //       posted: '3 days ago',
  //       description:
  //         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate consequat urna, eu faucibus dolor rhoncus a. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
  //     },
  //     {
  //       userid: 3,
  //       profilePic:
  //         'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
  //       name: 'Joe Stockton',
  //       posted: '3 days ago',
  //       description:
  //         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate consequat urna, eu faucibus dolor rhoncus a. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
  //     },
  //   ],
  // });

  useEffect(() => {
    postRef.get().then((snap) => (post_id = snap.size));
    // props.getPosts();
    props.getposts();

    const listener = props.navigation.addListener('focus', () => {
      props.getposts();
    });

    return () => listener();
  }, [props.navigation]);

  console.log('Post List => ', props.PostList);

  const handleClick = () => {
    updateClick(!isClicked);
    post_id++;
    props.navigation.navigate('Add Post', {
      postId: post_id,
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 5,
        }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={false}
          keyExtractor={(item) => `${item.postid}`}
          data={[...props.PostList]}
          renderItem={({item}) => <CommunityCard item={item} />}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}>
        <TouchableOpacity onPress={handleClick}>
          <FAB
            style={styles.fabIcon}
            icon="plus"
            color="white"
            onPress={handleClick}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
  },
  fabIcon: {
    backgroundColor: Colors.tintColor,
  },
});

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  PostList: state.auth.POSTS,
});

export default connect(mapStateToProps, {getposts})(HomeScreen);

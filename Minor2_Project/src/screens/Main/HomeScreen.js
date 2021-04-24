import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, LogBox} from 'react-native';
import {Text, View, ScrollView} from 'react-native';
import CommunityCard from '../../components/CommunityCard';
import {FAB} from 'react-native-paper';
import {TouchableOpacity} from 'react-native';
import Colors from '../../constants/Colors';
import {getPosts, addPost, postRef} from '../../Firebase';
import moment from 'moment';
import { TouchableHighlight } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';

let post_id; // for unique post number

const HomeScreen = (props) => {
  const [isClicked, updateClick] = useState(false);

  LogBox.ignoreLogs(['Setting a timer']); // to ignore the Warning of Set a timer

  const [data, setData] = useState({
    posts: [
      {
        userid: 1,
        profilePic:
          'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
        name: 'Joe Stockton',
        posted: '3 days ago',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate consequat urna, eu faucibus dolor rhoncus a. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
      },
      {
        userid: 2,
        profilePic:
          'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
        name: 'Joe Stockton',
        posted: '3 days ago',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate consequat urna, eu faucibus dolor rhoncus a. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
      },
      {
        userid: 3,
        profilePic:
          'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
        name: 'Joe Stockton',
        posted: '3 days ago',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate consequat urna, eu faucibus dolor rhoncus a. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
      },
    ],
  });

  useEffect(() => {
    //for fetching all the posts
    getPosts()
    .catch((error) => {
      console.log('error in getting posts', ' ', error);
    });
    //for post count
    postRef.get().then((snap) => (post_id = snap.size));
  }, [data.posts]);

  const addPosts = (id) => {
    let date = moment(date).format('DD-MM-YYYY');
    const postData = {
      imageURL: '',
      likes: 0,
      description: '',
      timestamp: date,
      user: '',
    };
    addPost(id, postData)
      .then(() => {
        console.log('Added post successfully');
      })
      .catch((error) => {
        console.log('error in posting data ', error);
      });
  };

  const handleClick = () => {
    updateClick(!isClicked);
    // console.log(isClicked);
    post_id++;
    // addPosts(`post_${post_id}`);
    props.navigation.navigate('Add Post',{
      postId : post_id,
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
          keyExtractor={(item) => `${item.userid}`}
          data={[...data.posts]}
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

export default HomeScreen;

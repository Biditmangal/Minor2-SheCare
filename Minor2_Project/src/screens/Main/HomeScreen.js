import React, {useState, useEffect, useCallback} from 'react';
import {
  FlatList,
  StyleSheet,
  LogBox,
  Alert,
  TouchableOpacity,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import moment from 'moment';
import {FAB} from 'react-native-paper';
import {connect} from 'react-redux';

import CommunityCard from '../../components/CommunityCard';
import Colors from '../../constants/Colors';
import {postRef} from '../../Firebase';
import {getposts, updateLike, getLikes} from '../../redux/actions/authActions';
import ScreenLoader from '../../components/Loader/ScreenLoader';

let post_id; // for unique post number

const HomeScreen = (props) => {
  const [isClicked, updateClick] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const [post, setPost] = useState({
    postSelected: {},
    postState: null,
  });

  LogBox.ignoreLogs(['Setting a timer']); // to ignore the Warning of Set a timer

  useEffect(() => {
    postRef.get().then((snap) => (post_id = snap.size));

    props.getposts();
    props.getLikes();

    const listener = props.navigation.addListener('focus', () => {
      props.getposts();
    });

    return () => listener();
  }, [props.navigation]);

  console.log('Post list===>', props.PostList);

  const clickEventListener = useCallback((item, state) => {
    setPost({
      ...post,
      postSelected: item,
      postState: state,
    });
    updateLikeCount(item, state);
  }, []);

  const updateLikeCount = (item, state) => {
    console.log('updating likes of post ====> ', post.postSelected.postid);

    if (state == 1) props.updateLike(item.postid, 1);
    else props.updateLike(item.postid, -1);
  };

  const handleClick = () => {
    updateClick(!isClicked);
    post_id++;
    props.navigation.navigate('Add Post', {
      postId: post_id,
    });
  };

  const onRefresh =useCallback(async ()=>{
    setRefreshing(true);
    try{
      props.getposts();
      setRefreshing(false);
    }catch{
      console.log("error while refreshing the page...");
    }
  },[refreshing]);

  // if (props.loading) {

  //   return (
  //       // <View style={styles.modalContainer}>
  //       //   <ActivityIndicator size={50} color={Colors.tintColor} />
  //       //   <Text>Loading...</Text>
  //       // </View>
  //       <ScreenLoader loading={props.loading}/>
  //   );
  // }

  if (props.error) {
    Alert.alert(
      'Try again',
      'Error in Home Screen',
      [{text: 'OK', onPress: () => props.ResetError()}],
      {cancelable: false},
    );
  }

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
          data={props.PostList}
          renderItem={({item}) => (
            <CommunityCard item={item} click={clickEventListener} />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 10,
    // backgroundColor: '#fff',
  },
});

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  PostList: state.auth.POSTS,
  likeList: state.auth.likeList,
});

export default connect(mapStateToProps, {getposts, updateLike, getLikes})(
  HomeScreen,
);

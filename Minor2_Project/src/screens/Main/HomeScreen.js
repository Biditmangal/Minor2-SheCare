import React, {useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Text, View, ScrollView} from 'react-native';
import CommunityCard from '../../components/CommunityCard';
import {FAB} from 'react-native-paper';
import {TouchableOpacity} from 'react-native';
import Colors from '../../constants/Colors';

const HomeScreen = () => {
  const [isClicked, updateClick] = useState(false);

  const [data, setData] = useState({
    CommunityData: [
      {
        userid: '1',
        profilePic:
          'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
        name: 'Joe Stockton',
        posted: '3 days ago',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate consequat urna, eu faucibus dolor rhoncus a. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
      },
      {
        userid: '2',
        profilePic:
          'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
        name: 'Joe Stockton',
        posted: '3 days ago',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate consequat urna, eu faucibus dolor rhoncus a. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
      },
      {
        userid: '3',
        profilePic:
          'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
        name: 'Joe Stockton',
        posted: '3 days ago',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate consequat urna, eu faucibus dolor rhoncus a. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
      },
      {
        userid: '4',
        profilePic:
          'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
        name: 'Joe Stockton',
        posted: '3 days ago',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate consequat urna, eu faucibus dolor rhoncus a. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
      },
    ],
  });
  const handleClick = (props) => {
    if (!isClicked) {
      updateClick(true);
      console.log(isClicked);
    }
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
          data={[...data.CommunityData]}
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
            medium
            icon="plus"
            color="white"
            //onPress={() => {this.handleClickMenu}}
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

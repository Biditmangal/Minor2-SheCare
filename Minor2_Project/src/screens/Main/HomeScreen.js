import React, {useState} from 'react';
import { FlatList, StyleSheet } from 'react-native';
import {Text, View, ScrollView} from 'react-native';
import CommunityCard from '../../components/CommunityCard';

const HomeScreen = () => {
  const [data,setData] = useState({
    CommunityData: [
      {
        userid:'1',
        thumbnail:'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
        name:'Joe Stockton',
        posted:'3 days ago',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate consequat urna, eu faucibus dolor rhoncus a. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
      },
      {
        userid:'2',
        thumbnail:'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
        name:'Joe Stockton',
        posted:'3 days ago',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate consequat urna, eu faucibus dolor rhoncus a. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
      },
      {
        userid:'3',
        thumbnail:'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
        name:'Joe Stockton',
        posted:'3 days ago',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate consequat urna, eu faucibus dolor rhoncus a. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
      },
      {
        userid:'4',
        thumbnail:'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
        name:'Joe Stockton',
        posted:'3 days ago',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate consequat urna, eu faucibus dolor rhoncus a. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
      }
    ]
  })

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
});

export default HomeScreen;

import React from 'react';
import { ColorPropType } from 'react-native';
import {StyleSheet, View, Image, Text,TouchableOpacity,Linking} from 'react-native';
import {Card} from 'react-native-elements';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from '../constants/Colors';

const ArticleCard = (props) => {
  return (
    <>
      <TouchableOpacity onPress={() => Linking.openURL(props.item.articleURL)}>
        <Card containerStyle={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 10,
            }}>
            <View
              style={{
                flex: 5,
                marginLeft: 10,
              }}>
              <Text numberOfLines={2} style={styles.title}>
                {props.item.title + ' ' + props.item.articleId}
              </Text>
              <Text numberOfLines={4} style={styles.description}>
                {props.item.description}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                marginRight: 50,
                justifyContent: 'center',
              }}>
              <Image
                style={styles.image}
                resizeMode={'cover'}
                source={{uri: props.item.thumbnail}}
              />
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    margin: 5,
    padding: 10,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 15,
  },
  description: {
    fontSize: responsiveFontSize(1.8),
    color: '#172D45',
    marginTop: 10,
    marginRight: 10,
  },
  title: {
    fontSize: responsiveFontSize(2.5),
    color: Colors.textColor,
    marginTop: 5,
    fontWeight: 'bold',
    marginRight:10,
  },
  articleDesp: {
    // flex:1,
    fontSize: responsiveFontSize(2),
    marginBottom: 5,
  },
});

export default ArticleCard;

import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {Card} from 'react-native-elements';

const ArticleCard = (props) => {
  return (
    <>
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
            <Text style={styles.title}>{props.item.title + " "+props.item.articleId}</Text>
            <Text style={styles.description}>{props.item.description}</Text>
          </View>
          <View
            style={{
              flex: 1,
              marginRight: 50,
              justifyContent: 'flex-start',
            }}>
            
                <Image
                  style={styles.image}
                  resizeMode={'cover'}
                  source={{uri: props.item.thumbnail}}
                />
              
          </View>
        </View>
      </Card>
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
    fontSize: 14,
    color: '#172D45',
    marginTop: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    color: '#172D45',
    marginTop: 5,
  },
  articleDesp: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default ArticleCard;

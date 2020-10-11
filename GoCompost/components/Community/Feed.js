import React, { Component, useState, useEffect } from "react";
import { Container, Content } from "native-base";
import { Text, ScrollView, SafeAreaView, View, FlatList, StyleSheet, Image, Dimensions } from 'react-native';

const imageWidth = Dimensions.get('window').width;
const headerURL = 'https://tigersteve123.github.io/TigersteveTech/hosted_content/gocompost/assets/Feed%20page.PNG';


const Community = () => {
  const [postsDB, setDB] = useState([]);
  
  useEffect(() => {
    fetch('https://tigersteve123.github.io/TigersteveTech/hosted_content/gocompost/posts_db.json')
      .then((response) => response.json())
      .then((responseJson) => {
        setDB(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const PostView = (props) => {
    return (
      <View style={{flexDirection: 'row', flex: 1,}}>
        <View>
          <Image source={props.imgLink} style={styles.imgPost} />
        </View>
        <View style={{flexShrink: 1,}}>
          <Text style={{padding: 10,}}>{props.text}</Text>
        </View>
      </View>
  )};

  return (
    <View>
      <View>
        <Image source={{uri:headerURL}} style={styles.imgColumn} />
      </View>
      <View style={{padding: 10,}}>
        <Image source={{uri:'https://raw.githubusercontent.com/Tigersteve123/TigersteveTech/master/hosted_content/gocompost/assets/Dan+statement.PNG'}} style={{width: imageWidth*.9, height: imageWidth*.9*.5625, alignSelf:'center',}} />
      </View>
    </View>
    
)};

const styles = StyleSheet.create({
  imgColumn: {
    alignSelf: 'center',
    width: imageWidth,
    height: imageWidth,
  },
  imgPost: {
    width: 100,
    height: 100,
  },
});

export default Community;

import React, { Component, useState, useEffect } from "react";
import { Container, Content } from "native-base";
import { Text, ScrollView, SafeAreaView, View, FlatList, StyleSheet, Image, Dimensions } from 'react-native';

const imageWidth = Dimensions.get('window').width;
const headerURL = 'https://tigersteve123.github.io/TigersteveTech/hosted_content/gocompost/assets/Feed%20page.PNG';


const Community = () => {
  const PostView = (props) => {
    return (
      <View style={{flexDirection: 'row',}}>
        <View>
          <Image source={props.imgLink} style={styles.imgPost} />
        </View>
        <View>
          <Text style={{padding: 10,}}>{props.text}</Text>
        </View>
      </View>
  )};

  return (
    <View>
      <Image source={{uri:headerURL}} style={styles.imgColumn} />
      <View style={{padding: 10,}}>
        <PostView imgLink={{uri:headerURL}} text={'Hello'} />
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

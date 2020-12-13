import React, { Component, useState, useEffect } from "react";
import { Container, Content } from "native-base";
import { Text, ScrollView, SafeAreaView, View, FlatList, StyleSheet, Image, Dimensions } from 'react-native';

const imageWidth = Dimensions.get('window').width;

const Community = () => {

  return (
    <View>
      <View>
        <Image source={require('./Community-banner.png')} style={styles.imgColumn} />
      </View>
      <View style={{padding: 10,}}>
        <Image source={{uri:'https://raw.githubusercontent.com/Tigersteve123/TigersteveTech/master/hosted_content/gocompost/assets/Community-chccs%20post.PNG'}} style={{width: imageWidth*.9, height: imageWidth*.9*.5625, alignSelf:'center',}} />
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

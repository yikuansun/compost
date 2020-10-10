import React, { Component, useState, useEffect } from "react";
import { Container, Content } from "native-base";
import { Text, ScrollView, SafeAreaView, View, FlatList, StyleSheet, Image, Dimensions } from 'react-native';

const imageWidth = Dimensions.get('window').width;
import headerImage from '../../assets/event1_small.jpg'


const Community = () => {
  const PostView = (props) => {
    return (
      <View style={{flexDirection: 'row',}}>
        <View>
          <Image source={props.imgLink} style={styles.imgPost} />
        </View>
        <View>
          <Text>{props.text}</Text>
        </View>
      </View>
  )};

  return (
    <View>
      <Image source={headerImage} style={styles.imgColumn} />
      <PostView imgLink={headerImage} text={'Hello'} />
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

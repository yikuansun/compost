import React, { Component, useState, useEffect } from "react";
import { Container, Content } from "native-base";
import { Text, ScrollView, SafeAreaView, View, FlatList, StyleSheet, Image, Dimensions } from 'react-native';

const Community = () => {
  const PostView = (props) => {
    <View style={{flexDirection: 'row',}}>
      <View>
        <Image source={props.imgLink} style={styles.imgPost} />
      </View>
      <View>
        <Text>{props.text}</Text>
      </View>
    </View>
  }

  return (
    <View>
      <Text>Hello World</Text>
    </View>
)};

const styles = StyleSheet.create({
  imgPost: {
    alignSelf: 'center',
    width: 100,
    height: 100,
  },
});

export default Community;

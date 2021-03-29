import React, { Component, useState, useEffect } from "react";
import { Container, Content } from "native-base";
import { Text, ScrollView, SafeAreaView, View, FlatList, StyleSheet, Image, Dimensions } from 'react-native';
import { WebView } from "react-native-webview";

const Community = () => {

  const frameWidth = Dimensions.get('window').width;
  const frameHeight = Dimensions.get('window').height;

  return (
    <WebView source={{html: '<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0"><style>div {overflow: hidden;} iframe {transform: scale(1.5); transform-origin: 50% 0%;}</style><div><iframe src="https://docs.google.com/forms/d/e/1FAIpQLSd501FHNZQLILyL7FJmld04GL6UNrnVc0D_Jjfg-rGj48WdOg/viewform?embedded=true" frameborder="0" width="100%" height="90%"></iframe></div>'}}/>
    
)};

const styles = StyleSheet.create({
  imgColumn: {
    alignSelf: 'center',
    width: 100,
    height: 100,
  },
});

export default Community;

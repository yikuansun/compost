import React, { Component, useState, useEffect } from "react";
import { Container, Content } from "native-base";
import { Text, ScrollView, SafeAreaView, View, FlatList, StyleSheet, Image, Dimensions } from 'react-native';
import { WebView } from "react-native-webview";

const Community = () => {

  const frameWidth = Dimensions.get('window').width;
  const frameHeight = Dimensions.get('window').height;

  return (
    <WebView source={{html: '<style>iframe{width: 100%; height: 100%;}</style><iframe src="https://docs.google.com/forms/d/e/1FAIpQLSd501FHNZQLILyL7FJmld04GL6UNrnVc0D_Jjfg-rGj48WdOg/viewform?embedded=true" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>'}} javaScriptEnabled={true} style={{width: frameWidth, height: frameHeight,}}/>
    
)};

const styles = StyleSheet.create({
  imgColumn: {
    alignSelf: 'center',
    width: 100,
    height: 100,
  },
});

export default Community;

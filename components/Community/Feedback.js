import React, { Component, useState, useEffect } from "react";
import { Container, Content } from "native-base";
import { Text, ScrollView, SafeAreaView, View, FlatList, StyleSheet, Image, Dimensions } from 'react-native';
import { WebView } from "react-native-webview";

const Community = () => {

  const frameWidth = Dimensions.get('window').width;
  const frameHeight = Dimensions.get('window').height;
  
  const INJECTED_JAVASCRIPT = `(function() {const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);})();`;

  return (
    <WebView source={{html: '<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0"><style>div {overflow: hidden;}</style><div><iframe src="https://docs.google.com/forms/d/e/1FAIpQLSd501FHNZQLILyL7FJmld04GL6UNrnVc0D_Jjfg-rGj48WdOg/viewform?embedded=true" frameborder="0" width="100%" height="90%"></iframe></div>'}} injectedJavaScript={INJECTED_JAVASCRIPT} scrollEnabled={false} onMessage={() => {}}/>
    
)};

const styles = StyleSheet.create({
  imgColumn: {
    alignSelf: 'center',
    width: 100,
    height: 100,
  },
});

export default Community;

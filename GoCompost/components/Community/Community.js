import React, { Component, useState, useEffect } from "react";
import { Container, Content } from "native-base";
import { Text, ScrollView, SafeAreaView, View, FlatList, StyleSheet, Image, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import EventView from './EventView.js';
import Feed from './Feed.js';
import Posts from './Posts.js';

const initialLayout = { width: Dimensions.get('window').width };

const Community = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Feed'},
    {key: 'second', title: 'Events'},
    {key: 'third', title: 'Posts'},
  ]);
  
  const renderScene = SceneMap({ first: Feed, second: EventView, third: Posts });

  return (
    <TabView navigationState={{ index, routes }} renderScene={renderScene} onIndexChange={setIndex} initialLayout={initialLayout} />
)};

export default Community;

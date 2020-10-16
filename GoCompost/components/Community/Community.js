import React, { Component, useState, useEffect } from "react";
import { Container, Content } from "native-base";
import { Text, ScrollView, SafeAreaView, View, FlatList, StyleSheet, Image, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import Events from './EventView.js';
import Feed from './Feed.js';
import Posts from './Posts.js';
import Feedback from './Feedback.js';

const initialLayout = { width: Dimensions.get('window').width };

const Community = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Feed'},
    {key: 'second', title: 'Events'},
    {key: 'third', title: 'Posts'},
    {key: 'fourth', title: 'Feedback'},
  ]);
  
  const renderScene = SceneMap({ first: Feed, second: Events, third: Posts, fourth: Feedback });
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ color:'black', backgroundColor: 'lightgray' }}
      style={{ color:'black', backgroundColor: 'white' }}
      activeColor='black'
      inactiveColor='grey'

    />
  );
  return (
    <TabView navigationState={{ index, routes }} renderScene={renderScene} onIndexChange={setIndex} initialLayout={initialLayout}
      renderTabBar={renderTabBar}/>
)};

export default Community;

import React, { Component, useState, useEffect } from "react";
import { Container, Content } from "native-base";
import { Text, ScrollView, SafeAreaView, View, FlatList, StyleSheet, Image, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import EventView from './EventView.js';

const view2 = () => {
  return (
    <View>
      <Text>Hello World!</Text>
    </View>
)};

const initialLayout = { width: Dimensions.get('window').width };

const Community = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Feed'},
    {key: 'second', title: 'Events'},
  ]);
  
  const renderScene = SceneMap({ first: EventView, second: view2 });

  return (
    <TabView navigationState={{ index, routes }} renderScene={renderScene} onIndexChange={setIndex} initialLayout={initialLayout} />
)};

export default Community;

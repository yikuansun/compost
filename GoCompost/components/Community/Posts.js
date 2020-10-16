import React, { Component, useState, useEffect } from "react";
import { Container, Content } from "native-base";
import { Text, ScrollView, SafeAreaView, View, FlatList, StyleSheet, Image, TouchableOpacity, Modal, Dimensions } from 'react-native';

const imageWidth = Dimensions.get('window').width * .95;
const paddingSize = Dimensions.get('window').width * .05;

const Posts = () => {
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  
  useEffect(() => {
    fetch('https://tigersteve123.github.io/TigersteveTech/hosted_content/gocompost/posts_db.json')
      .then((response) => response.json())
      .then((responseJson) => {
        setMasterDataSource(responseJson);
        setFilteredDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  const getItem = (item) => {    
    return (
      null
    );
  };
  
  const ItemView = ({ item }) => {
    return (
      // Flat List Item

      <View style={{padding: paddingSize, alignItems: 'center',}}>
        <Image source={{uri:item.imglink}} style={styles.imgPost} />
        <Text style={{fontSize: 14, paddingTop: 10,}}>
          {item.text}
        </Text>
      </View>
    );
  };
  
  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
)};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  imgPost: {
    width: imageWidth,
    height: imageWidth,
  },
});

export default Posts;

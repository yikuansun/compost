import React, { Component, useState, useEffect } from "react";
import { Container, Content } from "native-base";
import { Text, ScrollView, SafeAreaView, View, FlatList, StyleSheet, Image, TouchableOpacity, Modal, Dimensions } from 'react-native';

const imageWidth = Dimensions.get('window').width / 3;
const paddingSize = 0;

const Checker = () => {
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_urls.json')
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

        <Image source={{uri:item.url}} style={styles.imgPost} resizeMode={'contain'} />
    );
  };
  
  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        /*style={{
          height: 1,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}*/
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          numColumns={3}
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

export default Checker;
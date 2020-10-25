import React, { Component, useState, useEffect } from "react";
import { Container, Content } from "native-base";
import { SearchBar } from 'react-native-elements';
import { Text, ScrollView, SafeAreaView, View, FlatList, StyleSheet, Image, TouchableOpacity, Modal, Dimensions, Alert } from 'react-native';

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
  
  const createMsg = (itemname, home, orange, footer) =>
    Alert.alert(
        itemname.replace(/\b(\w)/g, k => k.toUpperCase()),
        '\nCompostable at home: ' + (parseInt(home)?"✓":"✗") + '\n\nCompostable via Orange County drop off: ' + (parseInt(orange)?"✓":"✗") + (footer.length?("\n\n*" + footer):""),
        [
            {text: 'Got it!', onPress: () => console.log('OK Pressed')},
        ]
    )
  
  const ItemView = ({ item }) => {
    return (
      // Flat List Item

    <TouchableOpacity onPress={() => createMsg(item.name, item.homecompostable, item.orange, item.foot)}>
        <Image source={{uri:item.url}} style={styles.imgPost} resizeMode={'contain'} />
    </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          placeholder="Find an item"
        />
        <FlatList
          numColumns={3}
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  )};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EEEEEE",
  },
  imgPost: {
    width: imageWidth,
    height: imageWidth,
  },
});

export default Checker;
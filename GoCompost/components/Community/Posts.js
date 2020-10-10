import React, { Component, useState, useEffect } from "react";
import { Container, Content } from "native-base";
import { Text, ScrollView, SafeAreaView, View, FlatList, StyleSheet, Image, TouchableOpacity, Modal, Dimensions } from 'react-native';

const Community = () => {
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  
  useEffect(() => {
    fetch('https://tigersteve123.github.io/TigersteveTech/hosted_content/gocompost/posts_db.json')
      .then((response) => response.json())
      .then((responseJson) => {
        setMasterDataSource(responseJson);
        setFilteredDataSource(masterDataSource);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <View style={{flexDirection: 'row',}}>
        <View style = {{padding: 10,}}>
          <TouchableOpacity onPress={() => getItem(item)}>
            <Image source={{uri:item.imglink}} style={styles.imgPost} />
          </TouchableOpacity>
        </View>
        <View style={{flexShrink: 1,}}>
          <Text style={{padding: 5, paddingTop: 10, fontSize: 14, color: '#666'}}>
            {item.text}
          </Text>
        </View>
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
  imgPost: {
    alignSelf: 'center',
    width: 100,
    height: 100,
  },
});

export default Community;

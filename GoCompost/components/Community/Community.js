import React, { Component, useState, useEffect } from "react";
import { Container, Content } from "native-base";
import { SearchBar } from 'react-native-elements';
import { Text, ScrollView, SafeAreaView, View, FlatList, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CheckBox from '@react-native-community/checkbox';

const Community = () => {
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisibility] = useState(false);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [hideExpired, setHideExpired] = useState(false);

  useEffect(() => {
    fetch('https://tigersteve123.github.io/TigersteveTech/hosted_content/gocompost/database.json')
      .then((response) => response.json())
      .then((responseJson) => {
        setMasterDataSource(responseJson.sort( (a,b) => Date.parse(a.date) - Date.parse(b.date) ));
        setFilteredDataSource(masterDataSource);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  useEffect(() => {
    if (hideExpired) {
      const newData = masterDataSource.filter(function (item) {
        return Date.parse(item.date) > Date.now();
      });
      setFilteredDataSource(newData);
    } else {
      setFilteredDataSource(masterDataSource);
    }
  }, [hideExpired]);


  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const catData = item.cat
          ? item.cat.toUpperCase()
          : ''.toUpperCase();
        const date = item.date
          ? item.date.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1 || catData.indexOf(textData) > -1 || date.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    
    return (
      
      // Flat List Item
      <View style={{flexDirection: 'row',}}>
        <View style = {{padding: 10,}}>
          <TouchableOpacity onPress={() => getItem(item)}>
            <Image source={{uri:item.imglink}} style={styles.imgColumn} />
          </TouchableOpacity>
        </View>
        <View style={{flexShrink: 1,}}>
          <Text style={{fontWeight: 'bold', padding: 5, paddingTop: 10, fontSize: 14, color: '#666'}}>
            {item.title.toUpperCase()}
          </Text>
          <View style={{flexDirection: 'row',}}>
            <Icon name="microphone" style={styles.itemStyle}/>
            <Text style={styles.itemStyle}>
              {item.host}
            </Text>
          </View>
          <View style={{flexDirection: 'row',}}>
            <Icon name="clock" style={styles.itemStyle}/>
            <Text style={styles.itemStyle}>
              {item.date} {item.time}
            </Text>
          </View>
          <View style={{flexDirection: 'row',}}>
            <Icon name="map-pin" style={styles.itemStyle}/>
            <Text style={styles.itemStyle}>
              {item.location}
            </Text>
          </View>
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

  const getItem = (item) => {
    // Function for click on an item
    //alert(item.title);
    
    return (
      <Modal visible={modalVisible}>
        <View style={{padding: 10,}}>
          <Text>{item.title}</Text>
          <Text>{item.date}{' '}{item.time}</Text>
          <Text onPress={() => setModalVisibility(false)}>Back</Text>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>Community Events</Text>
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          placeholder="Search by title, category, or month"
          value={search}
        />
        <View style={{flexDirection: 'row',}}>
          <CheckBox value={hideExpired} onValueChange={setHideExpired} />
          <Text style={{textAlignVertical: 'center',}}>Hide Expired Events</Text>
        </View>
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#cca2de',
  },
  itemStyle: {
    padding: 5,
    fontSize: 11,
  },
  imgColumn: {
    alignSelf: 'center',
    width: 120,
    height: 120,
  },
});

export default Community;

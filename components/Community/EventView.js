import React, { Component, useState, useEffect } from "react";
import { Container, Content } from "native-base";
import { SearchBar, CheckBox } from 'react-native-elements';
import { Text, ScrollView, SafeAreaView, View, FlatList, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import * as firebase from 'firebase';
import 'firebase/firestore';

const Community = () => {
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisibility] = useState(false);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [hideExpired, setHideExpired] = useState(true);
  
  const data = firebase.firestore();

  useEffect(() => {
    data.collection('community_events').get()
      .then((querySnapshot) => {
        const m = [];
        querySnapshot.forEach(doc => {
          m.push(doc.data());
        });
        setMasterDataSource(m.sort( (a,b) => Date.parse(a.date) - Date.parse(b.date) ).filter(function (item) {
        return Date.parse(item.date) > Date.now() || item.date == "Ongoing";
      }));
        setFilteredDataSource(m.sort( (a,b) => Date.parse(a.date) - Date.parse(b.date) ).filter(function (item) {
        return Date.parse(item.date) > Date.now() || item.date == "Ongoing";
      }));
      })
      .catch((error) => {
        console.error(error);
      });
    //console.log('Event data =', filteredDataSource);
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
      <View style={{flex: 1}}>
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          placeholder="Search by title, category, or month"
          value={search}
        />
        {/*<View style={{flexDirection: 'row', backgroundColor: 'white',}}>
          <CheckBox checked={hideExpired} onPress={() => setHideExpired(!hideExpired)} title='Hide Expired Events' iconType='material' />
        </View>*/}
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          contentContainerStyle={styles.container}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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

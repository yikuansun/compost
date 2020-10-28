import React, { Component, useState, useEffect } from "react";
import { Container, Content } from "native-base";
import { SearchBar } from 'react-native-elements';
import { Text, ScrollView, SafeAreaView, View, FlatList, StyleSheet, Image, TouchableOpacity, Modal, Dimensions, Alert, Button } from 'react-native';

const imageWidth = Dimensions.get('window').width / 3;
const paddingSize = 0;

const Checker = () => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [ModalOpen, setModalOpen] = useState(false);
  const ModalContent = {
    name: "name",
    imgSrc: "https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/truefalseicons/00.svg",
    footNote: "ok"
  };
  
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

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
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
  
  /*const createMsg = (itemname, home, orange, footer) =>
    Alert.alert(
        itemname.replace(/\b(\w)/g, k => k.toUpperCase()),
        '\nCompostable at home: ' + (parseInt(home)?"✓":"✗") + '\n\nCompostable via Orange County drop off: ' + (parseInt(orange)?"✓":"✗") + (footer.length?("\n\n*" + footer):""),
        [
            {text: 'Got it!', onPress: () => console.log('OK Pressed')},
        ]
    )*/

  const createMsg = (item) => {
    ModalContent.name = item.name;
    ModalContent.imgSrc = "https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/truefalseicons/" + item.homecompostable + item.orange + ".svg";
    ModalContent.footNote = item.foot;
    setModalOpen();
  };
  
  const ItemView = ({ item }) => {
    return (
      // Flat List Item

    <TouchableOpacity onPress={() => createMsg(item)}>
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
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          value={search}
        />
        <FlatList
          numColumns={3}
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ItemView}
        />
      </View>
      <Modal visible={ModalOpen}>
          <Text>{ModalContent.name}</Text>
          <Image
            source={ModalContent.imgSrc}
            style={{
              width: imageWidth * 2,
              height: imageWidth * 2 * 884/1572,
            }}
            resizeMode={'contain'}
          />
          <Button title="Got it!" onPress={setModalOpen} />
      </Modal>
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
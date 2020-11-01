import React, { Component, useState, useEffect } from "react";
import { Container, Content } from "native-base";
import { SearchBar, Text } from 'react-native-elements';
import { ScrollView, SafeAreaView, View, FlatList, StyleSheet, Image, TouchableOpacity, Modal, Dimensions, Alert, Button } from 'react-native';

const imageWidth = Dimensions.get('window').width / 3;
const paddingSize = 0;

const Checker = () => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [ModalOpen, setModalOpen] = useState(false);
  const [ModalContent, setModalContent] = useState({
    name: "name",
    tbody: ["https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Light_green_check.svg/1024px-Light_green_check.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Light_green_check.svg/1024px-Light_green_check.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Light_green_check.svg/1024px-Light_green_check.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Light_green_check.svg/1024px-Light_green_check.svg.png"],
    footNote: "ok"
  });
  
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
    ModalContent.name = item.name.replace(/\b(\w)/g, k => k.toUpperCase());
    ModalContent.tbody = [
      parseInt(item.binstring.split("")[0])?"https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/check.png":"https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/cross.png",
      parseInt(item.binstring.split("")[1])?"https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/check.png":"https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/cross.png",
      parseInt(item.binstring.split("")[2])?"https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/check.png":"https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/cross.png",
      parseInt(item.binstring.split("")[3])?"https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/check.png":"https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/cross.png"
    ];
    ModalContent.footNote = (item.foot.length?"*":"") + item.foot + (item.foot.length?"\n":"");
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
      <View style={{ flex: 1 }}>
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
      <Modal visible={ModalOpen} animationType="slide">
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text h2 style={{textAlign: "center"}}>{ModalContent.name}</Text>
          <Text></Text>
          <View style={{flexDirection: 'row'}}>
            <View style={{ flex: 1, alignSelf: 'stretch' }}><Text style={{textAlign: "center"}}>Compostable at home</Text></View>
            <View style={{ flex: 1, alignSelf: 'stretch' }}><Text style={{textAlign: "center"}}>Eubanks/Walnut Grove</Text></View>
            <View style={{ flex: 1, alignSelf: 'stretch' }}><Text style={{textAlign: "center"}}>Carrboro Farmers’ Market</Text></View>
            <View style={{ flex: 1, alignSelf: 'stretch' }}><Text style={{textAlign: "center"}}>NC Botanical Gardens</Text></View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{ flex: 1, alignSelf: 'stretch' }}><Image source={{uri:ModalContent.tbody[0]}} style={styles.checkx} resizeMode={'contain'} /></View>
            <View style={{ flex: 1, alignSelf: 'stretch' }}><Image source={{uri:ModalContent.tbody[1]}} style={styles.checkx} resizeMode={'contain'} /></View>
            <View style={{ flex: 1, alignSelf: 'stretch' }}><Image source={{uri:ModalContent.tbody[2]}} style={styles.checkx} resizeMode={'contain'} /></View>
            <View style={{ flex: 1, alignSelf: 'stretch' }}><Image source={{uri:ModalContent.tbody[3]}} style={styles.checkx} resizeMode={'contain'} /></View>
          </View>
          <Text style={{color: "red"}}>{ModalContent.footNote}</Text>
          <Button title="Got it!" onPress={setModalOpen} color="#6E8A5D" />
          </View>
      </Modal>
    </SafeAreaView>
  )};

const styles = StyleSheet.create({
  imgPost: {
    width: imageWidth,
    height: imageWidth,
  },
  checkx: {
    width: imageWidth * 3/4,
    height: imageWidth * 3/4,
  },
});

export default Checker;
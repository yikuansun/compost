import React from "react";
import { TouchableOpacity } from "react-native";
import { Text, StyleSheet, View, Button, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const HomeScreen = props => {
  return (
  <View style={{flex: 1,backgroundColor:'white'}}>
    <Text style = {styles.tagline}>Diverting Compostable Waste from landfills & giving it back to the Earth</Text>
    <Image
        style={{width: '100%', height: '45%'}}
        source={require('./header.jpg')
          
    }
      />

    <View style = {styles.introBlock}>
      <Text style={styles.introBlock}>SIGN IN / CREATE AN ACCOUNT</Text>
      <Text style={styles.introBlockSmaller}>TO TRACK IMPACT OR ENTER AS A GUEST</Text>
    </View>
 
    <Text style={{textAlign: 'center', fontSize: 20}}></Text>
    

    <View style={{flex: 1}}>
      
    </View>
    

  </View>

  
  );
  
};

const styles = StyleSheet.create({
  tagline: {
    fontSize: 15,
    fontStyle: 'italic',
    color: 'orange',
    textAlign: "center",
    backgroundColor: 'white',
    margin: 5
  },
  text: {
    fontSize: 25,
    margin: 20
  },
  subHeaderStyle: {
    fontSize: 25
  },
  opacityStyle: {
    fontSize: 75
  },
  headerBlock: {
    fontSize: 70
  },
  introBlock: {
    fontSize: 22,
    margin: 5,
    backgroundColor: '#669999',
    textAlign: 'center',
    borderRadius: 10,
    fontWeight: "bold",
    color: 'white'
  },
  introBlockSmaller: {
    fontSize: 13,
    margin: 5,
    backgroundColor: '#669999',
    textAlign: 'center',
    borderRadius: 10,
    fontWeight: "bold",
    color: 'white'
  },
  contentBlock: {
    fontSize: 30,
    margin: 10,
    backgroundColor: '#e0ebeb',
    textAlign: 'center',
    alignItems: 'center',
    flex: 1,
    fontFamily: 'trebuchet',
    borderRadius: 10
  },
  contentImage: {
    margin: 2.5
  },
  contentText: {
    margin: 2.5,
    fontSize: 19,
    alignItems: 'center',
    fontFamily: 'Arial'
  }
});

export default HomeScreen;

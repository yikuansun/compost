import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";


const HomeScreen = (props) => {
  const imageLink = require('./homepage.jpg');
  return (
      <View style={{flex: 1}}>
        <ImageBackground source={imageLink} style={styles.image}>
        <View style={{flex: 3}}>

        </View>
        <View style={{flex: 3}}>
          <View style={{flex: 3, flexDirection: 'row'}}>
            <View style={{flex: 1}}></View>
            <View style={{flex: 2.3, flexDirection: "column"}}>
              <View style={{flex: 1}}>
              <View style = {{flex: 1}}>
              <TouchableOpacity style={styles.btnSignup}>
                <Text style={styles.btnWords}>S I G N  I N / S I G N  U P</Text>
              </TouchableOpacity>
              </View>
              <View style = {{flex: 1}}>
                <TouchableOpacity style={styles.btnGuest}>
                  <Text style={styles.btnWhite}>E N T E R as guest</Text>
                </TouchableOpacity>
              </View>
              <View style = {{flex: 1}}>
                <TouchableOpacity style={styles.btnAbout}>
                  <Text style={styles.btnWords}>A B O U T</Text>
                </TouchableOpacity>
              </View>
              </View>
              <View style={{flex: 0.3}}></View>
            </View>
            <View style={{flex: 1}}></View>
          </View>
          <View style={{flex: 2}}>

          </View>
        </View>
        </ImageBackground>
      </View>
  )
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  },
  btnSignup: {
    fontSize: 20,
    backgroundColor: "#ebc934",
    borderRadius: 10

  },
  btnGuest: {
    fontSize: 20,
    backgroundColor: "#919191",
    borderRadius: 10
  },
  btnAbout: {
    fontSize: 20,
    backgroundColor: "#c1dbd6",
    borderRadius: 10
  },
  btnWords: {textAlign: 'center', fontSize: 15, margin: 6},
  btnWhite: {textAlign: 'center', fontSize: 15, margin: 6, color: 'white'},
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: 'center'
  }
});

export default HomeScreen;

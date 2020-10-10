import React, { Component } from "react";
import {ImageBackground, Picker, TouchableOpacity} from "react-native";
import { Text, StyleSheet, View, Button, Image, DatePickerIOS, TextInput, ScrollView } from "react-native";
import NumericInput from 'react-native-numeric-input';
import * as firebase from 'firebase';
import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";

import DropDownPicker from 'react-native-dropdown-picker';
import Icon from "react-native-vector-icons/Feather";

import { MaterialCommunityIcons } from '@expo/vector-icons';

//Components
class Footprint extends Component {
  static navigationOptions = {
    headerTitle: "Footprint"
  };
  render() {
    return (
        <View style={{flex: 1}}>
            <ScrollView style={{flex: 1}}>
                <View style={{flex: 2.2}}>
                    <View style={{flex: 1.9, alignItems: "center", justifyContent: "center", backgroundColor: "#606161"}}>
                        <Text style={{color: "white", fontSize: 20, fontWeight: "bold"}}>I M P A C T</Text>
                    </View>
                    <ImageBackground source={require('./leafHeader.jpg')} style={styles.image}>
                        <View style={{alignItems: "center", justifyContent: "center"}}>
                            <Text style={{color: 'white'}}>Sign in to log & track impact</Text>
                        </View>
                    </ImageBackground>

                    <View style={{flex: 2.7, flexDirection: "row", alignItems: "center", marginRight: 10, marginLeft: 10, marginTop: 0, marginBottom: 0}}>

                        <View style={{flex: 1, flexDirection: "column", backgroundColor: "#ffcc33", alignItems: "center", justifyContent: "center"}}>
                            <Text>Log Total</Text>
                            <Text style={{fontSize: 20, fontWeight: "bold"}}>335 lb</Text>
                        </View>
                        <View style={{flex: 2, flexDirection: "column", backgroundColor: "#e6e6e6", alignItems: "center", justifyContent: "center"}}>
                            <Text>Account Name</Text>
                            <Text style={{fontSize: 20, fontWeight: "bold"}}>BO</Text>
                        </View>
                    </View>

                </View>


            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1, flexDirection: 'column', borderRadius: 10, backgroundColor: "#b4d6c4", margin: 9}}>
                    <Text style={{textAlign: 'center', fontSize: 15}}>Today</Text>
                    <Text style={{textAlign: 'center'}}>x lbs</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'column', borderRadius: 10, backgroundColor: "#cfcfcf", margin: 9}}>
                    <Text style={{textAlign: 'center', fontSize: 15}}>Last 7 Days</Text>
                    <Text style={{textAlign: 'center'}}>y lbs</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'column', borderRadius: 10, backgroundColor: "#a8bdbf", margin: 9}}>
                    <Text style={{textAlign: 'center', fontSize: 15}}>Last 30 Days</Text>
                    <Text style={{textAlign: 'center'}}>z lbs</Text>
                </View>
            </View>
            <TouchableOpacity style={{flex: 3, textAlign: 'center', backgroundColor: '#78989e', margin: 10}} onPress={ () => props.navigation.navigate("Info")} >
                <Text style={{textAlign: 'center', margin: 5  , color: 'white', fontWeight: 'bold', fontSize: 20}}>TRACK MY IMPACT</Text>
            </TouchableOpacity>


            </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: 15,
        margin: 8,
        color: 'black'

    },
    labelText: {
        fontSize: 20,
        margin: 2
    },
    bottomText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white"
    },
    bottomSubHeader: {
        fontSize: 20,
        color: "white"
    },
    textInputStyling: {
        height: 30,
        borderColor: 'gray',
        borderWidth: 1,

        fontSize: 15
    },
    image: {
        flex: 2,
        resizeMode: "cover",
        justifyContent: "center"
    },

});

export default Footprint;
import React, { useState, setState } from "react";
import {ImageBackground, Picker, TouchableOpacity} from "react-native";
import { Text, StyleSheet, View, Button, Image, DatePickerIOS, TextInput, ScrollView } from "react-native";
import NumericInput from 'react-native-numeric-input';
import * as firebase from 'firebase';
import 'firebase/firestore';
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from 'react-native-dropdown-picker';




const dbh = firebase.firestore();

const ew = dbh.collection("logs").doc("newdochehe").get();

const FetchScreen = props => {



  const [chosenDate, setChosenDate] = useState(new Date());
  const [value,onChangeText] = useState();
  const [weight,setWeight] = useState(0);
  const [value2,onChangeText2] = React.useState();
  const [value4,onChangeText4] = React.useState();
  const [selectedValue, setSelectedValue] = useState("java");
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [wasteType, setWasteType] = useState("fw");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  this.state = {
    country: 'fw'
  };

  return (
      <View style={{flex: 1}}>
        <ScrollView>
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

        <View style={{flex: 1}}>

          <Text style={styles.headerText}>Log how much compostable waste you save from landfills and estimate its impact on the Earth</Text>
        </View>

        <View style={{flex: 4, margin: 10}}>
          <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              onChangeText={text => onChangeText(text)}
              value={value}
          />
          <View>
            <Button onPress={showDatepicker} title="Show date picker!" />
          </View>
          {show && (
              <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
              />
          )}

          <View style={{flex: 3}}>
            <Text style={styles.labelText}>Enter Type: </Text>
            <DropDownPicker
                items={[
                  {label: 'Food Waste', value: 'fw' },
                  {label: 'Non-Food Compostable Waste', value: 'nfw'},
                ]}
                defaultValue={wasteType}
                containerStyle={{height: 40}}
                style={{backgroundColor: '#fafafa'}}
                itemStyle={{
                  justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={item => setWasteType(wasteType)}
            />
            <View style={{flex: 2, flexDirection: 'row'}}>
              <Text style={styles.labelText}>Enter Weight (lb):</Text>
              <NumericInput style={{flex: 2}}
                            onChange={
                              value => {

                                setWeight(value);
                              }
                            }
                            value={weight} />
            </View>

          <TouchableOpacity style={{flex: 3, textAlign: 'center', backgroundColor: 'gray', margin: 10}} onPress={ () => dbh.collection("logs").doc(value).set({

            "weight": weight,
            "date": date,
            "waste": wasteType
          })} >
            <Text style={{textAlign: 'center', margin: 5  , color: 'white', fontWeight: 'bold', fontSize: 20}}>ADD TO LOG</Text>
          </TouchableOpacity>

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

          </View>

        </View>
        </ScrollView>
      </View>



  );

};

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

export default FetchScreen;
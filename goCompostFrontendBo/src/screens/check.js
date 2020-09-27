import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, StyleSheet, View, Button, Image, DatePickerIOS, TextInput } from "react-native";
import NumericInput from 'react-native-numeric-input';


const CheckScreen = props => {

  const [chosenDate, setChosenDate] = useState(new Date());
  const [value,onChangeText] = React.useState();
  const [value2,onChangeText2] = React.useState();
  return (
  <View style={{flex: 1}}>
      
    <View style={{flex: 3}}>
        <Image
        style={{width: '100%', height: '45%'}}
        source={require('./impact.jpg')    
      }/>
        <Text style={styles.headerText}>Log how much compostable waste you save from landfills and estimate its impact on the Earth</Text>
    </View>
    
    <View style={{flex: 4, margin: 10}}>
    <Text style={styles.labelText}>Enter Date:</Text>
     
    <TextInput
        style={styles.textInputStyling}
       placeholder={'Enter a Date'}
      onChangeText={text => onChangeText2(text)}
      value={value2}
    />
     
     <Text style={styles.labelText}>Enter Weight (lb):</Text>
     
     <NumericInput style={{flex: 1}} onChange={value => console.log(value)} />
     <Text style={styles.labelText}>Enter Notes:</Text>
     <TextInput
      style={styles.textInputStyling}
      placeholder={'Enter any extra notes'}
      onChangeText={text => onChangeText(text)}
      value={value}
    />

     <Button 
      onPress={() => console.log("Dates!")}
      title = "Select dates to add TOTAL"
    />
     
    </View>
    <View style={{flex: 3, margin: 10}}>
        
        <Text style={styles.bottomText}>IMPACT CALCULATOR</Text>
        <Text style={styles.bottomSubHeader}>(estimated according to research)</Text>
    </View>
  </View>

  
  );
  
};

const styles = StyleSheet.create({
    headerText: {
        fontSize: 20,
        margin: 10,
        color: '#006666'

    },
    labelText: {
        fontSize: 25
    },
    bottomText: {
        fontSize: 30,
        fontWeight: "bold"
    },
    bottomSubHeader: {
        fontSize: 20,
        
    },
    textInputStyling: {
        height: 30,
        borderColor: 'gray',
        borderWidth: 1,
        
        fontSize: 15
      }
  
});

export default CheckScreen;

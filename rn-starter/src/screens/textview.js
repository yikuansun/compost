import React from "react";
import { Switch } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text, StyleSheet, View, Button,TextInput } from "react-native";
import { Divder } from 'react-native-elements';

const textview = props => {
  const [value,onChangeText] = React.useState();
  const [value2,onChangeText2] = React.useState();
  const [value3,onChangeText3] = React.useState();
  let total = 0;
  const [isEnabled, setIsEnabled] = React.useState(false);
  let impact;
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
  <View>
    
    <Text style={styles.header}>Compost Logger</Text>
    <Text style={styles.textTwo}>Number of Pounds Composted</Text>
    <TextInput
      style={styles.textInputStyling}
      placeholder={'Enter a Value'}
      onChangeText={text => onChangeText(text)}
      value={value}
    />

    <Text style={styles.textTwo}>Composting Materials</Text>
    <TextInput
      style={styles.textInputStyling}
      placeholder={'Enter a Material'}
      onChangeText={text => onChangeText2(text)}
      value={value2}
    />

<Text style={styles.textTwo}>Additional Notes</Text>
    <TextInput
      style={styles.textInputStyling}
      placeholder={'Enter any other notes'}
      onChangeText={text => onChangeText3(text)}
      value={value3}
    />
    <Text style={styles.textTwo}>Current: Weight - {value} lb, Type - {value2} </Text>
    
    <Button 
      onPress={() => console.log("Logged! Weight: " + value + " Type: " + value2)}
      title = "Log Compost"
    />
    


    <Button 
      onPress={() => props.navigation.navigate("Home")}
      title = "Go to Home Screen"
    />

    <Button 
      onPress={() => props.navigation.navigate('Calendar')}
      title = "Go to Calendar Page"
    />  
    
  </View>
  
  
  );
  
};

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    margin: 10,
    
  },
  text: {
    fontSize: 30,
    margin: 20
  },
  textTwo: {
    fontSize: 20,
    margin: 10
    
  },
  textThree: {
    fontSize: 15,
    margin: 10
  },
  subHeaderStyle: {
    fontSize: 25
  },
  opacityStyle: {
    fontSize: 75
  },
  textInputStyling: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    fontSize: 20
  },
  dividerStyle: {
    backgroundColor: 'blue'
  }
});

export default textview;

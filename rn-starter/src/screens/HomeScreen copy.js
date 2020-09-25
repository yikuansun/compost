import React from "react";
import { TouchableOpacity } from "react-native";
import { Text, StyleSheet, View, Button } from "react-native";

const HomeScreen = () => {
  return (
  <View>
    <Text style={styles.text}>lol pranked</Text>
    <Button 
      onPress={() => console.log('Pressed Button')}
      title = "Go to List Demo"
    />
    <TouchableOpacity onPress={() => console.log('List Button Pressed')}>
      <Text >Go To List Demo but Better Looking</Text>
    </TouchableOpacity>
  </View>
  
  );
  
};

const styles = StyleSheet.create({
  text: {
    fontSize: 45
  },
  subHeaderStyle: {
    fontSize: 25
  },
  opacityStyle: {
    fontSize: 75
  }
});

export default HomeScreen;

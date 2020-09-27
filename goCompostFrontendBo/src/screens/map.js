import React from "react";
import { TouchableOpacity } from "react-native";
import { Text, StyleSheet, View, Button, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const MapScreen = props => {
  return (
  <View style={{flex: 1}}>
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
    <View style={{flex: 1, flexDirection: 'row'}}>
      
      <View style={styles.contentBlock}>
      <Image
        style={{width: '100%', height: '45%'}}
        source={require('./header.jpg')
          
    }
      />
      <Text style={styles.contentText}>COMPOSTABLES</Text>
      </View>
      <View style={styles.contentBlock}>
      <Image
        style={{width: '100%', height: '45%'}}
        source={require('./header.jpg')
          
    }
      />
      <Text style={styles.contentText}>DROP OFF</Text>
      </View>
    </View>
    <View style={{flex: 1, flexDirection: 'row'}}>
    <View style={styles.contentBlock}>
    <Image
        style={{width: '100%', height: '45%'}}
        source={require('./header.jpg')
          
    }
      />
        <Text style={styles.contentText}>COMMUNITY</Text>
      </View>
      <View style={styles.contentBlock}>
      <Image
        style={{width: '100%', height: '45%'}}
        source={require('./header.jpg')
          
    }
      />
      <Button 
      onPress={() => props.navigation.navigate('Input')}
      title = "IMPACT"
    />
    
      </View>

    </View>
    

  </View>

  
  );
  
};

const styles = StyleSheet.create({
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

export default MapScreen;

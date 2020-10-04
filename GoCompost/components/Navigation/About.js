import React, { Component } from "react";
import { Container, Content } from "native-base";
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import compostable from '../../assets/compostableTopLogo.jpg';

//Components
class AboutScreen extends Component {
  static navigationOptions = {
    headerTitle: "About",
    headerRight: (
      <View>
      </View>
    )
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container style={styles.container}>
        <View style={{flex:2, flexDirection:'column'}}>
            <Image source={compostable} style={styles.image} ></Image>
        </View>
        <View style={{flex:1, flexDirection:'column'}}>
        <Text>
            GoCompost App is a community service project of students from Chapel Hill, North Carolina. 
            It aims to engage the Orange County community to divert compostable waste from landfills and give it back to the Earth through composting.

            More diagram, text, links...
        </Text>

        </View>
        <View>
        <TouchableOpacity 
                style={styles.backButton}
                onPress= {() => {this.props.navigation.navigate('SignIn');}}
            >
            <Text style={styles.backButton}>  Back  </Text>      
        </TouchableOpacity>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
        alignItems: 'center',
        resizeMode: "center",
        width: 400,
        height: 400
    },
    backButton: {
        backgroundColor: "#cfe1e0",
        fontSize: 20,
        textAlign: "center",
        padding: 6
  
    },
});

export default AboutScreen;
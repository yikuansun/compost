import React, { Component } from "react";
import { Container, Content } from "native-base";
import { View, Image} from 'react-native';
import compostable from '../../assets/compostableLogo.png';

//Components
class Dashboard extends Component {
  static navigationOptions = {
    headerTitle: "Dashboard"
  };
  render() {
    return (
      <Container style={{backgroundColor: "white"}}>
        <View>
        </View>
        <View>
        <Image style={{height:580, width:400,resizeMode:'stretch'}} source={compostable}/>

        </View>
      </Container>
    );
  }
}

export default Dashboard;
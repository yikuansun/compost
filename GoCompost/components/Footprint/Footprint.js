import React, { Component } from "react";
import { Container, Content, View, Text } from "native-base";

//Components
class Footprint extends Component {
  static navigationOptions = {
    headerTitle: "Footprint"
  };
  render() {
    return (
      <Container style={{backgroundColor: "lightgreen"}}>
        <Content>
        </Content>
      </Container>
    );
  }
}

export default Footprint;
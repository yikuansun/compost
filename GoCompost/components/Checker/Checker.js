import React, { Component } from "react";
import { Container, Content } from "native-base";

//Components
class Checker extends Component {
  static navigationOptions = {
    headerTitle: "Checker"
  };
  render() {
    return (
      <Container style={{backgroundColor: "lightblue"}}>
        <Content>
        </Content>
      </Container>
    );
  }
}

export default Checker;
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
          <iframe src="https://compostsearchbar.netlify.app" style="border: none; width: 100%; height: 100%;"></iframe>
        </Content>
      </Container>
    );
  }
}

export default Checker;
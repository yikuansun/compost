import React, { Component } from "react";
import { Container, Content } from "native-base";

//Components
class Community extends Component {
  static navigationOptions = {
    headerTitle: "Community"
  };
  render() {
    return (
      <Container style={{backgroundColor: "#cca2de"}}>
        <Content>
        </Content>
      </Container>
    );
  }
}

export default Community;
import React, { Component } from "react";
import { Container, Content } from "native-base";
import { WebView } from "react-native-webview";

//Components
class Checker extends Component {
  static navigationOptions = {
    headerTitle: "Checker"
  };
  render() {
    return (
      <Container style={{backgroundColor: "lightblue"}}>
        <Content>
          <WebView
            javaScriptEnabled
            source={{
              html: `
              <iframe src="https://compostsearchbar.netlify.app" style="border: none; width: 100%; height: 100%;"></iframe>
              `,
            }}
          />
        </Content>
      </Container>
    );
  }
}

export default Checker;
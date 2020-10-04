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
      /*<WebView
        source={{
          html: `
          <iframe src="https://compostsearchbar.netlify.app" style="border: none; width: 100%; height: 100%;">Please connect to the internet.</iframe>
          `,
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />*/
      <WebView
        source={{
          html: `
<style>
div {
    background-size: contain;
    float: left;
}
body {
    margin: 0;
}@media screen and (orientation:portrait) {
    div {
        width: 50vw;
        height: 50vw;
    }
}
@media screen and (orientation:landscape) {
    div {
        width: 25vw;
        height: 25vw;
    }
}
</style>

<body></body>

<script>
request = new XMLHttpRequest();
request.open('GET', "https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_urls.txt", false);
request.send();
if (request.status != 200) {
    document.write("Error in fetching data");
    throw "ball";
}

for (imgurl of request.responseText.split("\\n")) {
    div = document.createElement("div");
    div.style.backgroundImage = "url('" + imgurl + "')";
    document.body.appendChild(div);
}

for (div of document.getElementsByTagName("div")) {
    if (div.style.backgroundImage.includes("NOT Compostables")) {
        div.onclick = function() {
            alert("Not Compostable");
        }
    }
    else {
        div.onclick = function() {
            alert("Compostable");
        }
    }
}
</script>
          `
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        style={{backgroundColor: "lightblue"}}
      />
      /*<Container style={{backgroundColor: "lightblue"}}>
        <Content>
        </Content>
      </Container>*/
    );
  }
}

export default Checker;
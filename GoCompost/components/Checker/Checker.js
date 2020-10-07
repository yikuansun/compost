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
        width: 33.33vw;
        width: calc(100vw / 3);
        height: 33.33vw;
        height: calc(100vw / 3);
    }
    body {
        margin: 0;
    }
    input {
        position: fixed;
        z-index: 5;
        top: 45px;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 95vw;
        padding: 15px 30px;
        margin: 8px 0;
        border: 1px solid #ccc;
        border-radius: 50px;
        box-sizing: border-box;
        font-size: 30px;
        background-image: url("https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/search_icon.svg");
        background-position: 20px 15px;
        background-repeat: no-repeat;
        padding-left: 60px;
        filter: drop-shadow(0px 3px 3px #333333);
        -webkit-filter: drop-shadow(0px 3px 3px #333333);
    }
</style>

<body></body>

<script>
    request = new XMLHttpRequest();
    request.open('GET', "https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_urls.json", false);
    request.send();
    if (request.status != 200) {
        document.write("Error in fetching data");
        throw "ball";
    }

    for (imgobj of JSON.parse(request.responseText).images) {
        div = document.createElement("div");
        div.style.backgroundImage = "url('" + imgobj.url + "')";
        document.body.appendChild(div);

        div.dataset.home = (parseFloat(imgobj.homecompostable)?"yes":"no");
        div.dataset.orange = (parseFloat(imgobj.orange)?"yes":"no");

        div.onclick = function() {
            alert("Compostable at home: " + this.dataset.home + "\nCompostable via Orange Country drop off: " + this.dataset.orange);
        }
    }

    searchbar = document.createElement("input");
    searchbar.type = "text";
    searchbar.placeholder = "find an item";
    document.body.appendChild(searchbar);

    document.getElementsByTagName("input")[0].onkeyup = function(event) {
        for (div of document.getElementsByTagName("div")) {
            if (div.style.backgroundImage.toUpperCase().includes(this.value.toUpperCase())) {
                div.style.display = "";
            }
            else {
                div.style.display = "none";
            }
        }

        if (event.keyCode == 13) {
            //decoy = document.createElement("a");
            //decoy.focus();
            this.blur();
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
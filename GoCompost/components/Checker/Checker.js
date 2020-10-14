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

<meta name='viewport' content='user-scalable=0'>

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

        div.name = (imgobj.name);

        div.onclick = function() {
            alertbox = document.createElement("customalert");

            textelem = document.createElement("center");
            textelem.innerText = "\\n" + this.name + "\\n";
            textelem.style.whiteSpace = "pre-line";
            textelem.style.textAlign = "center";
            textelem.style.width = "75vmin";
            textelem.style.fontSize = "4vmin";
            textelem.style.textAlign = "center";
            textelem.style.overflow = "hidden";
            textelem.style.wordBreak = "break-word";
            textelem.style.fontFamily = "Arial";
            alertbox.appendChild(textelem);

            confimg = new Image();
            confimg.src = "https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/truefalseicons/" + ({"yes":"1","no":"0"}[this.dataset.home]) + ({"yes":"1","no":"0"}[this.dataset.orange]) + ".svg";
            confimg.style.width = "75vmin";
            confimg.style.borderRadius = "25px";
            alertbox.appendChild(confimg);

            alertbox.style.position = "fixed";
            alertbox.style.backgroundColor = "white";
            alertbox.style.zIndex = "20";
            alertbox.style.top = "50vh";
            alertbox.style.left = "50vw";
            alertbox.style.transform = "translate(-50%, -50%)";
            alertbox.style.width = "75vmin";
            alertbox.style.height = "auto";
            alertbox.style.filter = "drop-shadow(0px 3px 3px #333333)";
            alertbox.style.borderRadius = "25px";

            greywall = document.createElement("greywall");
            greywall.style.backgroundColor = "grey";
            greywall.style.zIndex = "10";
            greywall.style.width = "100vw";
            greywall.style.height = "100vh";
            greywall.style.position = "fixed";
            greywall.style.top = "0";
            greywall.style.left = "0";
            greywall.style.opacity = "0.75";

            document.body.appendChild(greywall);
            document.body.appendChild(alertbox);

            greywall.onclick = function() {
                alertbox.remove();
                greywall.remove();
            }
        }

        div.ontouchstart = function() {
            this.style.opacity = "0.6";
        }
        div.ontouchend = function() {
            this.style.opacity = "";
        }
    }

    searchbar = document.createElement("input");
    searchbar.type = "text";
    searchbar.placeholder = "find an item";
    document.body.appendChild(searchbar);

    document.getElementsByTagName("input")[0].onkeyup = function(event) {
        for (div of document.getElementsByTagName("div")) {
            if (div.name.toUpperCase().includes(this.value.toUpperCase())) {
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
        style={{backgroundColor: "#FDFDFD"}}
      />
      /*<Container style={{backgroundColor: "lightblue"}}>
        <Content>
        </Content>
      </Container>*/
    );
  }
}

export default Checker;
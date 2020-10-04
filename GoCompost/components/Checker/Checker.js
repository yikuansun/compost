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
<div style="background-image: url(https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_data/Bones.PNG)"></div>
<div style="background-image: url(https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_data/Bread.png)"></div>
<div style="background-image: url(https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_data/Certified\\ compostable.PNG)"></div>
<div style="background-image: url(https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_data/Coffee.PNG)"></div>
<div style="background-image: url(https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_data/Cork\\,\\ bamboo\\ more.PNG)"></div>
<div style="background-image: url(https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_data/Cotton\\ wool\\ rags.PNG)"></div>
<div style="background-image: url(https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_data/Dairy.PNG)"></div>
<div style="background-image: url(https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_data/Dough.png)"></div>
<div style="background-image: url(https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_data/Dryer\\ lint.PNG)"></div>
<div style="background-image: url(https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_data/Eggs\\ eggshell.PNG)"></div>
<div style="background-image: url(https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_data/Fireplace\\ ashes.PNG)"></div>
<div style="background-image: url(https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_data/Fish.PNG)"></div>
<div style="background-image: url(https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_data/Fruits.PNG)"></div>
<div style="background-image: url(https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_data/NOT\\ Compostables/Glass\\ and\\ more.PNG)"></div>
<div style="background-image: url(https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_data/Grass\\ clippings.PNG)"></div>
<div style="background-image: url(https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_data/Hair\\ fur.PNG)"></div>
<div style="background-image: url(https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_data/Hay\\ straw.PNG)"></div>
<div style="background-image: url(https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_data/House\\ plants.PNG)"></div>
<div style="background-image: url(https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_data/Leaves.PNG)"></div>
<div style="background-image: url(https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_data/Meat.PNG)"></div>
<div style="background-image: url(https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_data/Nutshells.PNG)"></div>
<div style="background-image: url(https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_data/Paper.PNG)"></div>
<div style="background-image: url(https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_data/Paper\\ cup\\ plates.PNG)"></div>
<div style="background-image: url(https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_data/Pasta.PNG)"></div>
<div style="background-image: url(https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_data/NOT\\ Compostables/Plastic\\ bag\\ and\\ more.PNG)"></div>
<div style="background-image: url(https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_data/NOT\\ Compostables/Product\\ basket\\ and\\ more.PNG)"></div>
<div style="background-image: url(https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_data/NOT\\ Compostables/Rubber\\ band\\ and\\ more.PNG)"></div>
<div style="background-image: url(https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_data/Sawdust.PNG)"></div>
<div style="background-image: url(https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_data/Shredded\\ newspaper.PNG)"></div>
<div style="background-image: url(https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_data/NOT\\ Compostables/Styrofoam\\ and\\ more.PNG)"></div>
<div style="background-image: url(https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_data/Table\\ scraps.PNG)"></div>
<div style="background-image: url(https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_data/Tea\\ bags.PNG)"></div>
<div style="background-image: url(https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_data/Veggies.PNG)"></div>
<div style="background-image: url(https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_data/Wood\\ chips.PNG)"></div>
<div style="background-image: url(https://raw.githubusercontent.com/yikuansun/composting-searchbar/master/image_data/Yard\\ trimmings.PNG)"></div>

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

<script>
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
      />
      /*<Container style={{backgroundColor: "lightblue"}}>
        <Content>
        </Content>
      </Container>*/
    );
  }
}

export default Checker;
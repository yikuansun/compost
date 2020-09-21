import React, { Component } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { View, StyleSheet, Dimensions} from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab"
import GOOGLE_API_KEY_FIREBASE from "../../api_key";

//Components
import PlaceList from "../Place/PlaceList";

//Styles
import styles from "./styles";

//Firebase
import * as firebase from 'firebase';
import 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
    apiKey: GOOGLE_API_KEY_FIREBASE,
    authDomain: "compostable-290100.firebaseapp.com",
    databaseURL: "https://compostable-290100.firebaseio.com",
    projectId: "compostable-290100",
    storageBucket: "compostable-290100.appspot.com",
    messagingSenderId: "1030026048519",
    appId: "1:1030026048519:android:95d798444b97843e2f66a2",
};  

class MapScreen extends Component {
  constructor(props) {
    super(props);
    //Initial State
    this.state = {
        places: [],
        selectedIndex: 0
    };
  }

  async componentDidMount() {
    console.log(this.props);
    try {
      await this.getPlaces();
    } catch(err){
      console.log(err);
    }
  }

  async getPlaces() {
    const markers = [];


    // Get data from firestore
    firebase.initializeApp(firebaseConfig);
    const firestore = firebase.firestore();

    // Loop through the data and generate markers array
    await firestore.collection("compost_centers").get().then(querySnapshot => {
        console.log("Total compost centers: ", querySnapshot.size);
        querySnapshot.forEach(documentSnapshot => {
            console.log("data: ", documentSnapshot.data());
            markers.push(documentSnapshot.data());
        });
    });

    //Update our places array
    this.setState({ places: markers });
    console.log("updated markers data.");
    //console.log("places to display: " +  JSON.stringify(markers,null,4));

  }

  // Handle tab clicks
  handleIndexChange = index => {
    this.setState({
      ...this.state,
      selectedIndex: index
    });
    console.log("selected tab:" + index);
    console.log("load data...");

  };

   // render the map
  render() {
    // Use Chapel Hill location
    const initialRegion = {
      latitude: 35.913978,
      longitude: -79.053979,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    };
  
    const { places } = this.state;
    // Followed the solution from https://stackoverflow.com/questions/58564916/react-native-maps-show-marker-callout
    if (places.length>0) {
      console.log("data is ready.");
    return (
      <View style={styles.container}>

        <View style={styles.mapView}>
          <MapView
            style={{
              flex: 1
            }}
            showsUserLocation = {true}
            enableZoomControl={true}
            provider={PROVIDER_GOOGLE}
            ref={ref => this.map = ref}
            initialRegion = {initialRegion}
            onRegionChangeComplete={region => this.setState({ region })}
          >
          {places.map((marker, i) => (
              <MapView.Marker
                key={i}
                coordinate={{
                  latitude: marker.location.latitude,
                  longitude: marker.location.longitude
                }}
                title={marker.name}
              />
            ))}
          </MapView>

        </View>
        <View>
            <SegmentedControlTab
              values={["Compost Centers", "Events"]}
              selectedIndex={this.state.selectedIndex}
              onTabPress={this.handleIndexChange}
              />
        </View>
        <View style={styles.placeList}>
          <PlaceList places={places} map={this.map} />
        </View>
      </View>
    ) }
    else {
      console.log("data not arrived yet...");
      return (
        <View>
        </View>
      );
    }
  }
}

export default MapScreen;

import React, { Component } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { View, StyleSheet, Dimensions, Linking, Button } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab"
import { Container, Content, Text } from "native-base";
import eventIcon from '../../assets/event.png';

//Components
import PlaceList from "../Place/PlaceList";

//Styles
import styles from "./styles";

//Firebase
import * as firebase from 'firebase';
import 'firebase/firestore';

/*
 *  For MapView, refer to:  https://github.com/react-native-community/react-native-maps
 *  For Firebase, refer to: https://docs.expo.io/guides/using-firebase/
 */


class MapScreen extends Component {

  static navigationOptions = { 
      title: "Map123",
      headerRight: (
        <Button
          title="test"
          color="#fff"
        />
      ),
      headerMode: "screen",
    };

  constructor(props) {
    super(props);
    //Initial State
    this.state = {
        places: [],
        events: [],
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
    const placeMarkers = [];
    const eventMarkers = [];

    // Get data from firestore
    const firestore = firebase.firestore();

    // Loop through the compost centers data and generate placeMarkers array
    await firestore.collection("compost_centers").get().then(querySnapshot => {
        console.log("Total compost centers: ", querySnapshot.size);
        querySnapshot.forEach(documentSnapshot => {
            console.log("data: ", documentSnapshot.data());
            placeMarkers.push(documentSnapshot.data());
        });
    });
    
    // Loop through the events data and generate eventMarkers array
    // default order by id ascedent
    await firestore.collection("events").orderBy("id").get().then(querySnapshot => {
      console.log("Total events: ", querySnapshot.size);
      querySnapshot.forEach(documentSnapshot => {
          console.log("data: ", documentSnapshot.data());
          eventMarkers.push(documentSnapshot.data());
      });
    });

    //Update our places array
    this.setState({ places: placeMarkers });
    this.setState({ events: eventMarkers });
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
  

    const { places, events } = this.state;
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
                onCalloutPress={
                  () => {
                    // Launch google map
                    const url = "https://www.google.com/maps/search/?api=1&query="+marker.location.longitude+","+marker.location.latitude+"&query_place_id="+marker.place_id;
                    Linking.openURL(url);
                  }
                }>
                  <MapView.Callout>
                      <View>
                        <Text>{marker.name}</Text>
                      </View>
                  </MapView.Callout>
                </MapView.Marker>
            ))}
          {events.map((marker, i) => (
              <MapView.Marker
                key={i}
                coordinate={{
                  latitude: marker.location.latitude,
                  longitude: marker.location.longitude
                }}
                image={eventIcon}
                title={marker.name}
                onCalloutPress={
                  () => {
                    // Launch google map
                    const url = "https://www.google.com/maps/search/?api=1&query="+marker.location.longitude+","+marker.location.latitude+"&query_place_id="+marker.place_id;
                    Linking.openURL(url);
                  }
                }>
                  <MapView.Callout>
                      <View>
                        <Text>{marker.name}</Text>
                        <Text>Hosted by {marker.host}</Text>
                        <Text>{marker.date}</Text>
                      </View>
                  </MapView.Callout>
                </MapView.Marker>
            ))}
          </MapView>

        </View>
        <View>
            <SegmentedControlTab
              values={["Organic Waste Drop Off", "Community Events"]}
              selectedIndex={this.state.selectedIndex}
              onTabPress={this.handleIndexChange}
              />
        </View>
        { this.state.selectedIndex===0 ? (
          <View style={styles.placeList}>
          <PlaceList type='places' places={places} map={this.map} />
          </View>
        ) : null }

        { this.state.selectedIndex===1 ? (
          <View style={styles.placeList}>
          <PlaceList type='events' places={events} map={this.map} />
          </View>
        ) : null }

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

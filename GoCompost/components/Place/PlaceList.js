import React, { Component } from "react";
import {
  FlatList,  // List component
  TouchableOpacity,  // produce the effect while touching a list item
  View,
  ActivityIndicator,
} from "react-native";
import { ListItem, Text, Avatar } from "react-native-elements";
import { Container, Content } from "native-base";
import {GOOGLE_API_KEY} from "../../api_key";
import styles from "./styles";

/* display the list of places */
class PlaceList extends Component {
  constructor() {
    super();

  }
  // ListMapItem's handleClick prop
  handleClick = (item) => {
    // construct new region from marker's lat/lng
    // and current region's deltas to keep zoom level
    console.log("item:" + JSON.stringify(item, null, 4) )
    const newRegion = {
      latitude: item.location.latitude,
      longitude: item.location.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
    // animate camera to that region over 500 ms
    this.props.map.animateToRegion(newRegion, 500)
  }

/*
*/

  render() {
    const { places } = this.props;
    console.log("try to render place list");
    return (
      <Container style={styles.container2}>
        <Content>
          {places.length <= 0 && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" />
            </View>
          )}
          {places.length > 0 && (
            <View>

            <FlatList
              data={places}
              renderItem={({ item }) => (
                <TouchableOpacity>
                    <ListItem bottomDivider
                      onPress={() => this.handleClick(item) }
                      key={item.place_id}
                    >
                      <Avatar
                        title={item.name}
                        rounded={false}
                        size={"large"}
                        source={
                          item.photo && 
                          // call google API to get the photo
                          {uri: 
                            `https://maps.googleapis.com/maps/api/place/photo?photoreference=${item.photo.photo_reference}&sensor=false&maxheight=${item.photo.height}&maxwidth=${item.photo.width}&key=${GOOGLE_API_KEY}`
                          }
                      }/>
                      <ListItem.Content>
                          <ListItem.Title style={styles.placeTitleFont}>{item.name}</ListItem.Title>
                          <ListItem.Subtitle>
                                <Text style={styles.placeDetailFont}>
                                  Address: {item.address}{"\n"}
                                  Type: {item.type}{"\n"}
                                  Hours: {item.hours}{"\n"}
                                  Contact: {item.contact}{"\n"}
                                </Text>
                          </ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.place_id.toString()}
            />
            </View>
          )}
        </Content>
      </Container>
    );
  }
}

export default PlaceList;
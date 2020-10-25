import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  mapView: {
    flex: 1,
    justifyContent: "center",
    height: "50%",
    width: "100%"
  },
  placeList: {
    flex: 1,
    justifyContent: "center"
  }, 
  placeListTabText: {
    color: 'black',
    flex: 1,
    textAlign: "center"
  },
  placeListTab: {
    color: '#B6D7AA',
    flex: 1,
    justifyContent: "center",
    borderColor:  "#C1D58D"

  },
  placeListTabActive: {
    color: '#B6D7AA',
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#C1D58D",
    borderColor:  "#C1D58D"
  },
});
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";


const HomeScreen = (props) => {
  const imageLink = require('./homeBackground.jpg');
  return (
      <View style={{flex: 1}}>
        <View style={{flex: 6}}>
          <View style={{flex: 0.8}}>

          </View>
          <View style={{flex: 0.4, backgroundColor: '#cae0ce'}}>
            <View style={{flex: 1, flexDirection: "row"}}>
              <Text style={{flex: 2, textAlign: 'center', fontSize: 20, alignContent: 'center', fontWeight: "bold"}}>FOOD WASTE</Text>
              <Text style={{flex: 3, textAlign: 'center', alignContent: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 'bold'}}>Greenhouse Gas Calculator</Text>
            </View>
            <Text style={{textAlign: 'center', fontSize: 13}}>(only food waste logged is included in this calculation)</Text>
          </View>
          <View style={{flex: 1.1}}>

            <View style={{flex: 5}}>
              <Text>Outlining</Text>
            </View>
            <View style={{flex: 4}}>
              <Text style={{fontSize: 10, margin: 3}}>Net Greenhouse Gas emission benefits from landfilling to composting food waste, based on the EPA Waste Reduction Model (WARM) and related assumptions and limitations.</Text>
            </View>
          </View>
          <View style={{flex: 1.1}}>
            <View style={{flex: 1.2}}>
              <Text style={{fontSize: 15, margin: 3}}>For Comparison, it's equivalent to Greenhouse Gas emissions from: </Text>
            </View>
            <View style={{flex: 1.4}}>

            </View>

          </View>
        </View>
        <View style={{flex: 4.3, backgroundColor: '#e0e0e0'}}>


          <Text style={{margin: 2}}>Additional Notes</Text>
          <Text style={{margin: 2, fontSize: 12}}>1. Food waste is the largest component of the landfilled waste according to EPA. Diverting food waste from landfills is the project priority. First reduce, reuse or recycle when possible.</Text>
          <Text style={{margin: 2, fontSize: 12}}>2. This model assumes landfills meeting national practice. Landfill methane emissions may be three times higher in case of landfills without landfill gas (LFG) recovery, so diverting food waste from such landfill facility/practice may result in more than double the GHG impact.</Text>
          <Text style={{margin: 2, fontSize: 12}}>3. The EPA WARM model assumes composting at a composting facility and includes a “transportation to landfill” factor. This GHG factor can be reduced if composting at your own yard.</Text>
          <Text style={{margin: 2, fontSize: 12}}>4. It’s based on EPA Greenhouse Gas Equivalencies Calculator. To explore more, visit: https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator</Text>
        </View>
      </View>
  )
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  },
  btnSignup: {
    fontSize: 20,
    backgroundColor: "#ebc934",
    borderRadius: 10

  },
  btnGuest: {
    fontSize: 20,
    backgroundColor: "#919191",
    borderRadius: 10
  },
  btnAbout: {
    fontSize: 20,
    backgroundColor: "#c1dbd6",
    borderRadius: 10
  },
  btnWords: {textAlign: 'center', fontSize: 15, margin: 6},
  btnWhite: {textAlign: 'center', fontSize: 15, margin: 6, color: 'white'},
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: 'center'
  }
});

export default HomeScreen;

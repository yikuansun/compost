import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Image } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto, FontAwesome5 } from '@expo/vector-icons';

const HomeScreen = (props) => {
  const imageLink = require('./homeBackground.jpg');

  this.state = {
    country: 'od'
  }
  return (
      <View style={{flex: 1}}>

        <View style={{flex: 6}}>
          <DropDownPicker
              items={[
                {label: 'Today', value: 'od' },
                {label: '7 Days', value: 'sd'},
                {label: '30 Days', value: 'td' },
                {label: 'All Time', value: 'at'}
              ]}
              defaultValue={this.state.country}
              containerStyle={{height: 40}}
              style={{backgroundColor: '#fafafa'}}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={item => this.setState({
                country: item.value
              })}
          />
          <View style={{flex: 0.5, flexDirection: 'row', margin: 5,  borderRadius: 20, backgroundColor: 'white'}}>
            <View style={{flex: 3}}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <FontAwesome5 name="recycle" size={40} color="black" />
              </View>
            </View>
            <View style={{flex: 4}}>
              <Text>22</Text>
              <Text>lbs</Text>
              <Text>Combined total diverted from landfills</Text>
            </View>
          </View>
          <View style={{flex: 0.5, flexDirection: 'row', margin: 5, borderRadius: 20, backgroundColor: 'white'}}>
            <View style={{flex: 3}}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Fontisto name="dollar" size={25} color="black" style={{margin: 10}}/>
              </View>
            </View>
            <View style={{flex: 4}}>
              <Text>0.61</Text>
              <Text>USD</Text>
              <Text>Landfill tip fee savings based on a national average of $55/ton</Text>

            </View>
          </View>
          <View style={{flex: 0.4, backgroundColor: '#cae0ce'}}>
            <View style={{flex: 1, flexDirection: "row"}}>
              <Text style={{flex: 2, textAlign: 'center', fontSize: 20, alignContent: 'center', fontWeight: "bold"}}>FOOD WASTE</Text>
              <Text style={{flex: 3, textAlign: 'center', alignContent: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 'bold'}}>Greenhouse Gas Calculator</Text>
            </View>
            <Text style={{textAlign: 'center', fontSize: 13}}>(only food waste logged is included in this calculation)</Text>
          </View>
          <View style={{flex: 0.8}}>

            <View style={{flex: 4, flexDirection: 'column', margin: 5,  borderRadius: 20, backgroundColor: 'white'}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 3}}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Fontisto name="cloudy" size={36} color="black" style={{margin: 10}} />
                </View>
              </View>
              <View style={{flex: 4}}>
                <Text>-17.6</Text>
                <Text>lbs CO2e</Text>

              </View>

              </View>
              <View style={{flex:1}}>
                <Text style={{fontSize: 10, margin: 3}}>Net Greenhouse Gas emission benefits from landfilling to composting food waste, based on the EPA Waste Reduction Model (WARM) and related assumptions and limitations.</Text>
              </View>
            </View>

          </View>
          <View style={{flex: 0.8}}>

            <View style={{flex: 1.4, flexDirection: 'column', margin: 5, borderRadius: 20, backgroundColor: 'white'}}>
              <View style={{flex: 0.8}}>
                <Text style={{fontSize: 15, margin: 3}}>For Comparison, it's equivalent to Greenhouse Gas emissions from: </Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 3}}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <MaterialCommunityIcons name='car-side' size={45} color="block" style={{margin: 10}} />
                </View>
              </View>
              <View style={{flex: 4}}>
                <Text>19.8</Text>
                <Text>miles</Text>
                <Text>driven by an average passenger vehicle</Text>
              </View>
              </View>

            </View>

          </View>
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

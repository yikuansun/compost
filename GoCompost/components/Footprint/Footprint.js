import React, {Component} from "react";
import {ImageBackground, TouchableOpacity} from "react-native";
import { Text, StyleSheet, View, Button, Image, TextInput, ScrollView } from "react-native";
import NumericInput from 'react-native-numeric-input';
import * as firebase from 'firebase';
import 'firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';

// Use the user context
import { AppContext } from '../../AppContextProvider'

//Components

class Footprint extends Component {
    /*
    const [chosenDate, setChosenDate] = useState(new Date(Date.now()));
    const [value,onChangeText] = useState();
    const [weight,setWeight] = useState(0);
    const [value2,onChangeText2] = React.useState();
    const [value4,onChangeText4] = React.useState();
    const [selectedValue, setSelectedValue] = useState("java");
    const [date, setDate] = useState(new Date(Date.now()));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [wasteType, setWasteType] = useState("fw");
    */

    /*
       Set the context to be used
       Refer to React Context API: https://reactjs.org/docs/context.html#contextprovider
       use the experimental public class fields syntax
     Refer to example: https://www.taniarascia.com/using-context-api-in-react/
    */
    static contextType = AppContext;


    // Initial state
    state = {
        value: '',
        weight: 0,
        date: new Date(Date.now()),
        mode: 'date',
        show: false,
        wasteType: 'fw',
    }

    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.date;
        this.setShow(Platform.OS === 'ios');
        //setDate(currentDate);
        this.setState({ date: currentDate });  // updated to class notation for state
    };

    showMode = (currentMode) => {
        //setShow(true);
        //setMode(currentMode);
        this.setState({show: true});
        this.setState({mode: currentMode})
    };

    showDatepicker = () => {
        this.showMode('date');
    };

    // NOTE: use this to generate a unique ID as key for user log purpose
    getTimeEpoch = () => {
        return new Date().getTime().toString();                             
    }


    render() {
        // Note: eference to firestore can not be defined at class level,
        // because it will not be initilized until app is loaded
        const dbh = firebase.firestore(); 
        
        // Fetch user Id from context
        let userId = this.context.user.loggedIn ? this.context.user.userInfo.user_id : 'GuestUser';
        console.log("in footprint, context data: " + JSON.stringify(this.context,null,4));
        // TODO: need to load the existing user data here

        return (
      <View>
          <ScrollView>
              <View style={{flex: 2.2}}>

                  <View style={{flex: 1.9, alignItems: "center", justifyContent: "center", backgroundColor: "#606161"}}>
                      <Text style={{color: "white", fontSize: 20, fontWeight: "bold"}}>I M P A C T</Text>
                  </View>
                  <ImageBackground source={require('../../assets/leafHeader.jpg')} style={styles.image}>
                      <View style={{alignItems: "center", justifyContent: "center"}}>
                          <Text style={{color: 'white'}}>Sign in to log & track impact</Text>
                      </View>
                  </ImageBackground>

                  <View style={{flex: 2.7, flexDirection: "row", alignItems: "center", marginRight: 10, marginLeft: 10, marginTop: 0, marginBottom: 0}}>

                      <View style={{flex: 1, flexDirection: "column", backgroundColor: "#ffcc33", alignItems: "center", justifyContent: "center"}}>
                          <Text>Log Total</Text>
                          <Text style={{fontSize: 20, fontWeight: "bold"}}>335 lb</Text>
                      </View>
                      <View style={{flex: 2, flexDirection: "column", backgroundColor: "#e6e6e6", alignItems: "center", justifyContent: "center"}}>
                          <Text>Account Name</Text>
                          <Text style={{fontSize: 20, fontWeight: "bold"}}>BO</Text>
                      </View>
                  </View>
                  <View style={{flex: 1}}>

                      <Text style={styles.headerText}>Log how much compostable waste you save from landfills and estimate its impact on the Earth</Text>
                  </View>

                  <View style={{flex: 4, margin: 10}}>


                      <View style={{flex: 3}}>
                          <Text style={styles.labelText}>Enter Type: </Text>
                          <DropDownPicker
                              items={[
                                  {label: 'Food Waste', value: 'fw' },
                                  {label: 'Non-Food Compostable Waste', value: 'nfw'},
                              ]}
                              defaultValue={this.wasteType}
                              containerStyle={{height: 40}}
                              style={{backgroundColor: '#fafafa'}}
                              itemStyle={{
                                  justifyContent: 'flex-start'
                              }}
                              dropDownStyle={{backgroundColor: '#fafafa'}}
                              onChangeItem={item => this.setState({wasteType: item.value})}
                          />
                      </View>
                      <View style={{flex: 2, flexDirection: 'row'}}>
                          <Text style={styles.labelText}>Enter Weight (lb):</Text>
                          <NumericInput style={{flex: 2}}
                                        onChange={
                                            value => {
                                                this.setState({weight: value});
                                            }
                                        }
                                        value={this.state.weight} />
                      </View>
                      <TouchableOpacity style={{flex: 3, textAlign: 'center', backgroundColor: 'gray', margin: 10}} onPress={ () => {
                          const recordId = this.getTimeEpoch();
                          console.log(`add record  userId: ${userId} recordId: ${recordId} date: ${this.state.date} waste: ${this.state.wasteType} weight: ${this.state.weight}`);
                          dbh.collection("logs").doc(userId).set({
                            [recordId] : {
                                "weight": this.state.weight,
                                "date": this.state.date,
                                "waste": this.state.wasteType
                            }
                          },
                          { merge: true }  // NOTE: can not use merge here to append to existing data 
                          );

                    }
                    } >
                          <Text style={{textAlign: 'center', margin: 5  , color: 'white', fontWeight: 'bold', fontSize: 20}}>ADD TO LOG</Text>
                      </TouchableOpacity>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                          <View style={{flex: 1, flexDirection: 'column', borderRadius: 10, backgroundColor: "#b4d6c4", margin: 9}}>
                              <Text style={{textAlign: 'center', fontSize: 15}}>Today</Text>
                              <Text style={{textAlign: 'center'}}>x lbs</Text>
                          </View>
                          <View style={{flex: 1, flexDirection: 'column', borderRadius: 10, backgroundColor: "#cfcfcf", margin: 9}}>
                              <Text style={{textAlign: 'center', fontSize: 15}}>Last 7 Days</Text>
                              <Text style={{textAlign: 'center'}}>y lbs</Text>
                          </View>
                          <View style={{flex: 1, flexDirection: 'column', borderRadius: 10, backgroundColor: "#a8bdbf", margin: 9}}>
                              <Text style={{textAlign: 'center', fontSize: 15}}>Last 30 Days</Text>
                              <Text style={{textAlign: 'center'}}>z lbs</Text>
                          </View>
                      </View>
                      <TouchableOpacity style={{flex: 3, textAlign: 'center', backgroundColor: '#78989e', margin: 10}} onPress={ () => this.props.navigation.navigate("Learn") } >
                          <Text style={{textAlign: 'center', margin: 5  , color: 'white', fontWeight: 'bold', fontSize: 20}}>TRACK MY IMPACT</Text>
                      </TouchableOpacity>
                  </View>

              </View>
          </ScrollView>
      </View>
        )
    };
};

const styles = StyleSheet.create({
    headerText: {
        fontSize: 15,
        margin: 8,
        color: 'black'

    },
    labelText: {
        fontSize: 20,
        margin: 2
    },
    bottomText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white"
    },
    bottomSubHeader: {
        fontSize: 20,
        color: "white"
    },
    textInputStyling: {
        height: 30,
        borderColor: 'gray',
        borderWidth: 1,

        fontSize: 15
    },
    image: {
        flex: 2,
        resizeMode: "cover",
        justifyContent: "center"
    },

});

export default Footprint;

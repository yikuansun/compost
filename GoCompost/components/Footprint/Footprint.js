import React, {Component} from "react";
import {ImageBackground, TouchableOpacity} from "react-native";
import { Text, StyleSheet, View,  Button, Image, TextInput, ScrollView } from "react-native";
import { Input } from "react-native-elements";

import NumericInput from 'react-native-numeric-input';
import DateTimePicker from "@react-native-community/datetimepicker";
import * as firebase from 'firebase';

import 'firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';

// Use the user context
import { AppContext } from '../../AppContextProvider'

//Components

class Footprint extends Component {

    /*
       Set the context to be used
       Refer to React Context API: https://reactjs.org/docs/context.html#contextprovider
       use the experimental public class fields syntax
     Refer to example: https://www.taniarascia.com/using-context-api-in-react/
    */
    static contextType = AppContext;


    // Initial state
    state = {
        userId: '',
        totalWeight: 0,
        totalWeightToday: 0,
        totalWeightLastWeek: 0,
        totalWeightLastMonth: 0,
        value: '',
        weight: 0,
        date: new Date(Date.now()),
        dateText: parseInt(new Date(Date.now()).getMonth()+1) + "/"+ (new Date(Date.now())).getDate()  +"/"+ (new Date(Date.now())).getFullYear(),
        mode: 'date',
        show: false,
        wasteType: 'fw',
    }

    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.date;
        this.setState({show: false});
        if (! isNaN(selectedDate)) {
            this.setState({ date: currentDate });
            this.setState({ dateText: parseInt(currentDate.getMonth()+1) + "/"+ currentDate.getDate()  +"/"+ currentDate.getFullYear()});
        }
        this._hideDateTimePicker();
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

    saveLog = async () => {
        const userId = this.state.userId;

        const dbh = firebase.firestore(); 
        const userLogRef = dbh.collection('logs').doc(userId);

        userLogRef.get()
          .then((docSnapshot) => {
              if (docSnapshot.exists) {
                    const doc = docSnapshot.data();
                    const log = doc.log;
                    const newEntry = {
                        "weight": this.state.weight,
                        "date": this.state.date,
                        "waste": this.state.wasteType
                    };
                    log.push(newEntry);
                    doc.log = log;
                    // append to the doc
                    userLogRef.set(doc).then(()=> {
                            // now propagate the changes to the UI by calling the database fetch again
                            console.log("added log record for the user.");
                            this.getLog(userId);
                    });
                    console.log(`updated record  userId: ${userId} date: ${this.state.date} waste: ${this.state.wasteType} weight: ${this.state.weight}`);

              } else { // create the doc
                userLogRef.set({
                      user_id: userId,
                      log: [
                          {
                      "weight": this.state.weight,
                      "date": this.state.date,
                      "waste": this.state.wasteType
                          }
                      ]}).then(()=> {
                            // now propagate the changes to the UI by calling the database fetch again
                            console.log("created log doc for the user...");
                            this.getLog(userId);
                      });
                console.log(`add record  userId: ${userId} date: ${this.state.date} waste: ${this.state.wasteType} weight: ${this.state.weight}`);

              }
          });

          // now propagate the changes to the UI by calling the database fetch again
          //this.getLog(userId);
    }

    // fetch all logs of the user and get the aggregated data
    getLog = async (userId) => {
        const dbh = firebase.firestore(); 
        console.log(`get getLog of ${userId}...`);
        const userLogRef = dbh.collection('logs').doc(userId);
        const jsonata = require("jsonata");
        var total = 0;
        userLogRef.get()
          .then((docSnapshot) => {
              console.log(`fetched log succcessfuly`);
              if (docSnapshot.exists) {
                    const data = docSnapshot.data();
                    
                    // refer to https://docs.jsonata.org/overview for details of how to do filtering/aggregations
                    // https://docs.jsonata.org/predicate
                    // aggregate and get all the data
                    // sum of total
                    var totalWeightEpression = jsonata("$sum(log.weight)");
                    var totalWeight = totalWeightEpression.evaluate(data);
                    console.log(`get total weight:${totalWeight}`);
                    this.setState({totalWeight: totalWeight});

                    // get starting timestamp of 1day/7day/30day
                    var seconds = (new Date()).getTime() / 1000;
                    var yesterdayTimestamp = seconds - 3600*24;
                    var lastWeekTimestamp = seconds - 3600*24*7;
                    var lastMonthTimestamp = seconds - 3600*24*30;

                    var yesterdayExpression = jsonata(`$sum(log[date.seconds>=${yesterdayTimestamp}].weight)`);
                    var weekExpression = jsonata(`$sum(log[date.seconds>=${lastWeekTimestamp}].weight)`);
                    var monthExpression = jsonata(`$sum(log[date.seconds>=${lastMonthTimestamp}].weight)`);

                    var lastDayTotal = yesterdayExpression.evaluate(data);
                    var lastWeekTotal = weekExpression.evaluate(data);
                    var lastMonthTotal = monthExpression.evaluate(data);

                    this.setState({totalWeightToday: lastDayTotal});
                    this.setState({totalWeightLastWeek: lastWeekTotal});
                    this.setState({totalWeightLastMonth: lastMonthTotal});
                    
                    console.log(`totalWeightToday(${lastDayTotal}) totalWeightLastWeek(${lastWeekTotal}) totalWeightLastMonth(${lastMonthTotal})`);


              } else { // new user with no data
                console.log(`log does not exist for ${userId}`);

              }
          });

    }

    componentDidMount() {
        // Runs after the first render() lifecycle
        let userId = this.context.user.loggedIn ? this.context.user.userInfo.user_id : 'GuestUser';
        this.setState({userId: userId});
        console.log(`in footprint, userId(${userId}) context data: ` + JSON.stringify(this.context,null,4));

        this.getLog(userId);
    }


    _showDateTimePicker = () => {
        console.log('clicked date time');
        this.setState({ show: true })
    };

    _hideDateTimePicker = () => this.setState({ show: false });

    _handleDatePicked = date => {
        var date = new Date(date);
        if (! isNaN(date)) {
            this.setState({ date: date });
        }
        this._hideDateTimePicker();
    }

    render() {
        // Note: eference to firestore can not be defined at class level,
        // because it will not be initilized until app is loaded
        const dbh = firebase.firestore(); 
        // Fetch user Id from context, if not logged in then use GuestUser as user ID
        let userId = this.state.userId;

        var date = this.state.date;
        //var dateValue = parseInt(date.getMonth()+1) + "/"+ date.getDate()  +"/"+ date.getFullYear();
/*
        <Input style={{fontSize:16,padding:6,borderColor:'#C8C8C8',borderWidth: 1}} 
        placeholder="Date"
        onClick = {this._showDateTimePicker}
        onChangeText={this._showDateTimePicker}
        value={dateValue}/>
        */
        return (
      <View>
          <ScrollView>
              <View style={{flex: 2.2}}>

                  <View style={{flex: 1.9, alignItems: "center", justifyContent: "center", backgroundColor: "#606161"}}>
                      <Text style={{color: "white", fontSize: 20, fontWeight: "bold"}}>I M P A C T</Text>
                  </View>

                  <View style={{flex: 2.7, flexDirection: "row", alignItems: "center", marginRight: 10, marginLeft: 10, marginTop: 0, marginBottom: 0}}>

                      <View style={{flex: 1, flexDirection: "column", backgroundColor: "#ffcc33", alignItems: "center", justifyContent: "center"}}>
                          <Text>Log Total</Text>
        <Text style={{fontSize: 20, fontWeight: "bold"}}>{this.state.totalWeight} lb</Text>
                      </View>
                      <View style={{flex: 2, flexDirection: "column", backgroundColor: "#e6e6e6", alignItems: "center", justifyContent: "center"}}>
                          <Text>Account Name</Text>
                          <Text style={{fontSize: 20, fontWeight: "bold"}}>{userId}</Text>
                      </View>
                  </View>
                  <View style={{flex: 1}}>

                      <Text style={styles.headerText}>Log how much compostable waste you save from landfills and estimate its impact on the Earth</Text>
                  </View>


                  <View style={{flex: 4, margin: 10}}>
                  <View style={{flex: 2, flexDirection: 'row'}}>
                  <Text style={styles.labelText}>Choose Date: </Text>


                  <TouchableOpacity style={{backgroundColor: "white",}} onPress = {this._showDateTimePicker}    >
                      <Text style={styles.labelText}>{this.state.dateText}</Text>
                  </TouchableOpacity>
                  {this.state.show &&
                     (<DateTimePicker
                              testID="dateTimePicker"
                              value={this.state.date}
                              mode={this.state.mode}
                              is24Hour={true}
                              display="default"
                              onChange={this.onChange}
                              isVisible={this.state.isDateTimePickerVisible} 
                              onConfirm={this._handleDatePicked} 
                              onCancel={this._hideDateTimePicker}

                          />) }

                      </View>
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
                      <TouchableOpacity style={{flex: 3, textAlign: 'center', backgroundColor: 'gray', margin: 10}} onPress = { () => {this.saveLog(userId);} }>
                          <Text style={{textAlign: 'center', margin: 5  , color: 'white', fontWeight: 'bold', fontSize: 20}}>ADD TO LOG</Text>
                      </TouchableOpacity>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                          <View style={{flex: 1, flexDirection: 'column', borderRadius: 10, backgroundColor: "#b4d6c4", margin: 9}}>
                              <Text style={{textAlign: 'center', fontSize: 15}}>Today</Text>
                              <Text style={{textAlign: 'center', fontWeight:"bold"}}>{this.state.totalWeightToday} lbs</Text>
                          </View>
                          <View style={{flex: 1, flexDirection: 'column', borderRadius: 10, backgroundColor: "#cfcfcf", margin: 9}}>
                              <Text style={{textAlign: 'center', fontSize: 15}}>Last 7 Days</Text>
                              <Text style={{textAlign: 'center', fontWeight:"bold"}}>{this.state.totalWeightLastWeek}  lbs</Text>
                          </View>
                          <View style={{flex: 1, flexDirection: 'column', borderRadius: 10, backgroundColor: "#a8bdbf", margin: 9}}>
                              <Text style={{textAlign: 'center', fontSize: 15}}>Last 30 Days</Text>
                              <Text style={{textAlign: 'center', fontWeight:"bold"}}>{this.state.totalWeightLastMonth}  lbs</Text>
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

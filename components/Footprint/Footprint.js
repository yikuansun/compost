import React, {Component} from "react";
import {ImageBackground, TouchableOpacity} from "react-native";
import { Text, StyleSheet, View,  Button, Image, TextInput, ScrollView } from "react-native";
import { Input } from "react-native-elements";

import NumericInput from 'react-native-numeric-input';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as firebase from 'firebase';

import 'firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';

// Use the user context
import { AppContext } from '../../AppContextProvider'

import earthImpact from '../../assets/earthImpact.png';

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

    saveLog = async (context) => {
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

              // trigger data to be updated in dashboard page
              let { user, setUser } = context;
              user.timestamp = new Date(); // timestamp change from "" to current date
              setUser(user);
              console.log('footprint user data: ' + JSON.stringify(user));

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

                    if (typeof(lastDayTotal) == "undefined") lastDayTotal = 0;
                    if (typeof(lastWeekTotal) == "undefined") lastWeekTotal = 0;
                    if (typeof(lastMonthTotal) == "undefined") lastMonthTotal = 0;
                    if (typeof(totalWeight) == "undefined") totalWeight = 0;

                    console.log(`footprint totalWeightToday(${lastDayTotal}) totalWeightLastWeek(${lastWeekTotal}) totalWeightLastMonth(${lastMonthTotal})`);

                    this.setState({totalWeightToday: lastDayTotal});
                    this.setState({totalWeightLastWeek: lastWeekTotal});
                    this.setState({totalWeightLastMonth: lastMonthTotal});
                    


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
        var dateText = parseInt(new Date(date).getMonth()+1) + "/"+ (new Date(date)).getDate()  +"/"+ (new Date(date)).getFullYear();
        if (! isNaN(date)) {
            this.setState({ date: date });
            this.setState({ dateText: dateText });
        }
        this._hideDateTimePicker();
    }

    render() {
        // Note: eference to firestore can not be defined at class level,
        // because it will not be initilized until app is loaded
        const dbh = firebase.firestore(); 
        // Fetch user Id from context, if not logged in then use GuestUser as user ID
        let userId = this.state.userId;
        let user = this.context.user;
        const nickname = user.loggedIn ? user.userInfo.name.substring(0,user.userInfo.name.indexOf('@')) : userId;

        var date = this.state.date;
        //var dateValue = parseInt(date.getMonth()+1) + "/"+ date.getDate()  +"/"+ date.getFullYear();
/*
        <Input style={{fontSize:16,padding:6,borderColor:'#C8C8C8',borderWidth: 1}} 
        placeholder="Date"
        onClick = {this._showDateTimePicker}
        onChangeText={this._showDateTimePicker}
        value={dateValue}/>
        */
       /*
                 <View style={{flex: 1.9, alignItems: "center", justifyContent: "center", backgroundColor: "#606161"}}>
                      <Text style={{color: "white", fontSize: 20, fontWeight: "bold"}}>I M P A C T</Text>
                  </View>
       */
        return (
      <View>
          <ScrollView>
              <View style={{flex: 2.2}}>

                 <View style={{flex: 1.9, alignItems: "center", justifyContent: "center", backgroundColor: "#606161"}}>
                 <Image source={earthImpact} style={{resizeMode: "stretch", justifyContent: "center"}}/>
                 </View>

                  <View style={{flex: 2.7, flexDirection: "row", alignItems: "center", marginRight: 10, marginLeft: 10, marginTop: 0, marginBottom: 0}}>

                      <View style={{flex: 1, flexDirection: "column", backgroundColor: "white", alignItems: "center", justifyContent: "center", marginTop:10, marginRight:5}}>
                          <Text style={{marginTop:5,marginBottom:5}}>LOG TOTAL</Text>
        <Text style={{fontSize: 20, fontWeight: "bold", marginBottom:5}}>{this.state.totalWeight} lbs</Text>
                      </View>
                      <View style={{flex: 1, flexDirection: "column", backgroundColor: "white", alignItems: "center", justifyContent: "center", marginTop:10}}>
                          <Text style={{marginTop:5,marginBottom:5}}>ACCOUNT NAME</Text>
                          <Text style={{marginBottom:5, fontSize: 20, fontWeight: "bold"}}>{nickname}</Text>
                      </View>
                  </View>

                  <View style={{flex: 4, margin: 10}}>
                  <View style={{flex: 2, flexDirection: 'row'}}>
                  <Text style={styles.labelText}>CHOOSE DATE:    </Text>


                  <TouchableOpacity style={{backgroundColor: "white",}} onPress = {this._showDateTimePicker}    >
                      <Text style={styles.labelText}>{this.state.dateText}</Text>
                  </TouchableOpacity>
                  {this.state.show &&
                     (<DateTimePickerModal
                              testID="dateTimePicker"
                              mode={this.state.mode}
                              isVisible={this.state.show} 
                              onConfirm={this._handleDatePicked} 
                              onCancel={this._hideDateTimePicker}

                          />) }

                      </View>
                      <View style={{flex: 3, marginBottom: 10, zIndex: 69}}>
                          <Text style={styles.labelText}>ENTER TYPE: </Text>
                          <DropDownPicker
                              items={[
                                  {label: 'Food Waste', value: 'fw' },
                                  {label: 'Non-Food Compostable Waste', value: 'nfw'},
                              ]}
                              defaultValue='fw'

                              containerStyle={{height: 40}}
                              style={{backgroundColor: '#fafafa'}}
                              itemStyle={{
                                  justifyContent: 'flex-start'
                              }}
                              searchablePlaceholder="Select a type"
                              dropDownStyle={{backgroundColor: '#fafafa'}}
                              onChangeItem={item => this.setState({wasteType: item.value})}
                          />
                      </View>
                      <View style={{flex: 2, flexDirection: 'row'}}>
                          <Text style={styles.labelText}>ENTER WEIGHT (lb):   </Text>
                          <NumericInput style={{flex: 2}}
                                        onChange={
                                            value => {
                                                this.setState({weight: value});
                                            }
                                        }
                                        minValue={0}
                                        step={0.1}
                                        valueType='real'
                                        value={this.state.weight} />
                      </View>
                      <TouchableOpacity style={{flex: 3, textAlign: 'center', backgroundColor: 'gray', margin: 10}}
                        onPress = { () => {
                            if (this.state.userId == "GuestUser") alert("Sorry... you need to make an account to save logs :(");
                            else this.saveLog(this.context);
                        } }
                      >
                          <Text style={{textAlign: 'center', margin: 5  , color: 'white',  fontSize: 16}}>A D D   T O   L O G</Text>
                      </TouchableOpacity>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                          <View style={{flex: 1, flexDirection: 'column', borderRadius: 10, backgroundColor: "#FEFED4", margin: 9}}>
                              <Text style={{textAlign: 'center', fontSize: 15}}>Today</Text>
                              <Text style={{textAlign: 'center', fontSize: 20, fontWeight:"bold"}}>{this.state.totalWeightToday} lbs</Text>
                          </View>
                          <View style={{flex: 1, flexDirection: 'column', borderRadius: 10, backgroundColor: "#cfcfcf", margin: 9}}>
                              <Text style={{textAlign: 'center', fontSize: 15}}>Last 7 Days</Text>
                              <Text style={{textAlign: 'center', fontSize: 20, fontWeight:"bold"}}>{this.state.totalWeightLastWeek}  lbs</Text>
                          </View>
                          <View style={{flex: 1, flexDirection: 'column', borderRadius: 10, backgroundColor: "#C1C19C", margin: 9}}>
                              <Text style={{textAlign: 'center', fontSize: 15}}>Last 30 Days</Text>
                              <Text style={{textAlign: 'center', fontSize: 20, fontWeight:"bold"}}>{this.state.totalWeightLastMonth}  lbs</Text>
                          </View>
                      </View>
                      <TouchableOpacity style={{flex: 3, textAlign: 'center', backgroundColor: 'gray', margin: 10}}
                        onPress={ () => {
                            if (this.state.userId == "GuestUser") alert("Sorry... you need to make an account to track your impact :(");
                            else this.props.navigation.navigate("Learn");
                        } } 
                      >
                          <Text style={{textAlign: 'center', margin: 5  , color: 'white', fontSize: 16}}>T R A C K   M Y   I M P A C T</Text>
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
        fontSize: 15,
        margin: 2,
        marginTop: 5,
        marginBottom: 13
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

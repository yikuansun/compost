import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Image } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto, FontAwesome5 } from '@expo/vector-icons';

import * as firebase from 'firebase';
import 'firebase/firestore';

// Use the user context
import { AppContext } from '../../AppContextProvider'
class LearnScreen extends React.Component {

    static contextType = AppContext;

    state = {
        loaded: false,
        userId: '',
        timePeriod: '1day',
        data: {
            '1day':  {
                total: 0,
                food: 0,
            },
            '7day': {
                total: 0,
                food: 0,
            },
            '30day': {
                total: 0,
                food: 0
            },
            'all': {
                total: 0,
                food: 0
            }
        }
    };

    

    constructor(props) {
        super(props);

    }


    // fetch all logs of the user and get the aggregated data
        getLog = async (userId) => {
            const dbh = firebase.firestore(); 
            console.log(`LearnScreen get getLog of ${userId}...`);
            const userLogRef = dbh.collection('logs').doc(userId);
            const jsonata = require("jsonata");
            var total = 0;
            userLogRef.get()
              .then((docSnapshot) => {
                  console.log(`LearnScreen: fetched log succcessfuly`);
                  if (docSnapshot.exists) {
                        const data = docSnapshot.data();
                        
                        // refer to https://docs.jsonata.org/overview for details of how to do filtering/aggregations
                        // https://docs.jsonata.org/predicate
                        // aggregate and get all the data
                        // sum of total
                        var totalWeightEpression = jsonata("$sum(log.weight)");
                        var totalWeight = totalWeightEpression.evaluate(data);
    
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
                       
                        // Food waste
                        var foodTotalWeightExpression = jsonata("$sum(log[waste='fw'].weight)");
                        var foodTotalWeight = foodTotalWeightExpression.evaluate(data);

                        var foodYesterdayExpression = jsonata(`$sum(log[waste='fw' and date.seconds>=${yesterdayTimestamp}].weight)`);
                        var foodWeekExpression = jsonata(`$sum(log[waste='fw' and date.seconds>=${lastWeekTimestamp}].weight)`);
                        var foodMonthExpression = jsonata(`$sum(log[waste='fw' and date.seconds>=${lastMonthTimestamp}].weight)`);
    
                        var foodLastDayTotal = foodYesterdayExpression.evaluate(data);
                        var foodLastWeekTotal = foodWeekExpression.evaluate(data);
                        var foodLastMonthTotal = foodMonthExpression.evaluate(data);

                        console.log(`totalWeight(${totalWeight}) totalWeightToday(${lastDayTotal}) totalWeightLastWeek(${lastWeekTotal}) totalWeightLastMonth(${lastMonthTotal})`);
                        console.log(`foodTotalWeight(${foodTotalWeight}) foodLastDayTotal(${foodLastDayTotal}) foodLastWeekTotal(${foodLastWeekTotal}) foodLastMonthTotal(${foodLastMonthTotal})`);
                        
                        // write it into state for later use
                        this.setState({data: {
                            '1day':  {
                                total: lastDayTotal,
                                food: foodLastDayTotal,
                            },
                            '7day': {
                                total: lastWeekTotal,
                                food: foodLastWeekTotal,
                            },
                            '30day': {
                                total: lastMonthTotal,
                                food: foodLastMonthTotal
                            },
                            'all': {
                                total: totalWeight,
                                food: foodTotalWeight
                            }
                        }})
                  } else { // new user with no data
                    console.log(`log does not exist for ${userId}`);
    
                  }
              });
    
        }


    render() {
        if (!this.state.loaded) {
            console.log('never loaded, load it');
            let userId = this.context.user.loggedIn ? this.context.user.userInfo.user_id : 'GuestUser';
            this.setState({userId: userId});
            console.log(`in LearnScreen, userId(${userId}) context data: ` + JSON.stringify(this.context,null,4));

            this.getLog(userId);
            this.setState({loaded: true});
        } else {
            console.log('alread loaded once');
        }



      const pricePerTon = 55;
      var dateRange = this.state.timePeriod;
      console.log(`dateRange selected: ${dateRange}`);
      //console.log('data stored:' + JSON.stringify(this.state.data,null,4));
      var weight = this.state.data[dateRange].total;
      var foodWasteWeight = this.state.data[dateRange].food;
      var dollar = (weight/pricePerTon).toFixed(2);
      // TODO: need to change the formula here, using only food waste for emission and miles
      var emission = (foodWasteWeight * 0.9).toFixed(1);
      var miles = (foodWasteWeight * 1.3).toFixed(1);
      return (
        <View style={{flex: 1}}>

            <View style={{flex: 6}}>
                <DropDownPicker
                    items={[
                        {label: 'Today', value: '1day' },
                        {label: '7 Days', value: '7day'},
                        {label: '30 Days', value: '30day' },
                        {label: 'All Time', value: 'all'}
                    ]}
                    defaultValue={this.state.timePeriod}
                    containerStyle={{height: 40}}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => this.setState({timePeriod: item.value})}
                />
                <View style={{flex: 0.5, flexDirection: 'row', margin: 5,  borderRadius: 20, backgroundColor: 'white'}}>
                    <View style={{flex: 3}}>
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <FontAwesome5 name="recycle" size={40} color="black" />
                        </View>
                    </View>
                    <View style={{flex: 4}}>
                        <Text style={{fontSize:16, fontWeight:'bold'}}>{weight}</Text>
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
                        <Text style={{fontSize:16, fontWeight:'bold'}}>{dollar}</Text>
                        <Text>USD</Text>
                        <Text>Landfill tip fee savings based on a national average of $55/ton</Text>

                    </View>
                </View>
                <View style={{flex: 0.3, backgroundColor: '#cae0ce'}}>
                    <View style={{flex: 0.6, flexDirection: "row"}}>
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
                                <Text style={{fontSize:16, fontWeight:'bold'}}> -{emission}</Text>
                                <Text>lbs CO2e</Text>

                            </View>

                        </View>
                        <View style={{flex:1}}>
                            <Text style={{fontSize: 14, margin: 3}}>Net Greenhouse Gas emission benefits from landfilling to composting food waste, based on the EPA Waste Reduction Model (WARM) and related assumptions and limitations.</Text>
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
                                    <MaterialCommunityIcons name='car-side' size={45} color="black" style={{margin: 10}} />
                                </View>
                            </View>
                            <View style={{flex: 4}}>
                                <Text style={{fontSize:16, fontWeight:'bold'}}>{miles}</Text>
                                <Text>miles driven by an average passenger vehicle</Text>
                            </View>
                        </View>

                    </View>
                    <TouchableOpacity 
                style={styles.backButton}
                onPress= {() => {this.props.navigation.navigate('Impact');}}
            >
            <Text style={{backgroundColor: "#cfe1e0",
                        fontSize: 20,
                        textAlign: "center",
                        padding: 6,  marginLeft:100, marginRight:100,         borderRadius:15,
                        borderWidth: 1,        borderColor: '#cfe1e0',
                    }}>  Back  </Text>      
        </TouchableOpacity>
                </View>
            </View>


        </View>
      )
    }
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

export default LearnScreen;
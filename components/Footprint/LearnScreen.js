import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Image } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto, FontAwesome5 } from '@expo/vector-icons';
import carbonImg from '../../assets/carbon_small.png';
import wasteImg from '../../assets/triangle_small.png';
import moneyImg from '../../assets/money_small.png';
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
                        if (typeof(totalWeight) == "undefined") totalWeight = 0;
                        if (typeof(lastDayTotal) == "undefined") lastDayTotal = 0;
                        if (typeof(lastWeekTotal) == "undefined") lastWeekTotal = 0;
                        if (typeof(lastMonthTotal) == "undefined") lastMonthTotal = 0;

                        // Food waste
                        var foodTotalWeightExpression = jsonata("$sum(log[waste='fw'].weight)");
                        var foodTotalWeight = foodTotalWeightExpression.evaluate(data);

                        var foodYesterdayExpression = jsonata(`$sum(log[waste='fw' and date.seconds>=${yesterdayTimestamp}].weight)`);
                        var foodWeekExpression = jsonata(`$sum(log[waste='fw' and date.seconds>=${lastWeekTimestamp}].weight)`);
                        var foodMonthExpression = jsonata(`$sum(log[waste='fw' and date.seconds>=${lastMonthTimestamp}].weight)`);

                        var foodLastDayTotal = foodYesterdayExpression.evaluate(data);
                        var foodLastWeekTotal = foodWeekExpression.evaluate(data);
                        var foodLastMonthTotal = foodMonthExpression.evaluate(data);

                        if (typeof(foodLastDayTotal) == "undefined") foodLastDayTotal = 0;
                        if (typeof(foodLastWeekTotal) == "undefined") foodLastWeekTotal = 0;
                        if (typeof(foodLastMonthTotal) == "undefined") foodLastMonthTotal = 0;
                        if (typeof(foodTotalWeight) == "undefined") foodTotalWeight = 0;



                        console.log(`learnscreen totalWeight(${totalWeight}) totalWeightToday(${lastDayTotal}) totalWeightLastWeek(${lastWeekTotal}) totalWeightLastMonth(${lastMonthTotal})`);
                        console.log(`learnscreen foodTotalWeight(${foodTotalWeight}) foodLastDayTotal(${foodLastDayTotal}) foodLastWeekTotal(${foodLastWeekTotal}) foodLastMonthTotal(${foodLastMonthTotal})`);
                        
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
            console.log('already loaded once in learn screen');
        }


      
      const pricePerTon = 55;
      var dateRange = this.state.timePeriod;
      console.log(`dateRange selected: ${dateRange}`);
      console.log('data stored:' + JSON.stringify(this.state.data,null,4));
      var weight = this.state.data[dateRange].total;
      var foodWasteWeight = this.state.data[dateRange].food;
      var dollar = (pricePerTon*weight/2000).toFixed(2);
      // using only food waste for emission and miles
      var emission = (foodWasteWeight * 0.8).toFixed(1);
      var miles = (emission * 1.126).toFixed(1);
      return (
        <View style={{flex: 1}}>
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

            <ScrollView style={{flex: 6}}>
                <View style={{flex: 0.5, flexDirection: 'row',margin: 5,  borderRadius: 20, backgroundColor: 'white', padding:6}}>
                    <View style={{flex: 3}}>
                        <View style={{ marginTop:15, alignItems: 'center', justifyContent: 'center'}}>
                            <Image resizeMode="contain" source={wasteImg}></Image>        
                        </View>
                    </View>
                    <View style={{flex: 4}}>
                        <Text style={{fontSize:22, fontWeight:'bold'}}>{weight.toFixed(1)}</Text>
                        <Text>lbs</Text>
                        <Text>Combined total diverted from landfills by composting</Text>
                    </View>
                </View>
                <View style={{flex: 0.5, flexDirection: 'row', margin: 5, borderRadius: 20, backgroundColor: 'white', padding:6}}>
                    <View style={{ marginTop:10, flex: 3}}>
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Image resizeMode="contain" source={moneyImg}></Image>        

                        </View>
                    </View>
                    <View style={{flex: 4}}>
                        <Text style={{fontSize:22, fontWeight:'bold'}}>{dollar}</Text>
                        <Text>USD</Text>
                        <Text>Landfill tip fee savings based on a national average</Text>

                    </View>
                </View>
                <View style={{flex: 0.23, backgroundColor: '#cae0ce', padding:6}}>
                        <Text style={{textAlign: 'center', fontSize: 16, alignContent: 'center', marginTop:3 }}>FOOD WASTE GREENHOUSE GAS CALCULATOR</Text>
                    <Text style={{textAlign: 'center', fontSize: 13}}>(only food waste logged is included in this calculation)</Text>
                </View>
                <View style={{flex: 0.8}}>

                    <View style={{flex: 4, flexDirection: 'column', margin: 5,  borderRadius: 20, backgroundColor: 'white', padding:6}}>
                        <View style={{marginTop:8, flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 3}}>
                                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                <Image resizeMode="contain" source={carbonImg}></Image>        

                                </View>
                            </View>
                            <View style={{flex: 4}}>
                                <Text style={{fontSize:22, fontWeight:'bold'}}> -{parseFloat(parseFloat(emission).toFixed(1))}</Text>
                                <Text>lbs CO2e</Text>

                            </View>

                        </View>
                        <View style={{flex:0.9}}>
                            <Text style={{fontSize: 14, margin: 3}}>Net Greenhouse Gas emission benefits from composting instead of landfilling food waste, based on the EPA Waste Reduction Model (WARM).</Text>
                        </View>
                    </View>

                </View>
                <View style={{flex: 0.8}}>

                    <View style={{flex: 1.4, flexDirection: 'column', margin: 5, borderRadius: 20, backgroundColor: 'white', padding:6}}>
                        <View style={{flex: 0.8}}>
                            <Text style={{fontSize: 15, margin: 3}}>For Comparison, it's equivalent to Greenhouse Gas emissions from: </Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 3}}>
                                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                    <MaterialCommunityIcons name='car-side' size={68} color="black" style={{margin: 10}} />
                                </View>
                            </View>
                            <View style={{flex: 4}}>
                                <Text style={{fontSize:22, fontWeight:'bold'}}>{parseFloat(miles).toFixed(0)}</Text>
                                <Text>miles driven by an average passenger vehicle</Text>
                            </View>
                        </View>

                    </View>
                    <TouchableOpacity 
                style={styles.backButton}
                onPress= {() => {this.props.navigation.navigate('Impact');}}
            >
            <Text style={{backgroundColor: "#cfe1e0",
                        fontSize: 16,
                        textAlign: "center",
                        padding: 6,  marginLeft:100, marginRight:100,         borderRadius:15, marginBottom: 5,
                        borderWidth: 1,        borderColor: 'lightgray', backgroundColor: 'lightgray'
                    }}>  B A C K  </Text>      
        </TouchableOpacity>
                </View>
            </ScrollView>


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
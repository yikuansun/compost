import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { VictoryChart, VictoryLegend, VictoryAxis, VictoryBar, VictoryTheme } from "victory-native";
import event1 from '../../assets/event1_small.jpg';
import event2 from '../../assets/event2_small.jpg';
import event3 from '../../assets/event3_small.jpg';
import event4 from '../../assets/event4_small.jpg';
import wasteImg from '../../assets/triangle_small.png';
import moneyImg from '../../assets/money_small.png';
import carbonImg from '../../assets/carbon_small.png';

import * as firebase from 'firebase';
import 'firebase/firestore';

import { AppContext } from '../../AppContextProvider'

//Components
class Dashboard extends Component {
  static navigationOptions = {
    headerTitle: "Dashboard"
  };

  // Set the context to be used
  // Refer to React Context API: https://reactjs.org/docs/context.html#contextprovider
  // use the experimental public class fields syntax
  // Refer to example: https://www.taniarascia.com/using-context-api-in-react/
  static contextType = AppContext;

  // Get log data
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


  render() {

    const { user, setUser } = this.context;

    // TODO: this data should come from database

    const userData = {
      totalCompost: 255,
      impact: {
        month: {
          amount: 22,
          money: 0.61,
          co2: -17.6,
        }
      },

      dataWeekly: [
        {day: 1, amount: 30, label: "10/10"},
        {day: 2, amount: 40, label: "10/11"},
        {day: 3, amount: 25, label: "10/12"},
        {day: 4, amount: 23, label: "10/13"},
        {day: 5, amount: 28, label: "10/14"},
        {day: 6, amount: 30, label: "10/15"},
        {day: 7, amount: 32, label: "10/16"},
      ],
    };

    const DeviceWidth = Dimensions.get('window').width;
    const marginBottom = 10;
    const marginLeft = 10;

    return (

    <View style={styles.container}>
    <View style={styles.container}>
      { user.loggedIn ? 
         (<Text style={{ fontWeight: 'bold', fontSize:22, alignContent:"center"}}>Hello {user.userInfo.name}</Text>)
         :
         (<Text style={{ fontWeight: 'bold', fontSize:20, alignContent:"center"}}>Hello GUEST</Text>)
      }
      <Text>You have diverted to date</Text>
<Text style={{ fontWeight: 'bold', fontSize:22, alignContent:"center"}}>{userData.totalCompost} lbs</Text>
      <Text>organic waste from landfills to composting.</Text>
      <Text style={{ color:"black", fontSize:20, alignContent:"center"}}>Way to go!</Text>
    </View>

  <View style={styles.container3}>
    <Text style={{fontSize:18, width:"100%", alignContent:"center"}}>TOTAL LOGGED IMPACT</Text>
  
    <View style={{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <View>
        <View style={{justifyContent: 'center',alignItems:'center', width: DeviceWidth*0.33, height: DeviceWidth*0.18, marginBottom:0, marginLeft:0}}>
          <Image resizeMode="contain" source={wasteImg}></Image>
          </View>
        <View style={{justifyContent: 'center',alignItems:'center', width: DeviceWidth*0.3, height: DeviceWidth*0.10, marginBottom:0, marginLeft:0}} >
          <Text style={{fontSize:22, fontWeight:'bold'}}> {userData.impact.month.amount} </Text>
          <Text> lbs </Text>
        </View>
      </View>
      <View>
        <View style={{justifyContent: 'center', alignItems:'center', width: DeviceWidth*0.34, height: DeviceWidth*0.18, marginBottom:0, marginLeft:0 }} >
          <Image resizeMode="contain" source={moneyImg}></Image>        
        </View>
        <View style={{justifyContent: 'center',alignItems:'center', width: DeviceWidth*0.3, height: DeviceWidth*0.10, marginBottom:0, marginLeft:0 }} >
          <Text style={{fontSize:22, fontWeight:'bold'}}> {userData.impact.month.money} </Text>
          <Text>USD</Text>
          </View>
      </View>
      <View>
        <View style={{justifyContent: 'center', alignItems:'center', width: DeviceWidth*0.33, height: DeviceWidth*0.18, marginTop:0, marginBottom:0, marginLeft:0 }} >
          <Image resizeMode="contain" source={carbonImg}></Image>        
          </View>
        <View style={{justifyContent: 'center', alignItems:'center', width: DeviceWidth*0.3, height: DeviceWidth*0.10, marginBottom:0, marginLeft:0}} >
          <Text style={{fontSize:22, fontWeight:'bold'}}> {userData.impact.month.co2} </Text>
          <Text>lbs CO2e</Text>
        </View>
      </View>
    </View>

  </View>

        <View style={{flex: 1, justifyContent: 'center', alignItems:'center', alignContent:"center"}}>


          <VictoryChart
            // domainPadding will add space to each side of VictoryBar to
            // prevent it from overlapping the axis
            theme={VictoryTheme.material}
            domainPadding={0}
            color="gray"
            width={360}
            height={180}

          >
            <VictoryAxis
              // tickValues specifies both the number of ticks and where
              // they are placed on the axis
              tickValues={userData.dataWeekly.map(item=>{return item.day})}
              tickFormat={userData.dataWeekly.map(item=>{return item.label})}
            />
            <VictoryAxis
              dependentAxis
              // tickFormat specifies how ticks should be displayed
              tickFormat={(x) => (`${x} lbs`)}
            />
            <VictoryBar
              data={userData.dataWeekly.map(item=>{return {month:item.day, amount:item.amount}})}
              x="month"
              y="amount"
            />

          </VictoryChart>
        </View>

      <View style={styles.container2}>
        <Text style={{ fontSize:16, alignContent:"center", marginTop: 5, marginBottom: 5}}>U P C O M I N G   E V E N T S</Text>
        <View style={{flex:1, flexDirection:"row"}}>
        <Image resizeMode="contain" resizeMethod="scale" source={event1}></Image>
        <Image resizeMode="contain" resizeMethod="scale" source={event2}></Image>
        <Image resizeMode="contain" resizeMethod="scale" source={event3}></Image>
        <Image resizeMode="contain" resizeMethod="scale" source={event4}></Image>
        </View>

        <View style={{flex:1, alignContent:"center"}}>
        </View>
      </View>
      </View>
   )
};

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    backgroundColor: '#e3e8e5',
    alignItems: 'center',
    justifyContent: 'center',
    width:"100%"
  },
  container3: {
    flex: 1,
    
    backgroundColor: '#D9EAD3',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
  });

export default Dashboard;

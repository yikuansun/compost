import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { VictoryChart, VictoryAxis, VictoryBar, VictoryTheme } from "victory-native";
import event1 from '../../assets/event1_small.jpg';
import event2 from '../../assets/event2_small.jpg';
import event3 from '../../assets/event3_small.jpg';
import event4 from '../../assets/event4_small.jpg';
import wasteImg from '../../assets/triangle_small.png';
import moneyImg from '../../assets/money_small.png';
import carbonImg from '../../assets/carbon_small.png';

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

  render() {

    const { user, setUser } = this.context;

    // TODO: this data should come from database
    // load user data from database

    const userData = {
      totalCompost: 285,
      impact: {
        month: {
          amount: 22,
          money: 100.54,
          co2: -17.6,
        }
      },
      monthlyGoal: 22,
      monthlyPct: 110,

      dataHalfYear: [
        {month: 4, amount: 30, label: "Apr"},
        {month: 5, amount: 40, label: "May"},
        {month: 6, amount: 25, label: "June"},
        {month: 7, amount: 23, label: "July"},
        {month: 8, amount: 28, label: "Aug"},
        {month: 9, amount: 30, label: "Sept"},
        {month: 10, amount: 32, label: "Oct"},
      ],
    };

    const DeviceWidth = Dimensions.get('window').width;
    const marginBottom = 10;
    const marginLeft = 10;

    return (

    <View style={styles.container}>
    <View style={styles.container}>
      { user.loggedIn ? 
         (<Text style={{ fontWeight: 'bold', fontSize:18, alignContent:"center"}}>Hello {user.userInfo.name}</Text>)
         :
         (<Text style={{ fontWeight: 'bold', fontSize:18, alignContent:"center"}}>Hello GUEST</Text>)
      }
      <Text>You have diverted to date</Text>
<Text style={{ fontWeight: 'bold', fontSize:18, alignContent:"center"}}>{userData.totalCompost} lbs</Text>
      <Text>compostable waste from landfills.</Text>
      <Text style={{ color:"blue", fontSize:20, alignContent:"center"}}>Way to go!</Text>
    </View>

  <View style={styles.container3}>
    <Text style={{ fontWeight: 'bold', fontSize:18, width:"100%", alignContent:"center"}}>MY IMPACT</Text>
    <Text>in last 30 days</Text>
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

  <View style={{flex: 1, flexDirection: 'row'}}>
        <View>
          <VictoryChart
            // domainPadding will add space to each side of VictoryBar to
            // prevent it from overlapping the axis
            theme={VictoryTheme.material}
            domainPadding={0}
            color="gray"
            width={265}
            height={170}

          >
            <VictoryAxis
              // tickValues specifies both the number of ticks and where
              // they are placed on the axis
              tickValues={userData.dataHalfYear.map(item=>{return item.month})}
              tickFormat={userData.dataHalfYear.map(item=>{return item.label})}
            />
            <VictoryAxis
              dependentAxis
              // tickFormat specifies how ticks should be displayed
              tickFormat={(x) => (`${x}`)}
            />
            <VictoryBar
              data={userData.dataHalfYear.map(item=>{return {month:item.month, amount:item.amount}})}
              x="month"
              y="amount"
            />
          </VictoryChart>
        </View>
        <View>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text styles={styles.text}>Monthly Goal: {userData.monthlyGoal} lb</Text>
          <Text></Text>
          <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={{ fontWeight: 'bold', fontSize:18}}>{userData.monthlyPct}%</Text><Text> Reached</Text>
        </View>

      </View>
    </View>
      <View style={styles.container2}>
        <Text style={{ fontWeight: 'bold', fontSize:18, alignContent:"center"}}>MY LIST</Text>
        <Text>Bookmarked Events/Resources</Text>
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
    
    backgroundColor: '#a9ccde',
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

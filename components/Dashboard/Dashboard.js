import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, Image, ImageBackground} from 'react-native';
import { VictoryChart, VictoryLegend, VictoryAxis, VictoryBar, VictoryTheme } from "victory-native";
import event1 from '../../assets/event1_small.jpg';
import event2 from '../../assets/event2_small.jpg';
import event3 from '../../assets/event3_small.jpg';
import event4 from '../../assets/event4_small.jpg';
import wasteImg from '../../assets/triangle_small.png';
import moneyImg from '../../assets/money_small.png';
import carbonImg from '../../assets/carbon_small.png';
import topBackground from '../../assets/dashboardBackground.png';

import * as firebase from 'firebase';
import 'firebase/firestore';

import { AppContext } from '../../AppContextProvider'

//Components
class Dashboard extends Component {
  static navigationOptions = {
    headerTitle: "Dashboard"
  };

  state = {
    loaded: 0, // triggers a reload
    data: {
      totalWeight: 0,
      foodTotalWeight: 0,
      dataWeekly: [],
    }
  }
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
                    console.log('data:' + JSON.stringify(data,null,4));
                    var totalWeightEpression = jsonata("$sum(log.weight)");
                    var totalWeight = totalWeightEpression.evaluate(data);

                    // Food waste
                    var foodTotalWeightExpression = jsonata("$sum(log[waste='fw'].weight)");
                    var foodTotalWeight = foodTotalWeightExpression.evaluate(data);
  
                    console.log(`totalWeight:${totalWeight} foodTotalWeight:${foodTotalWeight}`);
                    var weeklyData = [];

                    var arrayLength = data.log.length;
                    var log = data.log;
                    for (var i = 0; i < arrayLength; i++) {
                        var date1 = new Date(log[i].date.seconds * 1000);
                        var dateStr = (date1.getMonth() + 1) + '/' + date1.getDate();
                        var dayOrderStr = date1.getMonth()*30 + date1.getDate();
                        log[i].day=dateStr;
                        log[i].dayOrder = dayOrderStr;
                    
                    }
                    
                    var weightByDayExpression = jsonata("log{day: $sum(weight)}^(dayOrder)");
                    var groupResult = weightByDayExpression.evaluate(data);
                    console.log(`groupResult:` + JSON.stringify(groupResult,null,4));
                    
                    var dataWeekly=[];
                    var count=1;
                    for (const [key, value] of Object.entries(groupResult)) {
                        //Do stuff where key would be 0 and value would be the object
                        console.log(`key:${key} value:${value}`);
                    
                        var entry = {
                            day: count,
                            label: key,
                            amount: value
                        };
                        dataWeekly.push(entry);
                        count = count + 1;
                    }
                    if (dataWeekly.length>7) {
                        dataWeekly=dataWeekly.slice(-7);
                    }
                    console.log('dataWeekly: ' + JSON.stringify(dataWeekly,null,4));

                    var compostData = {
                      totalWeight: totalWeight,
                      foodTotalWeight: foodTotalWeight,
                      dataWeekly: dataWeekly
                    }
                    this.setState({data: compostData});
              } else { // new user with no data
                console.log(`log does not exist for ${userId}`);

              }
          });

    }


  // set a loop to check the user.timestamp every 30 seconds
  // if flag changed, then reload data
  // it will trigger the page to render again

  componentDidMount() {
    setInterval(() => {
      console.log('check if data refreshed');
      let { user, setUser } = this.context;
      console.log('user data: ' + JSON.stringify(user));
      if (user.timestamp !== "") {
        let userId = user.loggedIn ? user.userInfo.user_id : 'GuestUser';
        this.getLog(userId);
        user.timestamp = "";  // reset timestamp back to empty
        setUser(user);
        this.setState({loaded:1}); // need to rewind this value to one so the bar chart can be loaded 
      }
    }, 10000); // check if dashboard need refresh every 10 seconds
  }

  componentWillUnmount() {
    console.log('dashboard component unmounted.')
  }

  render() {

    console.log('dashboard data never loaded, load it. context:' + JSON.stringify(this.context,null,4) );
    const user = this.context.user;
    let userId = user.loggedIn ? user.userInfo.user_id : 'GuestUser';
    console.log(`in DashboardScreen, userId(${userId}) context data: ` + JSON.stringify(this.context,null,4));

    let loadCount = this.state.loaded;
    if (loadCount<3) {
      loadCount = loadCount + 1;
      this.setState({userId: userId});
      this.getLog(userId);
      this.setState({loaded: loadCount});
    } else {
        console.log('already loaded. loadCount:' + loadCount);
        //this.getLog(userId);
    }

    console.log('render data:' + JSON.stringify(this.state.data));

    var dataWeekly = this.state.data.dataWeekly;

    // calculate data 
    const pricePerTon = 55;
    var totalWeight = this.state.data.totalWeight;
    var totalFoodWasteWeight = this.state.data.foodTotalWeight;
    var dollar = (pricePerTon * totalWeight/2000).toFixed(2);
    // using only food waste for emission and miles
    var emission = (totalFoodWasteWeight * 0.8).toFixed(1);
    var miles = (emission * 1.126).toFixed(1);


    const DeviceWidth = Dimensions.get('window').width;
    const marginBottom = 10;
    const marginLeft = 10;
    let nickname = "";
    if (user.loggedIn)  {
      if (user.userInfo.name.indexOf('@') != -1) {
        nickname = user.userInfo.name.substring(0,user.userInfo.name.indexOf('@')); // strip @ from email
      } else {
        nickname = user.userInfo.name;
      }
    } else {
      nickname = userId; 
    }
    return (

    <View style={styles.container}>

      <ImageBackground source={topBackground} style={styles.backgroundImage}>

      <Text style={{ textAlign:'center', fontWeight: 'bold', fontSize:22, alignContent:"center"}}>Hello {nickname}</Text>
      <View styles={styles.container}>
      <Text style={{textAlign:'center', alignContent:"center"}}>You have diverted to date</Text>
      <Text style={{ textAlign:'center', fontWeight: 'bold', fontSize:22, alignContent:"center"}}>{totalWeight} lbs</Text>
      <Text style={{ textAlign:'center' }}>organic waste from landfills to composting.</Text>
      {totalWeight===0 ? (
        <Text style={{ textAlign:'center', color:"black", fontSize:20, alignContent:"center"}}>Time to start!</Text>
      ):
        <Text style={{ textAlign:'center', color:"black", fontSize:20, alignContent:"center"}}>Way to go!</Text>

      }
        </View>
      </ImageBackground>


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
          <Text style={{fontSize:22, fontWeight:'bold'}}>   {totalWeight} </Text>
          <Text>    lbs </Text>
        </View>
      </View>
      <View>
        <View style={{justifyContent: 'center', alignItems:'center', width: DeviceWidth*0.34, height: DeviceWidth*0.18, marginBottom:0, marginLeft:0 }} >
          <Image resizeMode="contain" source={moneyImg}></Image>        
        </View>
        <View style={{justifyContent: 'center',alignItems:'center', width: DeviceWidth*0.3, height: DeviceWidth*0.10, marginBottom:0, marginLeft:0 }} >
          <Text style={{fontSize:22, fontWeight:'bold'}}>    {dollar} </Text>
          <Text>   USD</Text>
          </View>
      </View>
      <View>
        <View style={{justifyContent: 'center', alignItems:'center', width: DeviceWidth*0.33, height: DeviceWidth*0.18, marginTop:0, marginBottom:0, marginLeft:0 }} >
          <Image resizeMode="contain" source={carbonImg}></Image>        
          </View>
        <View style={{justifyContent: 'center', alignItems:'center', width: DeviceWidth*0.3, height: DeviceWidth*0.10, marginBottom:0, marginLeft:0}} >
          <Text style={{fontSize:22, fontWeight:'bold'}}> {emission} </Text>
          <Text>     lbs CO2e</Text>
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
              tickValues={this.state.data.dataWeekly.map(item=>{return item.day})}
              tickFormat={this.state.data.dataWeekly.map(item=>{return item.label})}
            />
            <VictoryAxis
              dependentAxis
              // tickFormat specifies how ticks should be displayed
              tickFormat={(x) => (`${x} lbs`)}
            />
            <VictoryBar
              data={this.state.data.dataWeekly.map(item=>{return {month:item.day, amount:item.amount}})}
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
  backgroundImage: {
    flex: 1,
    resizeMode: 'center', // or 'stretch',
    //justifyContent: 'center',
    width: '100%',
    height: '100%',
    alignContent:"stretch",
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

import React, { Component } from "react";
import {
  FlatList,  // List component
  TouchableOpacity,  // produce the effect while touching a list item
  SafeAreaView,
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { ListItem, Text, Avatar } from "react-native-elements";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import { Container, Content, Item, Right } from "native-base";

import * as firebase from 'firebase';
// Use the user context
import { AppContext } from '../../AppContextProvider';
import { Colors } from "react-native/Libraries/NewAppScreen";

class LogScreen extends Component {
    static contextType = AppContext;

    constructor() {
        super();
        this.state = {
            logs: []
        };
    }

    // fetch all logs of the user and get the aggregated data
    getLog = async (userId) => {
        const dbh = firebase.firestore(); 
        console.log(`get getLog of ${userId}...`);
        const userLogRef = dbh.collection('logs').doc(userId);
        userLogRef.get()
          .then((docSnapshot) => {
              console.log(`fetched log succcessfuly`);
              if (docSnapshot.exists) {
                    const data = docSnapshot.data();
                    this.setState({logs: data.log});
              } else { // new user with no data
                console.log(`log does not exist for ${userId}`);

              }
            console.log("logs state DUMP:" + JSON.stringify(this.state.logs));
          });
    }

    componentDidMount() {
        // Runs after the first render() lifecycle
        let userId = this.context.user.loggedIn ? this.context.user.userInfo.user_id : 'GuestUser';
        this.setState({userId: userId});
        //console.log(`in footprint, userId(${userId}) context data: ` + JSON.stringify(this.context,null,4));

        this.getLog(userId);
    }

    // TODO: add update/delete functions for individual entry
    render() {
        const logs = this.state.logs;

        // create dataTable in reverse order of timestamp
        
        console.log("logs dump in LogScreen: " + JSON.stringify(logs));
        console.log("logs.length:" + logs.length);
        // Follow example: https://www.positronx.io/react-native-table-component-tutorial-with-example/
        // https://www.npmjs.com/package/react-native-table-component
        const headerTable =  ['Date', 'Type', 'Weight\n(lbs)'];
        var logDataTable = [];
        for (var i = 0; i < logs.length; i++) {
            //console.log(logs[i]);
            const logItem = logs[i];
            const wasteType = logItem.waste === 'fw'? 'Food Waste': 'Non-Food Compostable';
            const timestamp = new Date(logItem.date.seconds*1000).toLocaleString();
            logDataTable.unshift([ timestamp, wasteType, logItem.weight.toString()]);
        }
        console.log('final log table: ' + logDataTable);
        return (
            <View style={styles.container}>
            
                <View style={styles.container}>
                    <Table borderStyle={{borderWidth:1, borderColor: "grey"}}>
                        <Row data={headerTable} flexArr={[1.7, 1.8, 0.6]} textStyle={styles.tableHeader}/>
                    </Table>
                    <ScrollView style={styles.dataWrapper}>
                    <Table borderStyle={{borderWidth: 1, borderColor: "grey"}}>
                        <Rows data={logDataTable} flexArr={[1.7, 1.8, 0.6]} textStyle={styles.tableText}/>
                    </Table>
                    </ScrollView>
                </View>

                <View style={styles.container2}>
                <TouchableOpacity 
                    onPress= {() => {this.props.navigation.navigate('Impact');}}
                >
                    <Text style={{backgroundColor: "#cfe1e0",
                            fontSize: 16,
                            textAlign: "center",
                            padding: 6,  marginLeft:100, marginRight:100, marginTop:20,        borderRadius:15,
                            borderWidth: 1, borderColor: 'lightgray', backgroundColor: 'lightgray'
                        }}>  B A C K  </Text>      
                </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        marginLeft:2,
        marginRight:2,
    },
    container2: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'space-between',
        width:"100%"
    },
    tableHeader: { 
        justifyContent: 'center',
        textAlign: "center",
        backgroundColor: 'lightgray'
      },
    tableText: { 
        margin: 10,
        textAlign: 'right',
        fontSize: 12,
    },
    text: {
        fontSize: 30
    },
});

export default LogScreen;
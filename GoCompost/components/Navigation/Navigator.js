import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { MaterialCommunityIcons } from '@expo/vector-icons';
//import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import DashboardScreen from "../../components/Dashboard/Dashboard";
import CommunityScreen from "../../components/Community/Community";
import MapScreen from "../../components/Map/Map";
import CheckerScreen from "../../components/Checker/Checker"
import FootprintScreen from "../../components/Footprint/Footprint"
import Footprint from "../../components/Footprint/Footprint";

//Screen in the Home tab
const iconFocusedColor = 'blue';
const iconDefaultColor = '#575757'

//Main Tab
//Icon search: https://icons.expo.fyi/
const bottomTab = createBottomTabNavigator(
  {
    Map: {
        screen: MapScreen,
        navigationOptions: {
          tabBarLabel: "Map",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
            name="map-search"
            size={27}
            color={`${focused ? iconFocusedColor: iconDefaultColor}`} />
          ),
          style: {
            backgroundColor: "blue"
          }
        }
    },
    Checker: {
      screen: CheckerScreen,
        navigationOptions: {
          tabBarLabel: "Check",
          tabBarIcon: ({ focused }) => (
            <AntDesign
            name="checkcircle"
            size={24}
            color={`${focused ? iconFocusedColor: iconDefaultColor}`} />
          ),
          style: {
            backgroundColor: "blue"
          }
        }
    },
    Home: {
        screen: DashboardScreen,
        navigationOptions: {
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="ios-home"
              size={30}
              color={`${focused ? iconFocusedColor: iconDefaultColor}`}
            />
          ),

        }
    },
    Footprint: {
        screen: FootprintScreen,
        navigationOptions: {
          tabBarLabel: "Footprint",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
            name="foot-print" 
            size={28}
            color={`${focused ? iconFocusedColor: iconDefaultColor}`} />          
          ),
          style: {
            backgroundColor: "blue"
          }
        }
    },
    Community: {
        screen: CommunityScreen,
        navigationOptions: {
          tabBarLabel: "Community",
          tabBarIcon: ({ focused }) => (
            <Ionicons
            name="md-people"
            size={35}
            color={`${focused ? iconFocusedColor: iconDefaultColor}`}         
            />
          ),
          style: {
            backgroundColor: "blue"
          }
        }
    },
  },
  {
    navigationOptions: {
      tabBarOptions: {
        activeTintColor: "#e90000",
        inactiveTintColor: "#575757",
        style: {
          backgroundColor: "#f2f2f2",
          height: 60
        }
      }
    }
  },
  {
    lazy: false
  }
);

//Getting the tab header title
bottomTab.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  const headerTitle = routeName;
  return {
    headerTitle
  };
};

bottomTab.lazy = false;

//Root navigator
const AppNavigator = createStackNavigator(
  {
    Home: bottomTab
  },
  {
    // Refer to: https://reactnavigation.org/docs/stack-navigator/
    initialRouteName: "Home",
    // mode to screen as Android style
    headerMode: "screen",   // header mode
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: "blue",
    },
  }
);

export default createAppContainer(AppNavigator);
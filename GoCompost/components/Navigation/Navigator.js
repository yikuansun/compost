import React from "react";
import { View, Image, Text } from 'react-native';
import { createAppContainer, createSwitchNavigator} from "react-navigation";
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
import LearnScreen from "../../components/Footprint/LearnScreen"

import SignInScreen from "./SignIn"
import AboutScreen from "./About"
import LoginScreen from "./LoginScreen"

//Screen in the Home tab
const iconFocusedColor = '#6E8A5D'; // green icon
const iconDefaultColor = '#575757'  // default gray

const Map = createStackNavigator (
  {MapScreen}, 
  {
        //defaultNavigationOptions: (navigationOptions),
        navigationOptions: {
          tabBarLabel: "Map",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
            name="map-search"
            size={27}
            color={`${focused ? iconFocusedColor: iconDefaultColor}`} />
          ),
          style: {
            backgroundColor: iconFocusedColor
          },
          headerMode: "screen",
          headerRight: (
            <View>
              <Text>Logged in user</Text>
            </View>
          )
        }
});

const Checker = createStackNavigator (
  {CheckerScreen},
  {
        navigationOptions: {
          tabBarLabel: "Check",
          tabBarIcon: ({ focused }) => (
            <AntDesign
            name="checkcircle"
            size={24}
            color={`${focused ? iconFocusedColor: iconDefaultColor}`} />
          ),
          style: {
            backgroundColor: iconFocusedColor
          }
        }
});

const Dashboard = createStackNavigator (
  {DashboardScreen},
  {navigationOptions: {
    tabBarLabel: "Home",
    tabBarIcon: ({ focused }) => (
      <Ionicons
        name="ios-home"
        size={30}
        color={`${focused ? iconFocusedColor: iconDefaultColor}`}
      />
    ),
  }
});



// Use a switch navigator for impact tab
const ImpactSwitchNavigator = createSwitchNavigator(
  {Impact: FootprintScreen,
   Learn: LearnScreen,
  }, {
    initialRouteName: 'Impact'
  }  
);


const Impact = createStackNavigator (
  {ImpactSwitchNavigator},  // Use a switch navigator for impact tab
  {navigationOptions: {
    tabBarLabel: "Impact",
    tabBarIcon: ({ focused }) => (
      <MaterialCommunityIcons
      name="foot-print" 
      size={28}
      color={`${focused ? iconFocusedColor: iconDefaultColor}`} />          
    ),
    style: {
      backgroundColor: iconFocusedColor
    }
  }}
);

const Learn = createStackNavigator (
  {LearnScreen},
  {navigationOptions: {
    tabBarLabel: "Footprint",
    tabBarIcon: ({ focused }) => (
      <MaterialCommunityIcons
      name="foot-print" 
      size={28}
      color={`${focused ? iconFocusedColor: iconDefaultColor}`} />          
    ),
    style: {
      backgroundColor: iconFocusedColor
    }
  }}
);


const Community = createStackNavigator (
  {CommunityScreen},
  {navigationOptions: {
    tabBarLabel: "Community",
    tabBarIcon: ({ focused }) => (
      <Ionicons
      name="md-people"
      size={35}
      color={`${focused ? iconFocusedColor: iconDefaultColor}`}         
      />
    ),
    style: {
      backgroundColor: iconFocusedColor
    }
  }}
);

const bottomTab = createBottomTabNavigator({
  Map: Map,
  Check: Checker,
  Home: Dashboard,
  Impact: Impact,
  Community: Community,
  },
  {tabBarOptions: {
    activeTintColor: iconFocusedColor,
    inactiveTintColor: iconDefaultColor,
  }}
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


  }
);


const LandingStack = createStackNavigator({ Landing: SignInScreen });
const AboutStack = createStackNavigator({ About: AboutScreen });
const LoginStack = createStackNavigator({ Login: LoginScreen });

// Create a switch navigator for login->home flow
export default createAppContainer(createSwitchNavigator(
    {Landing: LandingStack,
     Login: LoginStack,
     App: AppNavigator,
     About: AboutStack,
    }, {
      initialRouteName: 'Landing'
    }  
));
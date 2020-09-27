import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "./src/screens/HomeScreen";
import ListScreen from "./src/screens/ListScreen";
import textview from "./src/screens/textview";
import CalendarScreen from "./src/screens/CalendarScreen";
import communityScreen from "./src/screens/community";
import CheckScreen from "./src/screens/check";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    List: ListScreen,
    Input: textview,
    Calendar: CalendarScreen,
    Community: communityScreen,
    Check: CheckScreen
  },
  {
    initialRouteName: "Check",
    defaultNavigationOptions: {
      title: "GoCompost App"
    }
  }
);

export default createAppContainer(navigator);

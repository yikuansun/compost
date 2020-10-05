import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "./src/screens/HomeScreen";
import FetchScreen from "./src/screens/FetchScreen";
import LearnScreen from "./src/screens/LearnScreen";

const navigator = createStackNavigator(
    {
      Home: HomeScreen,
      Fetch: FetchScreen,
        Info: LearnScreen
    },
    {
      initialRouteName: "Fetch",
      defaultNavigationOptions: {
        title: "GoCompost App"
      }
    }
);

export default createAppContainer(navigator);

import React from "react";
//Components
import Navigator from "./components/Navigation/Navigator";

// Firebase related
import * as firebase from 'firebase';
import { firebaseConfig } from './config'

import { AppContext, AppContextProvider } from './AppContextProvider'
import { faSmileBeam } from "@fortawesome/free-solid-svg-icons";


class App extends React.Component {

  render() {
    // Disable warning messages for now
    console.disableYellowBox = true;


    // Initialize firebase only once
    if (!firebase.apps.length) 
      firebase.initializeApp(firebaseConfig);

    const user = {
      loggedIn: false,
      userInfo: {},
    }
    return (
        <AppContextProvider>
          <Navigator />
        </AppContextProvider>
    );
  }
}

export default App;
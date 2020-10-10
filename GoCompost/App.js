import React from "react";
//Components
import Navigator from "./components/Navigation/Navigator";
//Encapsulate every other component inside the navigation

// Firebase related
import * as firebase from 'firebase';
import { firebaseConfig } from './config'

export default function App() {
  // Disable warning messages for now
  console.disableYellowBox = true;

  // Initialize firebase only once
  firebase.initializeApp(firebaseConfig);

  return (
        <Navigator />
  );
}

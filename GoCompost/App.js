import React from "react";
//Components
import Navigator from "./components/Navigation/Navigator";
//Encapsulate every other component inside the navigation
export default function App() {
  // Disable warning messages for now
  console.disableYellowBox = true;
  return (
    <>
      <Navigator />
    </>
  );
}
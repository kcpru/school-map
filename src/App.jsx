import React from "react";
import RadioSVGMap from "./helpers/svg-map/map";
import "./App.css";
import map from './assets/maps/pietro1.json'

function App() {
  return <div className="App">
    <RadioSVGMap map={map} />
  </div>;
}

export default App;

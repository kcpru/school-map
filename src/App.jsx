import React from "react";

import Map from "./helpers/svg-map/map";
import pietro1 from './assets/maps/pietro1.json'

function App() {
  return <div className="App">
    <Map map={pietro1} />
  </div>;
}

export default App;

import React from "react";

import { Map } from "./utils";
import { Info } from "./containers";
import pietro1 from "./assets/maps/pietro1.json";

function App() {
  return (
    <div className="App">
      <Map map={pietro1} />
      <Info />
    </div>
  );
}

export default App;

import React from "react";

import { Header, Map } from "./containers";
import floor0 from "./assets/maps/floor0.json";

function App() {
  return (
    <div className="App">
      <Header />
      <Map map={floor0} />
    </div>
  );
}

export default App;

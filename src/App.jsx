import React from "react";

import { Header, Map, Navigation } from "./containers";
import floor0 from "./assets/maps/floor0.json";

function App() {
  return (
    <div className="App">
      <Header />
      <Map map={floor0} />
      <Navigation />
    </div>
  );
}

export default App;

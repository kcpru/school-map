import React from "react";

import { Header, Navigation } from "./containers";
import { Map } from "./containers";

function App() {
  return (
    <div className="App">
      <Header />
      <Map />
      <Navigation />
    </div>
  );
}

export default App;

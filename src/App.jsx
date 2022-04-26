import React from "react";
import { useSelector } from "react-redux";

import { Header, Navigation, Map } from "./containers";
import { GroundFloorMap, FirstFloorMap } from "./assets/maps";

function App() {
  const activeLocation = useSelector((state) => state.location.value);

  return (
    <div className="App">
      <Header />
      <Map>
        {activeLocation.floor ? <FirstFloorMap /> : <GroundFloorMap />}
      </Map>
      <Navigation />
    </div>
  );
}

export default App;

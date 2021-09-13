import React from "react";
import { useSelector } from "react-redux";

import "./Info.scss"

function Info() {
  const location = useSelector(state=>state.location.value);

  return (
    <div className="info">
      <h2>{location.name}</h2>
      <i>id: {location.id}</i>
      <p>{location.description}</p>
    </div>
  );
}

export default Info;

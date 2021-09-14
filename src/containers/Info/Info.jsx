import React from "react";
import { useSelector } from "react-redux";

import { Search } from "../";
import "./Info.scss";

function Info() {
  const location = useSelector((state) => state.location.value);

  return (
    <div className="info">
      <Search />
      <i>id: {location.id}</i>
      <p>{location.description}</p>
    </div>
  );
}

export default Info;

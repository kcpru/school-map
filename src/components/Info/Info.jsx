import React from "react";
import { useSelector } from "react-redux";

import "./Info.scss";

function Info() {
  const location = useSelector((state) => state.location.value);

  if (location?.description?.length !== 0)
    return <div className="info">{location.description}</div>;
  return <div></div>;
}

export default Info;

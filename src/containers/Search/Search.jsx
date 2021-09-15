import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

import { setLocation } from "../../store/slices/locationSlice";
import floor1 from "../../assets/maps/pietro1.json";

import "./Search.scss";

const floors = [floor1];

const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const groupBadgeStyles = {
  backgroundColor: "#EBECF0",
  borderRadius: "2em",
  color: "#172B4D",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center",
};

const formatGroupLabel = (data) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.locations.length}</span>
  </div>
);

function Search() {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location);

  const handleInputChange = (val) => {
    dispatch(setLocation(val));
  };

  return (
    <Select
      options={floors[0].locations}
      formatGroupLabel={formatGroupLabel}
      onChange={handleInputChange}
      value={location.value}
      className="react-select-container"
      classNamePrefix="react-select"
    />
  );
}

export default Search;

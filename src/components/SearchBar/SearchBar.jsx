import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

import { setLocation } from "../../store/slices/locationSlice";
import { groundFloorRooms, firstFloorRooms } from "../../data/rooms";

import "./SearchBar.scss";

const groupedRooms = [
  {
    label: "Parter",
    options: groundFloorRooms,
  },
  {
    label: "1 Piętro",
    options: firstFloorRooms,
  },
];

const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const groupLabelStyles = {
  color: "#A0A0B4",
};

const groupBadgeStyles = {
  backgroundColor: "#d4d7e2",
  borderRadius: "1rem",
  color: "#172B4D",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "bold",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.2rem 0.5rem",
  textAlign: "center",
};

const formatGroupLabel = (data) => (
  <div style={groupStyles}>
    <span style={groupLabelStyles}>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

function SearchBar() {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location);

  const handleInputChange = (val) => {
    dispatch(setLocation(val));
  };

  return (
    <Select
      options={groupedRooms}
      formatGroupLabel={formatGroupLabel}
      onChange={handleInputChange}
      value={location.value}
      className="react-select-container"
      classNamePrefix="react-select"
    />
  );
}

export default SearchBar;

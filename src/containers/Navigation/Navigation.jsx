import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconContext } from "react-icons";
import { BiArrowFromTop, BiArrowFromBottom } from "react-icons/bi";

import { setLocation } from "../../store/slices/locationSlice";

import "./Navigation.scss";

const iconBtnStyle = {
  className: "nav-btn-icon",
};

function Navigation() {
  const activeLocation = useSelector((state) => state.location.value);
  const dispatch = useDispatch();

  const switchFloor = (floor) => {
    dispatch(setLocation({ ...activeLocation, floor }));
  };

  return (
    <IconContext.Provider value={iconBtnStyle}>
      <nav className="navigation">
        <button
          className={`nav-btn ${activeLocation.floor === 0 && "active"}`}
          onClick={() => switchFloor(0)}
        >
          <BiArrowFromTop />
          <span className="nav-btn-text">Parter</span>
        </button>
        <button
          className={`nav-btn ${activeLocation.floor === 1 && "active"}`}
          onClick={() => switchFloor(1)}
        >
          <BiArrowFromBottom />
          <span className="nav-btn-text">1 Piętro</span>
        </button>
      </nav>
    </IconContext.Provider>
  );
}

export default Navigation;

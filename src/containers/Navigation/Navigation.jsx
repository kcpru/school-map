import React from "react";
import { IconContext } from "react-icons";
import { BiNavigation, BiMap, BiMenuAltRight } from "react-icons/bi";
import  {RiNewspaperLine} from 'react-icons/ri';

import "./Navigation.scss";

const iconBtnStyle = {
  className: "nav-btn-icon",
};

function Navigation() {
  return (
    <IconContext.Provider value={iconBtnStyle}>
      <nav className="navigation">
        <button className="nav-btn">
          <BiMap />
          <span className="nav-btn-text">Mapa</span>
        </button>
        <button className="nav-btn">
          <BiNavigation />
          <span className="nav-btn-text">Trasa</span>
        </button>
        <button className="nav-btn">
          <RiNewspaperLine />
          <span className="nav-btn-text">Informacje</span>
        </button>
      </nav>
    </IconContext.Provider>
  );
}

export default Navigation;

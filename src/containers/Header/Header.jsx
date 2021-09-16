import React from "react";

import { SearchBar, Info } from "../../components";

import "./Header.scss";

function Header() {
  return (
    <header className="header">
      <SearchBar />
      <Info />
    </header>
  );
}

export default Header;

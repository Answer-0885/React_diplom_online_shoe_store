import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/header-logo.png";
const Logo = () => {
  return (
    <React.Fragment>
      <Link to="/">
        <img src={logo} alt="Bosa Noga"></img>
      </Link>
    </React.Fragment>
  );
};

export default Logo;

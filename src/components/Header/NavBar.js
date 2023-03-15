import React from "react";
import Logo from "./Logo";
import Menu from "./Menu";
import ControlsBlock from "./ControlsBlock";
import { nanoid } from "nanoid";

const NavBar = () => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <Logo key={nanoid()} />
        <Menu key={nanoid()} />
        <ControlsBlock key={nanoid()} />
      </nav>
    </React.Fragment>
  );
};

export default NavBar;


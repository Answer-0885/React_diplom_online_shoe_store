import React from "react";
import NavBar from "./NavBar";

import { nanoid } from "nanoid";

const Header = () => {
  return (
    <React.Fragment>
      <header className="container">
        <div className="row">
          <div className="col">
            <NavBar key={nanoid()} />

          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;

import React from "react";

import MenuItem from "./MenuItem";
import { nanoid } from "nanoid";
import { list } from "../../db/data";

const Menu = ({ type }) => {

  return (
    <React.Fragment>
      <div className="collapse navbar-collapse" id="navbarMain">
        <ul className="navbar-nav mr-auto">
          {list.map((item) => (
            <MenuItem key={nanoid()} {...item} />
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Menu;

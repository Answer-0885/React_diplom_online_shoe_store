import React from "react";
import { NavLink } from "react-router-dom";

const MenuItem = (item) => {

  const classBased = "nav-link";
  return (
    <React.Fragment>
      <li className="nav-item ">
        <NavLink
          className={({ isActive }) =>
            isActive ? `${classBased} active` : classBased
          }
          to={item.path}
        >
          {item.title}
        </NavLink>
      </li>
    </React.Fragment>
  );
};

export default MenuItem;

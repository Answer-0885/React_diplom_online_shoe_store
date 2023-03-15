import React from "react";

import MenuItem from "../Header/MenuItem";
import { nanoid } from "nanoid";
import { list } from "../../db/data";
const FooterMenu = () => {
  const menu = [...list];
  menu.splice(0, 1);

  return (
    <React.Fragment>
      <section>
        <h5>Информация</h5>

        <ul className="nav flex-column">
          {menu.map((item) => (
            <MenuItem key={nanoid()} {...item} />
          ))}
        </ul>
      </section>
    </React.Fragment>
  );
};

export default FooterMenu;

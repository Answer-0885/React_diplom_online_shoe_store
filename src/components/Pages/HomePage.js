import React from "react";
import Catalog from "../Main/Catalog/Catalog";
import TopSales from "../Main/TopSales";
import { nanoid } from "nanoid";

const HomePage = () => {

  return (
    <React.Fragment>
      <TopSales key={nanoid()} />
      <Catalog key={nanoid()} />
    </React.Fragment>
  );
};

export default HomePage;

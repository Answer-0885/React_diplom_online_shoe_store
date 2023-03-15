import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import { nanoid } from "nanoid";

const Layout = () => {
  return (
    <React.Fragment>
      <Header key={nanoid()} />
      <Main key={nanoid()}>
        <Outlet />
      </Main>
      <Footer key={nanoid()} />
    </React.Fragment>
  );
};
export default Layout;
/**<Outlet /> - место для вложенных роутов> */

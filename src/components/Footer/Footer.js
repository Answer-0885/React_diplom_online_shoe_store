import React from "react";
import FooterMenu from "./FooterMenu";
import FooterContacts from "./FooterContacts";
import PaymentOptions from "./PaymentOptions";
import Copyright from "./Copyright";
import { nanoid } from "nanoid";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="container bg-light footer">
        <div className="row">
          <div className="col">
            <FooterMenu key={nanoid()} />
          </div>
          <div className="col">
            <PaymentOptions key={nanoid()} />
            <Copyright key={nanoid()} />
          </div>
          <div className="col text-right">
            <FooterContacts key={nanoid()} />
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;



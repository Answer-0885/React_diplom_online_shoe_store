import React from "react";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";

const AvailableSizes = ({ arrSizes, selectSize, stateSelectSize }) => {

    const classBased = "catalog-item-size";
  
    const clickHandler = (e) => {
      e.preventDefault();
      stateSelectSize(e.target.textContent);
    };
    return (
      <React.Fragment>
        <p key={nanoid()}>
          Размеры в наличии:{" "}
          {arrSizes.map(
            (item) =>
              item.avalible && (
                <Link key={nanoid()}>
                  {" "}
                  <span
                    onClick={clickHandler}
                    className={
                      item.size === selectSize
                        ? classBased + " selected"
                        : classBased
                    }
                  >
                    {item.size}
                  </span>{" "}
                </Link>
              )
          )}
        </p>
      </React.Fragment>
    );
  };

  export default AvailableSizes;
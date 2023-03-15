import React from "react";
import {Link} from "react-router-dom";

const CategoriesItem = (props) => {
    const classBased = "nav-link";
  
    return (
      <React.Fragment>
        <li className="nav-item ">
          <Link
            id={props.id}
            className={
              props.selectId === props.id ? classBased + " active" : classBased
            }
            onClick={props.id ? () => props.onClick(props.id) : null}
          >
            {props.title}
          </Link>
        </li>
      </React.Fragment>
    );
  };

  export default CategoriesItem;
import React from "react";

export const Button = ({ text, onClick }) => {

  return (
    <React.Fragment>
      <div className="text-center">
        <button className="btn btn-outline-primary" onClick={onClick}>
          {text}
        </button>
      </div>
    </React.Fragment>
  );
};

export const Title = ({ text }) => {

  return (
    <React.Fragment>
      <h5 className="text-center">{text}</h5>
    </React.Fragment>
  );
};

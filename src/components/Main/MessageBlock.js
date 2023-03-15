import React from "react";
import {nanoid} from "nanoid";

import { Title, Button } from "../Atoms/Atoms";
const MessageBlock = ({ title, textButton, onClick }) => {
  
  return (
    <React.Fragment>
      <div className="message-box">
        <Title key={nanoid()} text={title} />
        <Button key={nanoid()} text={textButton} onClick={onClick} />
      </div>
    </React.Fragment>
  );
};

export default MessageBlock; 

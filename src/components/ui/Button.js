import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import "./Button.css";

export default function Button({ text, type, onclick,icon }) {
  const [color, setColor] = useState("#fff");
  const [bgcolor, setBgcolor] = useState("#01082D");

  useEffect(() => {
    if (type === "dark") {
      setColor("#fff");
      setBgcolor("#01082D");
    }
    if (type === "light") {
      setColor("#01082D");
      setBgcolor("#fff");
    }
  }, [type]);

  return (
    <div onClick={onclick}
        className="button"
        style={{
          color: `${color}`,
          backgroundColor: `${bgcolor}`,
          borderColor: `${color}`,
        }}>
    <span>
      {text}
    </span>
    {icon && <FontAwesomeIcon icon={`fa-solid fa-${icon}`} className='icon' />}
    </div>
  );
}

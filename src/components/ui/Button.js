import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import "./Button.css";

export default function Button({ text, type, onclick,icon,disabled,margin,padding,btncolor,iconcolor,noborder,width }) {
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
    if(disabled){
      setColor("#aaa");
      setBgcolor("#2c3875");
    }
  }, [type]);

  return (
    <div onClick={disabled ? null : onclick}
        className="button"
        style={{
          color: `${color}`,
          backgroundColor: `${btncolor ? btncolor: bgcolor}`,
          margin: `${margin}`,
          padding: `${padding}`,
          border: `${noborder ? 'none' : '1px solid #000'}`,
          width: width
        }}>
    <span>
      {text}
    </span>
    {icon && <FontAwesomeIcon icon={`${icon}`} className='icon' color={iconcolor} />}
    </div>
  );
}

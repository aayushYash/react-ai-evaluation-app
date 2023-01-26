import React, { useState, useEffect } from "react";
import "./Button.css";

export default function Button({ text, type, onclick }) {
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
    <span
      onClick={onclick}
      className="button"
      style={{
        color: `${color}`,
        backgroundColor: `${bgcolor}`,
        borderColor: `${color}`,
      }}
    >
      {text}
    </span>
  );
}

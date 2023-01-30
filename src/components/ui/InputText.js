import React, { useState } from "react";
import "./InputText.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function InputText({ val, onchange, icon, type }) {
  const [fieldType, setFieldType] = useState(type);
  const [hiddenPassword, setHiddenPassword] = useState(true);

  const toggleField = () => {
    if (fieldType === "password") {
      setFieldType("text");
      setHiddenPassword(false);
    } else {
      setFieldType("password");
      setHiddenPassword(true);
    }
  };

  return (
    <div className="inputtextContainer p-4">
      <FontAwesomeIcon icon={`fa-solid fa-${icon}`} className="icon" />
      <input
        type={fieldType}
        value={val}
        onChange={onchange}
        className="inputtext"
      />
      {type === "password" ? (
        <span onClick={toggleField}>
          {hiddenPassword ? (
            <FontAwesomeIcon
              icon={`fa-solid fa-eye-slash`}
              className="icon"
              fontSize={"10px"}
            />
          ) : (
            <FontAwesomeIcon icon={`fa-solid fa-eye`} className="icon" />
          )}
        </span>
      ) : null}
    </div>
  );
}

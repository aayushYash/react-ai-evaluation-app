import React, { useState } from "react";
import "./InputText.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function InputText({ val, onchange, icon, type, placeholder, valid, invalidMsg }) {
  const [fieldType, setFieldType] = useState(type);
  const [hiddenPassword, setHiddenPassword] = useState(true);

  const bordercolor = valid ? 'black' : 'red';

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
    <div className="inputtextContainer p-4" >
      <FontAwesomeIcon icon={`fa-solid fa-${icon}`} className="icon" />
      <div style={{display: 'flex', flexDirection: 'column', position: 'relative'}}>
      <input
        type={fieldType}
        value={val}
        onChange={onchange}
        className="inputtext"
        placeholder={placeholder}
        style={{borderColor: bordercolor}}
      />
      {!valid && <p style={{fontSize: '12px', position: 'absolute', bottom: '-22px', fontWeight: 500, color: 'red'}}>{invalidMsg}</p>}
      </div>
      {type === "password" ? (
        <span onClick={toggleField}>
          {hiddenPassword ? (
            <FontAwesomeIcon
              icon={`fa-solid fa-eye-slash`}
              className="icon pass"
              fontSize={"10px"}
            />
          ) : (
            <FontAwesomeIcon icon={`fa-solid fa-eye`} className="icon pass" />
          )}
        </span>
      ) : null}
    </div>
  );
}

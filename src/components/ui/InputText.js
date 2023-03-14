import React, { useState } from "react";
import "./InputText.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function InputText({ val, onchange, icon, type, placeholder, valid, invalidMsg, disabled,width }) {
  const [fieldType, setFieldType] = useState(type);
  const [hiddenPassword, setHiddenPassword] = useState(true);

  let bordercolor = 'black';
  if(!valid){
    bordercolor = 'red'
  }
  if(disabled){
    bordercolor = 'rgba(0,0,0,0.5)'
  }
  

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
    <div className="inputtextContainer p-4" style={width ? {width: `${width}px` } : null} >

      {icon && <FontAwesomeIcon icon={`${icon}`} className="icon" />}
      <div style={{display: 'flex', flexDirection: 'column', position: 'relative'}}>
      <input
        type={fieldType}
        value={val}
        onChange={onchange}
        className="inputtext"
        placeholder={placeholder}
        disabled={disabled}
        style={{borderColor: bordercolor}}
        autoComplete={'false'}
      />
      {!valid && <p style={{fontSize: '12px', position: 'absolute', bottom: '-22px', fontWeight: 500, color: 'red'}}>{invalidMsg}</p>}
      </div>
      {type === "password" ? (
        <span onClick={toggleField}>
          {hiddenPassword ? (
            <FontAwesomeIcon
              icon={`eye-slash`}
              className="icon pass"
              fontSize={"10px"}
            />
          ) : (
            <FontAwesomeIcon icon={`eye`} className="icon pass" />
          )}
        </span>
      ) : null}
    </div>
  );
}

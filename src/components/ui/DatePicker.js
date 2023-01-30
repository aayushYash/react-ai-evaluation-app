import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DatePicker({ value, onChange }) {
  return (
    <div className="flex cursor-pointer mt-3 justify-center -ml-8 py-2 px-1 w-[250px]  items-center space-x-3">
      <FontAwesomeIcon icon="fa-solid fa-calendar" />
      <div className=" relative w-[200px] border h-[30px] border-gray-500 rounded-md">
        <input
          type="date"
          className="w-full px-2"
          style={{ outline: "none" }}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default DatePicker;

import React, { useState } from "react";
import Button from "../ui/Button";

function Model() {
  const [modelShown, setModelShown] = useState(false);
  return (
    <div className="w-full  h-screen">
      <button onClick={() => setModelShown(!modelShown)}>Model</button>
      {modelShown ? (
        <div
          onClick={() => setModelShown(!modelShown)}
          className="absolute w-full   h-full backdrop-blur-2xl bg-gray-300 flex justify-center items-center"
        >
          <div className="  w-[300px]  top-0 left-0 h-[350px] p-5 border  bg-white ">
            <h1 className="">Learning mOdel</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Quisquam, commodi nisi tempore aut sapiente beatae aliquid
              provident voluptatem animi deleniti corporis magni debitis non
              quia, perferendis culpa natus libero recusandae!
            </p>
            <Button text="Confirm" />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Model;

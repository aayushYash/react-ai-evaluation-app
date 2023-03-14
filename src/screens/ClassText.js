import React from "react";

function ClassText({
  testTitle,
  testSubject,
  testDuration,
  testStatus,
  testBtn,
}) {
  return (
    <div className="space-x-3 space-y-3  col-span-1 flex justify-center items-center flex-col w-[200px] h-[200px] border m-2 shadow-lg rounded-md shadow-purple-800">
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-3xl font-light">Class Test</h1>
        <p className=" text-gray-500 text-xs">Sub: Computer Science</p>
        <p className="text-gray-500 text-xs">Duration: 2 hour </p>
      </div>

      <div className="mt-5 flex justify-center items-center flex-col">
        <p className="text-sm text-gray-500 m-2">Started 30 second Ago</p>
        <button className="rounded-lg shadow-lg bg-purple-800 text-white p-2">
          Attempt
        </button>
      </div>
    </div>
  );
}

export default ClassText;

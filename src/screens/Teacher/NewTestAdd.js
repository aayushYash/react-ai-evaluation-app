import React from "react";
import Header from "../../components/general/Header";
import Footer from "../../components/general/Footer";
import Button from "../../components/ui/Button";




function NewTestAdd() {
  return (
    <div>
      <Header />
      <div className="  w-full flex flex-col md:grid grid-cols-4 ">
        <div className=" col-span-1 bg-gray-200 border-r-2 border-gray-600">
          <div className="px-6 flex flex-col border-b border-gray-700 pb-10 items-start space-y-2">
            <div className="relative pt-10 w-full px-2">
              <p className=" rounded-md font-bold  text-xl absolute top-5 -left-0 w-[80px] text-center  ">
                Title
              </p>
              <input
                placeholder="Enter the Test Title "
                className=" w-full  rounded-md outline-none text-xs  border py-3 border-gray-700 px-2"
                type="text"
              />
            </div>

            <div className=" flex justify-center items-center">
              <p className=" bg-white p-2 rounded-md text-xs font-bold">
                Start Time
              </p>
              <p className=" bg-white p-2 rounded-md text-xs font-bold">
                {" "}
                Test Duration
              </p>
            </div>
            <p className=" bg-white p-2 rounded-md text-xs font-bold">
              Live Duration
            </p>
          </div>
          <div className=" p-3 flex border-b pb-10 border-gray-700 justify-center items-center flex-col">
            <p className=" w-full text-xl font-bold ">Description</p>
            <textarea
              className=" w-full rounded-md font-xs p-2"
              cols="30"
              rows="6"
              placeholder="Enter your text here..."
            ></textarea>
          </div>
          <div className=" flex w-[80%] p-3  flex-col">
            <p className=" text-xl font-bold">Rules</p>
            <input
              className=" px-3 py-1 mx-3 my-2 border shadow-md rounded-lg"
              type="text"
            />
            <input
              className=" px-3 py-1 mx-3 my-2 border shadow-md rounded-lg"
              type="text"
            />
            <input
              className=" px-3 py-1 mx-3 my-2 border shadow-md rounded-lg"
              type="text"
            />
            <button className="bg-[#01082D] mx-4 my-2 shadow-lg rounded-md text-white w-[110px]">
              Add New Test
            </button>
          </div>
        </div>

        <div className=" col-span-3 flex-col p-3 flex justify-center items-center ">
          <img
            src="https://media.tenor.com/1t5F4JOye68AAAAC/amogus-sus.gif"
            alt=""
          />
          <Button text="Add Question" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NewTestAdd;

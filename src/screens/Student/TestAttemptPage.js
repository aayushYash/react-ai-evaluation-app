import React, { useState } from "react";
import Header from "../../components/general/Header";
import Footer from "../../components/general/Footer";
import Button from "../../components/ui/Button";

function TestAttemptPage() {
  const [info, setInfo] = useState(false);
  return (
    <div>
      <Header />
      <div className=" grid grid-cols-4 w-full">
        <div
          className={` ${
            info
              ? " md:inline-flex col-span-4 md:col-span-1"
              : "col-span-1 hidden md:inline-flex"
          }
          
            p-2 flex-col  border-gray-800 border-r`}
        >
          <div className=" m-2">
            <h1 className="text-3xl font-bold ">Test Title</h1>
            <p className=" text-xs font-bold text-gray-600">
              Test Started at: xx:xx{" "}
            </p>
            <p>Created at: Aayush yash[903231]</p>
          </div>
          <div className=" mt-5 m-2">
            <h1 className="text-3xl font-bold ">Test Description</h1>
            <p className=" text-xs font-bold text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
              mollitia, voluptatem quos ullam debitis sed, distinctio velit
              laboriosam molestias, quae quod aperiam nulla at. Itaque officia
              esse tempore ducimus doloribus.
            </p>
          </div>
          <div className=" mt-5 m-2 h-[400px]  ">
            <h1 className="text-3xl font-bold ">Test Rules</h1>
            <div>
              <p className=" text-xs font-bold text-gray-600">
                1: Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <p className=" text-xs font-bold text-gray-600">
                2: mollitia, voluptatem quos ullam debitis sed, distinctio
              </p>
              <p className=" text-xs font-bold text-gray-600">
                velit 3: laboriosam molestias, quae quod aperiam nulla at.
                Itaque
              </p>
              <p className=" text-xs font-bold text-gray-600">
                4: esse tempore ducimus doloribus.
              </p>
            </div>
          </div>
          <div className=" p-4  flex justify-between items-center">
            <h1>Time LEFT:: xx: xx</h1>
            <Button text={"Submit"} />
          </div>
        </div>

        <div className={` p-5 col-span-4  md:col-span-3`}>
          <p
            onClick={() => setInfo(!info)}
            className=" text-[#01082D] inline-flex md:hidden  hover:underline"
          >
            {!info ? "View Test Information :-" : "Close Test Information"}
          </p>
          <h1 className="  text-4xl">Questions </h1>
          <div className=" p-4">
            <h1 className=" text-xl font-extrabold">
              Q1: How many Verbs are there in English ? [10marks]
            </h1>
            <textarea
              className=" w-full border-2 mt-2 rounded-lg outline-none border-gray-700 p-2 "
              cols="30"
              rows="4"
              placeholder=" Write your answer here...."
            ></textarea>
          </div>
          <div className=" p-4">
            <h1 className=" text-xl font-extrabold">
              Q2: How many Verbs are there in English ? [10marks]
            </h1>
            <textarea
              className=" w-full border-2 mt-2 rounded-lg outline-none border-gray-700 p-2 "
              cols="30"
              rows="4"
              placeholder=" Write your answer here...."
            ></textarea>
          </div>
          <div className=" p-4">
            <h1 className=" text-xl font-extrabold">
              Q3: How many Verbs are there in English ? [10marks]
            </h1>
            <textarea
              className=" w-full border-2 mt-2 rounded-lg outline-none border-gray-700 p-2 "
              cols="30"
              rows="4"
              placeholder=" Write your answer here...."
            ></textarea>
          </div>
          <div className=" p-4">
            <h1 className=" text-xl font-extrabold">
              Q4: How many Verbs are there in English ? [10marks]
            </h1>
            <textarea
              className=" w-full border-2 mt-2 rounded-lg outline-none border-gray-700 p-2 "
              cols="30"
              rows="4"
              placeholder=" Write your answer here...."
            ></textarea>
          </div>
          <div className=" p-4">
            <h1 className=" text-xl font-extrabold">
              Q5: How many Verbs are there in English ? [10marks]
            </h1>
            <textarea
              className=" w-full border-2 mt-2 rounded-lg outline-none border-gray-700 p-2 "
              cols="30"
              rows="4"
              placeholder=" Write your answer here...."
            ></textarea>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TestAttemptPage;

import React from "react";
import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import Button from "../components/ui/Button";

export default function LandingScreen() {
  return (
    <div className="">
      <Header />
      <div className=" flex justify-center  max-w-[1300px] my-10 bg-white mx-auto items-center flex-col">
        <div className="flex justify-center md:justify-between flex-col md:flex-row  py-10 md:p-10 items-center w-full ">
          <div className="flex justify-center items-center w-full md:w-[50%]">
            <img
              className=""
              width={300}
              height={200}
              src="/images/ai banner.gif"
              alt="ai_image"
            />
          </div>
          <div className="w-full md:w-[50%] flex justify-center  flex-col p-5 space-y-10">
            <h1 className=" text-5xl  font-bold text-purple-800">
              Application Name
            </h1>
            <p className=" text-sm  font-mono text-gray-500  ">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Consequuntur dolorum eius est odit architecto culpa, cupiditate
              dolorem harum ex quibusdam earum impedit iste iure facere quos
              quae, eaque et quam.
            </p>
            <button className="bg-purple-800  w-[120px] text-sm px-1 py-2 flex justify-center items-center shadow-lg rounded-md text-white">
              Explore{" "}
              <img
                className="ml-3"
                width={20}
                height={20}
                src="/images/arrow1.gif"
                alt=".."
              />
            </button>
          </div>
        </div>
        <div className="flex justify-center md:justify-between flex-col md:flex-row   items-center w-full ">
          <div className="w-full md:w-[60%] flex justify-center  flex-col  py-10 md:p-10 space-y-10">
            <h1 className=" text-5xl px-4 font-bold text-purple-800">
              Application Name
            </h1>
            <p className=" text-gray-500 text-sm font-mono px-4 ">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Consequuntur dolorum eius est odit architecto culpa, cupiditate
              dolorem harum ex quibusdam earum impedit iste iure facere quos
              quae, eaque et quam.
            </p>
            <button className="bg-purple-800 ml-4  w-[120px] text-sm px-1 py-2 flex justify-center items-center shadow-lg rounded-md text-white">
              Explore{" "}
              <img
                className="ml-3"
                width={20}
                height={20}
                src="/images/arrow1.gif"
                alt=".."
              />
            </button>
          </div>
          <div className="flex justify-center items-center w-[50%]">
            <img
              className=""
              width={500}
              height={500}
              src="/images/b4.gif"
              alt="ai_image"
            />
          </div>
        </div>
        <div className="flex justify-center  h-full md:justify-between md:flex-row flex-col  py-10 md:p-10 items-center w-full ">
          <div className="flex justify-center items-center w-full md:w-[50%]">
            <img
              className=""
              width={400}
              height={200}
              src="/images/b1.gif"
              alt="ai_image"
            />
          </div>
          <div className=" md:w-[50%] flex justify-center flex-col p-5 space-y-10">
            <h1 className=" text-5xl font-bold text-purple-800">
              Application Name
            </h1>
            <p className=" text-sm font-mono text-gray-500 ">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Consequuntur dolorum eius est odit architecto culpa, cupiditate
              dolorem harum ex quibusdam earum impedit iste iure facere quos
              quae, eaque et quam.
            </p>
            <button className="bg-purple-800  w-[120px] text-sm px-1 py-2 flex justify-center items-center shadow-lg rounded-md text-white">
              Explore{" "}
              <img
                className="ml-3"
                width={20}
                height={20}
                src="/images/arrow1.gif"
                alt=".."
              />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

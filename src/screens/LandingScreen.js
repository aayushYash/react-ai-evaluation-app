import React from "react";
import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import Button from "../components/ui/Button";

export default function LandingScreen() {
  return (
    <div className="">
      <Header />
      <div className="flex justify-between items-center flex-col md:flex-row">
        <div className="w-full md:w-[50%]">
          <img src="/images/show.png" alt="home_image" />
        </div>
        <div className=" w-full md:w-[50%] p-3 space-y-6">
          <h1 className="p-2 text-5xl font-thin">AI Evaluation</h1>
          <p className=" w-[80%] text-xs font-bold ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            perspiciatis doloremque est pariatur itaque ullam optio culpa
            consectetur qui sunt! Molestias earum perferendis sint sit tempora
            consectetur. Eius, suscipit tenetur.
          </p>
          <div className="mt-2 flex justify-start items-center">
            <Button text="Explore" />
            <img className="w-8 " src="/images/arrow.gif" alt="" />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center flex-col md:flex-row">
        <div className="w-full md:w-[50%]">
          <img src="/images/show.png" alt="home_image" />
        </div>
        <div className=" w-full md:w-[50%] p-3 space-y-6">
          <h1 className="p-2 text-5xl font-thin">AI Evaluation</h1>
          <p className=" w-[80%] text-xs font-bold md:text-left text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            perspiciatis doloremque est pariatur itaque ullam optio culpa
            consectetur qui sunt! Molestias earum perferendis sint sit tempora
            consectetur. Eius, suscipit tenetur.
          </p>
          <div className="mt-2 flex justify-start items-center">
            <Button text="Explore" />
            <img className="w-8 " src="/images/arrow.gif" alt="" />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center flex-col md:flex-row">
        <div className="w-full md:w-[50%]">
          <img src="/images/show.png" alt="home_image" />
        </div>
        <div className=" w-full md:w-[50%] p-3 space-y-6">
          <h1 className="p-2 text-5xl font-thin">AI Evaluation</h1>
          <p className=" w-[80%] text-xs font-bold md:text-left text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            perspiciatis doloremque est pariatur itaque ullam optio culpa
            consectetur qui sunt! Molestias earum perferendis sint sit tempora
            consectetur. Eius, suscipit tenetur.
          </p>
          <div className="mt-2 flex justify-start items-center">
            <Button text="Explore" />
            <img className="w-8 " src="/images/arrow.gif" alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

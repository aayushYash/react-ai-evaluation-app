import React from "react";
import Footer from "../components/general/Footer";
import Header from "../components/general/Header";

export default function LandingScreen() {
  return (
    <div className=" md:h-[200vh] h-[350vh] bg-[#01082D]">
      <Header />
      <div className=" h-full bg-[#01082D]">
        <div className=" relative w-full h-[400px] ">
          <img
            className="h-full absolute top-0 shadow-md opacity-80 w-full"
            src="https://wallpapercave.com/wp/wp3205378.jpg"
            alt=""
          />
          <div className=" relative p-10 flex justify-around md:flex-row flex-col  items-center">
            <img
              className="md:w-[300px] w-[200px]  object-contain"
              src="https://www.pngall.com/wp-content/uploads/2018/03/Robot-Download-PNG.png"
              alt=""
            />
            <div className="w-[100%] md:w-[50%]">
              <h1 className=" text-green-500   font-bold text-6xl drop-shadow-lg font-sans">
                InteliTest{" "}
                <span className=" text-blue-500 font-thin">
                  {" "}
                  AI Powered Answer Script Evaluator.
                </span>
              </h1>
              <p className=" text-lg font-light font-mono text-gray-300 w-[80%]">
                Let's Revolutionize the answer check technique from the AI based
                Application{" "}
              </p>
            </div>
          </div>

          <hr className=" border-t w-[90%] border-spacing-1 mx-auto" />

          <div className=" w-[90%] mx-auto h-[300px] md:h-[150px] flex justify-between p-10 flex-col md:flex-row items-center ">
            <h1 className=" text-2xl flex flex-col  font-thin text-blue-500">
              <span className=" text-4xl">FrameWork</span>
            </h1>
            <FramesCard
              frameImage={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
              }
              frameTitle={"REACT JS"}
            />
            <FramesCard
              frameImage={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png"
              }
              frameTitle={"Python"}
            />
            <FramesCard
              frameImage={
                "https://symbols.getvecta.com/stencil_28/14_cache-redis-product-icon.a30451cffb.svg"
              }
              frameTitle={"Redis"}
            />
            <FramesCard frameImage={"images/AWS.png"} frameTitle={"AWS"} />
          </div>
          <hr className=" border-t w-[90%] border-spacing-1 mx-auto" />

          <div className=" w-full  md:h-[500px] p-10 flex md:flex-row flex-col mt-10 justify-around items-center">
            <img
              className="  md:h-[60%] w-[90%] md:w-[30%] rounded-lg"
              src="https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2019/03/14/Pictures/answer-sheet-checking-for-up-board-exam_39be230e-45fb-11e9-97eb-07d4212b7ebd.jpg"
              alt=""
            />
            <div className=" p-5 w-[90%] md:w-[50%] flex flex-col space-y-4 justify-center items-center">
              <h1 className=" text-3xl font-mono text-white">
                Transform Your Business With{" "}
                <span className=" text-blue-500 font-bold"> AI Technology</span>
              </h1>
              <div className=" flex justify-between items-center">
                <div className=" space-y-6">
                  <p className=" text-gray-400 text-sm font-mono">
                    Let's Change the old way of Manual Checking of the Answer
                    Sheet Instead we can use{" "}
                    <span className=" text-blue-500 font-bold">
                      Weffe Artificial Intelligence
                    </span>{" "}
                    for that. It will definately reduce the{" "}
                    <span className="  font-bold">
                      Labour cost, Time, Money and Many More.{" "}
                    </span>
                  </p>
                  <button className=" bg-blue-500 text-white p-2 rounded-lg">
                    Explore More
                  </button>
                </div>

                <img
                  className="hidden md:inline-flex w-[200px] m-4 rounded-lg shadow-sm shadow-white"
                  src="https://media.springernature.com/w580h326/nature-cms/uploads/collections/AI_HERO-58306268c6f4b659459f5b7b2dd3e8a5.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="  h-full w-full p-10 bg-[#01082D] ">
            <div className="flex justify-center items-center space-y-4 flex-col">
              <h1 className="text-4xl font-thin text-white ">
                Search More About Us
              </h1>
              <div className=" flex justify-center items-center flex-col md:grid grid-cols-4  ">
                <CardDetails
                  cardTitle={"Easy Integration"}
                  cardDes={
                    "It is very easy for the teacher to Evalute the answer based on the Answer Script."
                  }
                  imgSrc={"images/book.gif"}
                />
                <CardDetails
                  cardTitle={"Better Reliability"}
                  cardDes={
                    "It is very easy for the teacher to Evalute the answer based on the Answer Script"
                  }
                  imgSrc={"images/birth.gif"}
                />
                <CardDetails
                  cardTitle={"New Technology"}
                  cardDes={
                    "It is very easy for the teacher to Evalute the answer based on the Answer Script"
                  }
                  imgSrc={"images/notif.gif"}
                />
                <CardDetails
                  cardTitle={"100% Secure"}
                  cardDes={
                    "It is very easy for the teacher to Evalute the answer based on the Answer Script"
                  }
                  imgSrc={"images/user1.gif"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function CardDetails({ cardTitle, cardDes, imgSrc }) {
  return (
    <div className=" col-span-1  m-3 hover:scale-105  duration-300 bg-gradient-to-t from-[#CE9FFC] to-[#7367F0] rounded-lg shadow-lg shadow-blue-500 space-y-3 h-[200px] w-[200px] md:h-[300px] md:w-[300px] p-3 md:p-10">
      <div className=" w-[50px] h-[50px] rounded-full p-2 bg-white">
        <img src={imgSrc} className="  " alt="" />
      </div>
      <h1 className=" text-white text-lg md:text-2xl font-bold">{cardTitle}</h1>

      <p className=" md:text-sm text-xs text-white">{cardDes}</p>
    </div>
  );
}

function FramesCard({ frameTitle, frameImage }) {
  return (
    <div className=" flex justify-center uppercase duration-300 cursor-pointer hover:opacity-100 opacity-50 items-center">
      <img className=" w-[30px]" src={frameImage} alt="" />
      <p className=" font-bold text-white text-2xl">{frameTitle}</p>
    </div>
  );
}

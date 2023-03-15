import React, { useState } from "react";
import Header from "../../components/general/Header";
import Footer from "../../components/general/Footer";

function TeacherDashboard() {

  const [question,setQuestion] = useState([]);


  return (
    <div className=" bg-white">
      <Header />
      <div className=" max-w-screen-xl mx-auto my-10 ">
        <div className=" flex items-center ">
          <h1 className=" text-5xl p-4 font-thin">Hey, Ranjit Singh</h1>
        </div>

        <div className=" md:h-[200px] border md:flex-row flex-col border-red-700 flex p-3 items-center">
          <div className="text-white mx-2 flex flex-col rounded-md shadow-lg justify-center items-center h-[160px] bg-[#01082D] w-[160px]">
            <h1 className=" text-[50px]"> + </h1>
            <p>Add New Text</p>
          </div>
          <div className="text-white hidden  md:flex flex-col rounded-md shadow-lg justify-center items-center h-[140px] bg-gray-500 mx-5 w-[2px]"></div>
          <div className=" mx-3 my-2 md:my-1 ">
            <h1 className=" text-2xl font-thin text-[#01082D]">Ongoing Test</h1>
            <div className=" scrollbar-hide mt-3 overflow-x-scroll md:w-[1000px] w-[400px]  flex space-x-2 ">
              <div className="md:w-[2000px]   flex space-x-2 items-center">
                <OnGoingTest
                  testTime={"50 sec ago"}
                  testButton={"Attempt"}
                  testType={"Class Test"}
                  testSubject={"Comp Sci."}
                />
                <OnGoingTest
                  testTime={"50 sec ago"}
                  testButton={"Attempt"}
                  testType={"Class Test"}
                  testSubject={"Comp Sci."}
                />
                <OnGoingTest
                  testTime={"50 sec ago"}
                  testButton={"Attempt"}
                  testType={"Class Test"}
                  testSubject={"Comp Sci."}
                />
                <OnGoingTest
                  testTime={"50 sec ago"}
                  testButton={"Attempt"}
                  testType={"Class Test"}
                  testSubject={"Comp Sci."}
                />
                <OnGoingTest
                  testTime={"50 sec ago"}
                  testButton={"Attempt"}
                  testType={"Class Test"}
                  testSubject={"Comp Sci."}
                />
                <OnGoingTest
                  testTime={"50 sec ago"}
                  testButton={"Attempt"}
                  testType={"Class Test"}
                  testSubject={"Comp Sci."}
                />
                <OnGoingTest
                  testTime={"50 sec ago"}
                  testButton={"Attempt"}
                  testType={"Class Test"}
                  testSubject={"Comp Sci."}
                />
                <OnGoingTest
                  testTime={"50 sec ago"}
                  testButton={"Attempt"}
                  testType={"Class Test"}
                  testSubject={"Comp Sci."}
                />
                <OnGoingTest
                  testTime={"50 sec ago"}
                  testButton={"Attempt"}
                  testType={"Class Test"}
                  testSubject={"Comp Sci."}
                />
              </div>
            </div>
          </div>
        </div>
        <div className=" flex-col flex p-3 mt-4 border border-red-700 md:h-[400px]">
          <div className=" flex  justify-between items-center">
            <h1 className=" font-thin text-3xl">Previous Tests</h1>
            <p className=" text-[#01082D] text-xl p-2 font-mono">Filter </p>
          </div>
          <div className=" flex-1 p-2 border flex flex-wrap ">
            <OnGoingTest
              testTime={"2 day ago"}
              testButton={"Check"}
              testType={"Class Test"}
              testSubject={"Comp Sci."}
            />
            <OnGoingTest
              testTime={"2 day ago"}
              testButton={"Check"}
              testType={"Class Test"}
              testSubject={"Comp Sci."}
            />
            <OnGoingTest
              testTime={"2 day ago"}
              testButton={"Check"}
              testType={"Class Test"}
              testSubject={"Comp Sci."}
            />
            <OnGoingTest
              testTime={"2 day ago"}
              testButton={"Check"}
              testType={"Class Test"}
              testSubject={"Comp Sci."}
            />{" "}
            <OnGoingTest
              testTime={"2 day ago"}
              testButton={"Check"}
              testType={"Class Test"}
              testSubject={"Comp Sci."}
            />
            <OnGoingTest
              testTime={"2 day ago"}
              testButton={"Check"}
              testType={"Class Test"}
              testSubject={"Comp Sci."}
            />{" "}
            <OnGoingTest
              testTime={"2 day ago"}
              testButton={"Check"}
              testType={"Class Test"}
              testSubject={"Comp Sci."}
            />{" "}
            <OnGoingTest
              testTime={"2 day ago"}
              testButton={"Check"}
              testType={"Class Test"}
              testSubject={"Comp Sci."}
            />{" "}
            <OnGoingTest
              testTime={"2 day ago"}
              testButton={"Check"}
              testType={"Class Test"}
              testSubject={"Comp Sci."}
            />{" "}
            <OnGoingTest
              testTime={"2 day ago"}
              testButton={"Check"}
              testType={"Class Test"}
              testSubject={"Comp Sci."}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TeacherDashboard;

function OnGoingTest({ testType, testSubject, testButton, testTime }) {
  return (
    <div className=" h-[140px] m-2 flex-col flex justify-center items-center w-[135px] shadow-lg rounded-md border">
      <h1 className=" text-xl">{testType}</h1>
      <p className=" text-[12px]   text-gray-700">{testTime}</p>
      <p className=" font-bold  text-xs">{testSubject}</p>
      <button className=" my-2 bg-[#01082D] text-xs rounded-md text-white p-2">
        {testButton}
      </button>
    </div>
  );
}

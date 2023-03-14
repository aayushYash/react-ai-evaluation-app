import React from "react";
import Header from "../components/general/Header";
import Footer from "../components/general/Footer";
import { PieChart } from "react-minimal-pie-chart";
import ClassText from "./ClassText";

function StudentDashboard() {
  return (
    <div className="w-full h-screen">
      <Header />
      <div className="flex-1  pt-20 ">
        <div className="p-10">
          <h1 className="text-5xl font-thin ">Hello, Subham kumar singh</h1>
          {/* <div className="border w-full h-[300px] border-gray-800 mt-7">
            <h1 className="text-3xl font-bold p-2 -mt-8 ml-2 bg-white w-[100px]">
              Result
            </h1>
            <select className="p-2 ml-5 " name="Test" id="">
              <option value="Test 1">Test 1</option>
              <option value="Test 2">Test 2</option>
              <option value="Test 3">Test 3 </option>
            </select>
            <div className="  w-full flex px-10 justify-between items-center">
              <div>
                <PieChart
                  className="w-[200px]"
                  data={[
                    { title: "One", value: 10, color: "rgb(63, 244, 138)" },
                    { title: "Two", value: 15, color: "rgb(235, 243, 6)" },
                    { title: "Three", value: 20, color: "rgb(255, 0, 68)" },
                  ]}
                />
              </div>

              <div></div>
            </div>
          </div> */}

          <div className=" mt-5">
            <h1 className=" text-3xl font-thin">
              Live Test ----------------------------------------
              <ClassText
                testTitle={"Class T"}
                testSubject={"Computer Science"}
                testDuration={"2 hour"}
                testStatus={"Started 30 sec ago"}
                testBtn={"attempt"}
              />
              <ClassText
                testTitle={"Class T"}
                testSubject={"Computer Science"}
                testDuration={"2 hour"}
                testStatus={"Started 30 sec ago"}
                testBtn={"attempt"}
              />
              <ClassText
                testTitle={"Class T"}
                testSubject={"Computer Science"}
                testDuration={"2 hour"}
                testStatus={"Started 30 sec ago"}
                testBtn={"attempt"}
              />
              <ClassText
                testTitle={"Class T"}
                testSubject={"Computer Science"}
                testDuration={"2 hour"}
                testStatus={"Started 30 sec ago"}
                testBtn={"attempt"}
              />
            </h1>
            <div className="overflow-scroll  scrollbar-hide ">
              <div className="p-5 mt-4 flex w-[3000px] justify-start items-center "></div>
            </div>
          </div>
          <div className=" mt-5">
            <h1 className=" text-3xl font-thin">
              Upcoming Test ----------------------------------------
              <ClassText
                testTitle={"Class T"}
                testSubject={"Computer Science"}
                testDuration={"2 hour"}
                testStatus={"Started 30 sec ago"}
                testBtn={"attempt"}
              />
              <ClassText
                testTitle={"Class T"}
                testSubject={"Computer Science"}
                testDuration={"2 hour"}
                testStatus={"Started 30 sec ago"}
                testBtn={"attempt"}
              />
              <ClassText
                testTitle={"Class T"}
                testSubject={"Computer Science"}
                testDuration={"2 hour"}
                testStatus={"Started 30 sec ago"}
                testBtn={"attempt"}
              />
              <ClassText
                testTitle={"Class T"}
                testSubject={"Computer Science"}
                testDuration={"2 hour"}
                testStatus={"Started 30 sec ago"}
                testBtn={"attempt"}
              />
              <ClassText
                testTitle={"Class T"}
                testSubject={"Computer Science"}
                testDuration={"2 hour"}
                testStatus={"Started 30 sec ago"}
                testBtn={"attempt"}
              />
            </h1>
            <div className="overflow-scroll scrollbar-hide  ">
              <div className="p-5 mt-4 flex w-[3000px] justify-start items-center "></div>
            </div>
          </div>
          <div className=" mt-5">
            <h1 className=" text-3xl font-thin">
              Attempted Test ----------------------------------------
              <ClassText
                testTitle={"Class T"}
                testSubject={"Computer Science"}
                testDuration={"2 hour"}
                testStatus={"Started 30 sec ago"}
                testBtn={"attempt"}
              />
              <ClassText
                testTitle={"Class T"}
                testSubject={"Computer Science"}
                testDuration={"2 hour"}
                testStatus={"Started 30 sec ago"}
                testBtn={"attempt"}
              />
              <ClassText
                testTitle={"Class T"}
                testSubject={"Computer Science"}
                testDuration={"2 hour"}
                testStatus={"Started 30 sec ago"}
                testBtn={"attempt"}
              />
              <ClassText
                testTitle={"Class T"}
                testSubject={"Computer Science"}
                testDuration={"2 hour"}
                testStatus={"Started 30 sec ago"}
                testBtn={"attempt"}
              />
            </h1>
            <div className="overflow-scroll scrollbar-hide  ">
              <div className="p-5 mt-4 flex w-[3000px] justify-start items-center "></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default StudentDashboard;

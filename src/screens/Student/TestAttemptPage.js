import React, { useState, useEffect, useRef, createRef } from "react";
import Header from "../../components/general/Header";
import Footer from "../../components/general/Footer";
import Button from "../../components/ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import {getDoc,doc,updateDoc} from 'firebase/firestore'
import { auth, db } from '../../firebase/firebase'


function TestAttemptPage() {
  const [info, setInfo] = useState(false);
  const navigate =useNavigate();
  const [questionset,setQuestionset] = useState([])
  const [answerset,setAnswerset] = useState([])

  const {testid,userid} = useParams()
  

  function onAnswerChange(e) {
    setAnswerset((prev) => {
      prev.forEach(ans => {
         if(e.target.id == Object.keys(ans)[0]){
          ans[e.target.id] = e.target.value
         }
      })
      return prev

    })
  }

  async function submitHandler() {
    for(var ans in answerset){
      const qId = Object.keys(answerset[ans])[0]
      const qVal = Object.values(answerset[ans])[0]

      try{const docRef = doc(db,'tests',testid,userid,qId)
      await updateDoc(docRef,{
        ans: qVal
      }).then((resp) => console.log(resp))
    }
      catch(e){
        console.log(e)
      }
    }
  }

  useEffect(() => {
    async function FetchDataFromFB(){
      const set = await getDoc(doc(db,'questionset',testid))
      const setObj = set.data()
      for (var question in setObj){
        setQuestionset(prev => [...prev,setObj[question]])
        let ans={}
        ans[question] = ''
        setAnswerset(prev => [...prev,ans])
      }
    
    }
    FetchDataFromFB()
    
  }, [])

  



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
            
            <Button text={"Exit"} onclick={ () => navigate(-1)}/>
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
          {/* <div className=" p-4">
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
          </div> */}
          {questionset.map((question,i) => {
            console.log(answerset[i],question,"map func")
          return <QuestionAnswer question={question} answerset={answerset[i]} key={i} changeHandler={onAnswerChange} id={i} />})}
          <div style={{display: 'flex'}}>
          <Button text={"Submit"} onclick={submitHandler}  />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}


const QuestionAnswer = ({question,val,changeHandler,id}) => {
  console.log(question)
  return <div>
    <h1 className=" text-xl font-extrabold">
      {`${question.question} [${question.marks} marks]`}
    </h1>
    <textarea value={val} 
      onChange={changeHandler} 
      className=" w-full border-2 mt-2 rounded-lg outline-none border-gray-700 p-2 "
      cols="30"
      rows="4"
      id={`q${id+1}`}
      placeholder=" Write your answer here...." />
  </div>
}

export default TestAttemptPage;

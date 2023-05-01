import React, { useState, useEffect, useRef, createRef } from "react";
import Header from "../../components/general/Header";
import Footer from "../../components/general/Footer";
import Button from "../../components/ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import {getDoc,doc,updateDoc} from 'firebase/firestore'
import { auth, db } from '../../firebase/firebase';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../Teacher/NewTestAdd.css'
import { FormateDate } from "../../components/util/DateFormater";



function TestAttemptPage() {
  const navigate =useNavigate();
  const [questionset,setQuestionset] = useState([])
  const [answerset,setAnswerset] = useState([])
  const [testDetails,setTestDetails] = useState()

  const [left,setLeft] = useState(false)
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
      const details = await getDoc(doc(db,'testDetails',testid))
      const setObj = set.data()
      for (var question in setObj){
        setQuestionset(prev => [...prev,setObj[question]])
        let ans={}
        ans[question] = ''
        setAnswerset(prev => [...prev,ans])
      }
      setTestDetails(details.data())
      console.log(details.data(),"details")
    
    }
    FetchDataFromFB()
    
  }, [])

  console.log(testDetails,"test details")



  return (
    <div>
      <Header />
      <div className="add-test-body">
      <div className={left ? "add-test-info left" : "add-test-info"}>
          <div
            className="iconOpen"
            onClick={() => setLeft(false)}
            style={{ alignSelf: "flex-end" }}
          >
            Close <FontAwesomeIcon icon={"times-circle"} />{" "}
          </div>
          <div className="basic-info">
            {/* title */}
            <p style={{fontSize: '28px', fontWeight: 'bold'}}>{testDetails?.title}</p>
            {/* course/subject */}
            <p style={{fontSize: '18px', fontWeight: 'bold'}}>Subject/Course: {testDetails?.subject}</p>
            <div className="dates">
              {/* start date */}
              <p>Start At: {FormateDate(new Date(testDetails?.starttime.seconds*1000))}</p>
              {/* end date */}
              <p>End At: {FormateDate(new Date(testDetails?.endtime.seconds*1000))}</p>

            </div>
            <div className="duration">
              
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "280px",
                }}
              >
                {/* test duration */}
                <p>Duration: {testDetails?.duration} Mins</p>
              </div>
            </div>
          </div>
          <fieldset className="description">
            <legend>Description</legend>
            {/* description */}
            <p>{testDetails?.testDescription}</p>
          </fieldset>
          <fieldset className="rules">
            <legend>Rules</legend>
            <div className="scroll" style={{ overflowY: "scroll" }}>
              <div>
                {/* rules */}
                {testDetails?.rules.map((rule,index) => <p key={index}>{index+1}. {rule}</p>)}
              </div>
            </div>
          </fieldset>
        </div>

        <div className={`add-test-section`}>
          
          <h1 className="  text-4xl">Questions </h1>
          <div className="iconOpen" onClick={() => setLeft(true)}>
            Test Information <FontAwesomeIcon icon={"forward"} />
          </div>
          
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

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FetchTestData,FetchUserTestData } from '../../firebase/firestoreFunctions';
import { db } from '../../firebase/firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import "../Teacher/NewTestAdd.css";
import Header from '../../components/general/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../components/ui/Button';


export default function CheckResult() {

    const {testid,userid} = useParams();
    const [testdata,setTestdata] = useState();
    const [userTestdata,setUserTestdata] = useState()
    const [questionAnswers,setQuestionAnswers] = useState([]);
    const [totalMarks,setTotalMarks] = useState(0)
    const [totalObtMarks,setTotalObtMarks] = useState(0)
    const [left, setLeft] = useState(false);
    
    const navigate = useNavigate()
    
   async function FetchQuestionAnswer(){
    const questionset = await getDoc(doc(db,'questionset',testid))
    
    const questionSetData  = questionset.data();
    const keys = Object.keys(questionSetData)
    
    keys.forEach(async key => {
      const question  = questionSetData[key].question
      const marks = questionSetData[key].marks
      const answerset =  await getDoc(doc(db,'tests',testid,userid,key))
      const answerdata  = answerset.data()
      const answer =  answerdata.ans
      const obtMarks = answerdata.marks
      setQuestionAnswers(prev => [...prev,{
        questionId: key,
        question: question,
        marks: marks,
        answer: answer,
        obtMarks: obtMarks
      }])
      setTotalMarks(prev => prev+marks)
      setTotalObtMarks(prev => prev+obtMarks)
      console.log(question,marks,answer,obtMarks)
    })
    console.log(questionSetData)
   }

    useEffect(() => {
       const testdata = FetchTestData(testid)
        testdata.then((data) => setTestdata(data)).catch(e => console.log(e,'catch data'))
        const test = FetchUserTestData(userid,testid);
        test.then(data => console.log(data,"teststttt"))
        FetchQuestionAnswer()
    },[])


    if(!testdata?.evaluationStatus) return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',flexDirection: 'column'}}>

        <p style={{fontSize: '30px', fontWeight: 'bold'}}>Not Evaluated Yet!</p>
        <Button text={'Back'} onclick={() => navigate(-1)} />
      </div>

  return (
    <div className="add-test-screen">
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
            <p>{testdata?.title}</p>
            <p>{testdata?.subject}</p>
            <div className="dates">
              <p>Started At: {}</p>
              <p>Ended At: {}</p>
            </div>
            <div className="duration">
              Duration: {} mins
            </div>
          </div>
          <fieldset className="description">
            <legend>Description</legend>
            <p>{testdata?.description?.length === 0 ? 'No Description' : testdata.description}</p>
          </fieldset>
          <fieldset className="rules">
            <legend>Rules</legend>
            <div className="scroll" style={{ overflowY: "scroll" }}>
              <div>
                {testdata?.rules?.map((rule, index) => (
                  <p key={index}>{rule}</p>
                ))}
              </div>
            </div>
          </fieldset>
        </div>

        <div className="add-test-section scroll">
          <div className="iconOpen" onClick={() => setLeft(true)}>
            Test Information <FontAwesomeIcon icon={"forward"} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              margin: "10px 0",
              borderBottom: "1px solid #000",
              paddingBottom: "3px",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  margin: 0,
                  padding: 0,
                }}
              >
                Evaluated
              </h1>
              <div style={{ minWidth: "150px" }}>
                <div>Total Marks : {totalMarks}</div>
                <div>Total Marks Obtain : {totalObtMarks}</div>
              </div>
            </div>
            
        </div>
            <div style={{overflowY: 'scroll'}}>
              {questionAnswers.map((questionAnswer,index) => {
                return <div key={index}>
                  <p style={{fontWeight: 'bold'}}>{questionAnswer.question}[{questionAnswer.obtMarks}/{questionAnswer.marks}]</p>
                  <p style={{border: '1px solid rgba(0,0,0,0.5)', padding: '2px 3px', borderRadius: '8px', minHeight: '24px'}}>{questionAnswer.answer}</p>
                </div>
              })}
            </div>
            <Button text={'Back'} onclick={() => navigate(-1)} width={'fit-content'} />
      </div>
    </div>
    </div>
  )
}

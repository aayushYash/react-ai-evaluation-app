import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/ui/Button'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebase/firebase'
import axios from "axios";
import Header from '../../components/general/Header'
import { toast, ToastContainer } from 'react-toastify'
import { doc, getDoc } from 'firebase/firestore'
import './EvaluateTest.css'

export default function EvaluateTest() {
    const [user,loading,error] = useAuthState(auth)
    const {testid} = useParams()
    const [optionsForAuth,setOptionsForAuth] = useState()
    const [idToken,setIdToken] = useState('')
    const [authResponse,setAuthResponse] = useState()
    const [evaluateIdToken,setEvaluateIdToken] = useState('')
    const [details,setDetails] = useState();
    const [evaluationStatus,setEvaluationStatus] = useState()
    const navigate = useNavigate()
    

      

    async function FetchEvaluationState() {
      const testDetailDoc = await getDoc(doc(db, 'testDetails', `${testid}`))
      setEvaluationStatus(testDetailDoc.data().evaluationStatus);
    }

    async function FetchTestData() {
      const testDetailDoc = await getDoc(doc(db,'testDetails',`${testid}`))
      const testDetailData = testDetailDoc.data();
      const testTitle = testDetailData.title
      const groupName = await (await getDoc(doc(db,'group',testDetailData.assignedTo))).get('groupName');
      console.log(groupName)
      const groupMember = await (await getDoc(doc(db,'group',testDetailData.assignedTo))).get('groupMember');
      const questionSetDoc = await (await getDoc(doc(db,'questionset',`${testid}`))).data();

      let memberNames =[]
      for(var member in groupMember){
        console.log(groupMember[member])
        const name = await (await getDoc(doc(db,'users',groupMember[member]))).get("profile").name
        memberNames = [...memberNames,name]
      }

      console.log(questionSetDoc);
      let questins = []
      for(var quesion in questionSetDoc){
        questins = [...questins,questionSetDoc[quesion]]
        console.log(questionSetDoc[quesion].question)
      }
      for(var name in memberNames){
        console.log(memberNames[name])
      }
      setDetails(() => {return {
        testTitle:testTitle,
        members: memberNames,
        started: `${new Date(testDetailData.starttime.seconds*1000).getDate()}/${new Date(testDetailData.starttime.seconds*1000).getMonth()+1}/${new Date(testDetailData.starttime.seconds*1000).getFullYear()}   ${new Date(testDetailData.starttime.seconds*1000).getHours().toLocaleString()}:${new Date(testDetailData.starttime.seconds*1000).getMinutes().toLocaleString()}`,
        endedAt: `${new Date(testDetailData.endtime.seconds*1000).getDate()}/${new Date(testDetailData.endtime.seconds*1000).getMonth()+1}/${new Date(testDetailData.endtime.seconds*1000).getFullYear()}   ${new Date(testDetailData.endtime.seconds*1000).getHours().toLocaleString()}:${new Date(testDetailData.endtime.seconds*1000).getMinutes().toLocaleString()}`,
        duration: testDetailData.duration,
        questions: questins
      }})

    }

    async function clickHandler() {

      console.log(optionsForAuth)

      setAuthResponse(() => axios.request(optionsForAuth).then(result => result));
    }

    useEffect(() => {
      console.log(idToken,"token")
      setOptionsForAuth(()=>({
        method: 'POST',
        url: 'http://127.0.0.1:5000/api/v1/auth',
        data: {
          idToken: idToken
        }
      }))
    },[idToken])

    useEffect(() => {
      user?.getIdToken().then(result => setIdToken(result))
      // console.log(idToken,"tokeeeeeeeeeeeen")
      
    },[user])

    useEffect(() => {
      let access_token;
      authResponse?.then(result => {
        // setEvaluateIdToken(result.data.access_token,"result")
        access_token =result.data.access_token
        console.log(access_token,"console...................acceesstoken")
        const optionForEvaluation = {
          method: 'POST',
          url: 'http://127.0.0.1:5000/api/v1/evaluate',
          headers: {
            Authorization: `Bearer ${access_token}`
          },
          data: {testid: testid}
        }

        axios.request(optionForEvaluation).then(function (response) {
          toast.success("Evaluation Completed")
          FetchEvaluationState()
          console.log(response.data);
        }).catch(function (error) {
          console.error(error);
        });
        
      }).catch(e => toast.error(e.message))

    }, [authResponse])

    useEffect(() => {
      FetchEvaluationState()
      FetchTestData()
    },[])



    console.log(evaluationStatus,"evaluation Status line 104")
    console.log(details?.started,'detaisllllllllllls')

  return (
    <div className='test-evaluate-screen'>
      <ToastContainer />
      <Header />
        <div className='test-evaluate-body'>
          <div className='test-evaluate-section'>
            <div className='test-details'>
              <h1 className='test-heading'>{details?.testTitle}</h1>
              <h3 className='test-subheading'>{testid}</h3>
              <h3>{`Started At: ${details?.started}`}</h3>
              <h3>{`Ended At: ${details?.endedAt}`}</h3>
              <h3>{evaluationStatus ? 'Already Evaluated' : 'To be Evaluated'}</h3>
              
              <fieldset className='tests'>
                <legend className='assignedTo'>Test Assigned To</legend>
                {details ? details?.members.map((member,index) => <div key={index} className="assigned">
                  {member}
                </div>) : null}
              </fieldset>
              <fieldset className='tests'>
                <legend className=' assignedTo'>Questions</legend>
                {details ? details?.questions.map((quesion,index) => <div key={index} className="question">
                  <div>{quesion.question}</div>
                  <div>[{quesion.marks}]</div>
                </div>) : null}
              </fieldset>
            </div>
            <div style={{display: 'flex'}}>
              {evaluationStatus ? null : <Button onclick={clickHandler} text={'Evaluate'} />}
              <Button text={'back'} onclick={() => navigate(-1)} />
            </div>
          </div>
        </div>
    </div>
  )
}

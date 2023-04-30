import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/ui/Button'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebase/firebase'
import axios from "axios";
import Header from '../../components/general/Header'
import { toast, ToastContainer } from 'react-toastify'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import './EvaluateTest.css'

export default function EvaluateTest() {
    const [user,loading,error] = useAuthState(auth)
    const {testid} = useParams()
    const [optionsForAuth,setOptionsForAuth] = useState()
    const [idToken,setIdToken] = useState('')
    const [authResponse,setAuthResponse] = useState()
    const [details,setDetails] = useState();
    const [evaluationStatus,setEvaluationStatus] = useState()
    const navigate = useNavigate()
    const [members,setMembers] = useState([])
    


    async function FetchTestData() {
      const testDetailDoc = await getDoc(doc(db,'testDetails',`${testid}`))
      const testDetailData = testDetailDoc.data();
      const testTitle = testDetailData.title
      // const groupName = await (await getDoc(doc(db,'group',testDetailData.assignedTo))).get('groupName');
      // console.log(groupName)
      // const groupMember = await (await getDoc(doc(db,'group',testDetailData.assignedTo))).get('groupMember');


      const groupsRef = query(collection(db,'group'),where('tests', 'array-contains', testid))

      const groupDocRef = await getDocs(groupsRef)
      console.log(groupDocRef.size)
      
      groupDocRef.forEach(groupDoc => {
        groupDoc.data().groupMember.forEach(async member => {
          const memberData = (await getDoc(doc(db,'users',member))).data()
          const memberarray = members
          const newData = {
            id: member,
            name: memberData.profile.name,
          }
          if(!members.includes(newData)){
            setMembers(prev => [...prev,newData])
          }
        })
      })

      const questionSetDoc = (await getDoc(doc(db,'questionset',`${testid}`)));

      let questins = []
      for(var quesion in questionSetDoc.data()){
        console.log(quesion,"for loop")
        questins = [...questins,questionSetDoc.data()[quesion]]
      }
      console.log(questins)
      setDetails(() => {return {
        testTitle:testTitle,
        started: `${new Date(testDetailData.starttime.seconds*1000).getDate()}/${new Date(testDetailData.starttime.seconds*1000).getMonth()+1}/${new Date(testDetailData.starttime.seconds*1000).getFullYear()}   ${new Date(testDetailData.starttime.seconds*1000).getHours().toLocaleString()}:${new Date(testDetailData.starttime.seconds*1000).getMinutes().toLocaleString()}`,
        endedAt: `${new Date(testDetailData.endtime.seconds*1000).getDate()}/${new Date(testDetailData.endtime.seconds*1000).getMonth()+1}/${new Date(testDetailData.endtime.seconds*1000).getFullYear()}   ${new Date(testDetailData.endtime.seconds*1000).getHours().toLocaleString()}:${new Date(testDetailData.endtime.seconds*1000).getMinutes().toLocaleString()}`,
        duration: testDetailData.duration,
        questions: questins
      }})
      setEvaluationStatus(testDetailDoc.data().evaluationStatus);

    }

    async function clickHandler() {

      console.log(optionsForAuth)

      setAuthResponse(() => axios.request(optionsForAuth).then(result => result));
    }

    useEffect(() => {
      console.log(idToken,"token")
      setOptionsForAuth(()=>({
        method: 'POST',
        url: 'http://3.109.152.176:80/api/v1/auth',
        data: {
          idToken: idToken
        }
      }))
    },[idToken])

    useEffect(() => {
      user?.getIdToken().then(result => setIdToken(result))
      
    },[user])

    useEffect(() => {
      let access_token;
      authResponse?.then(result => {
        access_token =result.data.access_token
        const optionForEvaluation = {
          method: 'POST',
          url: 'http://3.109.152.176:80/api/v1/evaluate',
          headers: {
            Authorization: `Bearer ${access_token}`
          },
          data: {testid: testid}
        }

        const options = {
          method: 'DELETE',
          url: 'http://3.109.152.176/api/v1/logout',
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        };

        
        

        axios.request(optionForEvaluation).then(function (response) {
          toast.success("Evaluation Completed")
          FetchTestData()
          console.log(response.data);
        }).catch(function (error) {
          console.error(error);
        });

        axios.request(options).then(function (response) {
          console.log(response.data);
        }).catch(function (error) {
          console.error(error);
        });
        
      }).catch(e => toast.error(e.message))

      

    }, [authResponse])

    useEffect(() => {
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
                {members.length > 0 ? members.map((member,index) => <div key={index} className="assigned">
                  {member.name}
                </div>) : <p>No Users</p>}
              </fieldset>
              <fieldset className='tests'>
                <legend className=' assignedTo'>Questions</legend>
                {details ? details?.questions?.map((quesion,index) => <div key={index} className="question">
                  <div>{quesion?.question}</div>
                  <div>[{quesion?.marks}]</div>
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

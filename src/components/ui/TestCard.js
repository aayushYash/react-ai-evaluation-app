import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import './TestCard.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function TestCard({test}) {

    const [userData,setUserData] = useState()

    const [buttonTest,setButtonTest] = useState('')

    const navigate = useNavigate();
    const [user,loading,error] = useAuthState(auth)

    function clickHandle() {
        if(test?.status === 'live'){
            if(userData?.usertype==='Student')
            {
                navigate(`/${user.uid}/test/${test.id}`, {replace: false})
            }
            if(userData?.usertype==='Teacher'){
                navigate(`/${user.uid}/test/${test.id}`)
            }
        }
        if(test?.status === 'past'){
            if(userData?.usertype==='Student')
            {
                navigate(`/${user.uid}/test/${test.id}`, {replace: false})
            }
            if(userData?.usertype==='Teacher'){
                navigate(`/${user.uid}/evaluatetest/${test.id}`)
            }
        }
        if(test?.status === 'upcoming'){
            setButtonTest('Explore')
        }
    }

    useEffect(() => {
        async function ReadUserData() {
            if(user){
                const userdata = await (await getDoc(doc(db,'users',user?.uid)))
                setUserData(() => userdata.data().profile )
            }
        }
        ReadUserData()
    },[user])
    
    useEffect(() => {
        console.log(userData,"test card user data")
        if(test?.status === 'live'){
            if(userData?.usertype==='Student'){
                setButtonTest('Attempt')
            }
            if(userData?.usertype==='Teacher'){
                setButtonTest('Update')
            }
        }
        if(test?.status === 'past'){
            if(userData?.usertype==='Student'){
                setButtonTest('Check Result')
            }
            if(userData?.usertype==='Teacher'){
                setButtonTest('Evaluate')
            }
        }
        if(test?.status === 'upcoming'){
            if(userData?.usertype==='Student'){
                setButtonTest('Explore')
            }
            if(userData?.usertype==='Teacher'){
                setButtonTest('Edit')
            }
        }

    }, [userData])

  return (
    <div className='card-container'>
        <h2 className='test-title'>{test?.title}</h2>
        <h4 className='test-subtitle'>{test?.subject}</h4>
        <h4 className='test-created-by'>Created By: {test?.createdBy}</h4>
        <h2 className='test-duration'>{`Duration: ${test?.duration} minutes`}</h2>
        <h5 className='test-status'>{test?.statusText}</h5>
        <Button text={buttonTest} onclick={clickHandle} />
    </div>
  )
}

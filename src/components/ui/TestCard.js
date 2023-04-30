import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import './TestCard.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function TestCard({userid,usertype,test}) {

    const [userData,setUserData] = useState()

    const [buttonTest,setButtonTest] = useState('')

    const navigate = useNavigate();

    function clickHandle() {
        if(test?.status === 'live'){
            if(usertype==='Student')
            {   
                navigate(`/${userid}/${usertype}/test/${test.id}`, {replace: false})
            }
            if(usertype==='Teacher'){
                navigate(`/${userid}/${usertype}/editTest/${test.id}`)
            
            }
        }
        if(test?.status === 'past'){
            if(usertype==='Student')
            {
                navigate(`/${userid}/${usertype}/checkresult/${test.id}`, {replace: false})
            }
            if(usertype==='Teacher'){
                navigate(`/${userid}/${usertype}/evaluatetest/${test.id}`)
            }
        }
        if(test?.status === 'upcoming'){
            if(usertype==='Teacher'){
                navigate(`/${userid}/${usertype}/editTest/${test.id}`)
            
            }
        }
        
    }

    const createdDate = new Date(test?.createtime?.seconds*1000);
    
    useEffect(() => {
        async function ReadUserData() {
            const userdata = await getDoc(doc(db, 'users', userid))
            setUserData(() => userdata.data().profile )
        
        }
        ReadUserData()
        if(test?.status === 'live'){
            if(usertype==='Student'){
                setButtonTest('Attempt')
            }
            if(usertype==='Teacher'){
                setButtonTest('Update')
            }
        }
        if(test?.status === 'past'){
            if(usertype==='Student'){
                setButtonTest('Check Result')
            }
            if(usertype==='Teacher'){
                setButtonTest('Evaluate')
            }
        }
        if(test?.status === 'upcoming'){
            if(usertype==='Student'){
                setButtonTest('Explore')
            }
            if(usertype==='Teacher'){
                setButtonTest('Edit')
            }
        }

    }, [])



  return (
    <div className='card-container'>
        <h2 className='test-title'>{test?.title}</h2>
        <h2 style={{fontSize:'10px'}}>{test?.id}</h2>
        <h4 className='test-subtitle'>{test?.subject}</h4>
        <h4 className='test-created-by'>Created By: {test?.createdBy}</h4>
        <h4 className='test-created-by'>Created At: {createdDate.getDate()}/{createdDate.getMonth() +1}/{createdDate.getFullYear()}</h4>
        <h2 className='test-duration'>{`Duration: ${test?.duration} minutes`}</h2>
        <h5 className='test-status'>{test?.statusText}</h5>
        <Button text={buttonTest} onclick={clickHandle} />
    </div>
  )
}

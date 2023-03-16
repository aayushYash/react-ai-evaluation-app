import React, {useState, useEffect} from 'react'
import Button from './Button';
import './TestCard.css'

export default function TestCard({test}) {

    const [buttonTest,setButtonTest] = useState('')

    useEffect(() => {
        console.log(test.status,"test card")
        if(test.status === 'live'){
            setButtonTest('Attempt')
        }
        if(test.status === 'past'){
            setButtonTest('Check Result')
        }
        if(test.status === 'upcoming'){
            setButtonTest('Explore')
        }
    }, [])

  return (
    <div className='card-container'>
        <h2 className='test-title'>{test.title}</h2>
        <h4 className='test-subtitle'>{test.subject}</h4>
        <h4 className='test-created-by'>Created By: {test.createdBy}</h4>
        <h2 className='test-duration'>{`Duration: ${test.duration} minutes`}</h2>
        <h5 className='test-status'>{test.statusText}</h5>
        <Button text={buttonTest} onclick={null} />
    </div>
  )
}

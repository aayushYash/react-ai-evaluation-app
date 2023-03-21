import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/ui/Button'

export default function TestSubmitted() {

    const {userid, testid, usertype} = useParams();
    const navigate = useNavigate();
    function backToDashboard() {
        navigate(`${userid}/${usertype}/Dashboard`)
    }


  return (
    <div>
        <div>
            <h1>{}</h1>
            <h3>{}</h3>
            <h4>{}</h4>
        </div>
        <div>
            <p>
                Your response for the {} test has been successfully submitted.
            </p>
            <Button text='Go Back To Dashboard' onclick={backToDashboard} />
        </div>
    </div>
  )
}

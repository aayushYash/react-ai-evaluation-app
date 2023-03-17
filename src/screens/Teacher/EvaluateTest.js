import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../components/ui/Button'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase/firebase'
import axios from "axios";

export default function EvaluateTest() {
    const [user,loading,error] = useAuthState(auth)
    const {testid} = useParams()
    const [optionsForAuth,setOptionsForAuth] = useState()
    // const [optionForEvaluation,setOptionForEvaluation] = useState()
    const [idToken,setIdToken] = useState('')
    const [authResponse,setAuthResponse] = useState()
    const [evaluateIdToken,setEvaluateIdToken] = useState('')

    

    

    // const optionsForEvaluate = {
    //   method: 'POST',
    //   url: 'http://127.0.0.1:5000/api/v1/evaluate',
    //   headers: {
    //     Authorization: `Bearer ${user.getIdToken()}`
    //   },
    //   data: {testid: 'PczMwm2P78Hi85gQzER8'}
    // };
    
    // axios.request(optionsForEvaluate).then(function (response) {
    //   console.log(response.data);
    // }).catch(function (error) {
    //   console.error(error);
    // });
  
    // user.getIdToken().then(result => console.log(result))   

    async function clickHandler() {

      console.log(optionsForAuth)

      setAuthResponse(async () => await axios.request(optionsForAuth));
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
          console.log(response.data);
        }).catch(function (error) {
          console.error(error);
        });
        
      })

    }, [authResponse])

    

  return (
    <div>
        <Button onclick={clickHandler} text="Evaluate" />
    </div>
  )
}

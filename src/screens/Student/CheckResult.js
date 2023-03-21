import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FetchTestData,FetchUserTestData } from '../../firebase/firestoreFunctions';

export default function CheckResult() {

    const {testid,userid} = useParams();
    const [testdata,setTestdata] = useState();
    const [userTestdata,setUserTestdata] = useState()

    useEffect(() => {
       const testdata = FetchTestData(testid)
        testdata.then((data) => setTestdata(data)).catch(e => console.log(e,'catch data'))
        const test = FetchUserTestData(userid,testid);
        test.then(data => console.log(data))
    },[])

  return (
    <div>{testdata?.title}</div>
  )
}

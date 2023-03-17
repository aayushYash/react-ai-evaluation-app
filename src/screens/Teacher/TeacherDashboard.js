import React, { useEffect, useState } from "react";
import Header from "../../components/general/Header";
import Footer from "../../components/general/Footer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/firebase";
import TestCard from "../../components/ui/TestCard";
import { doc, getDoc } from "firebase/firestore";
import '../Student/StudentDashboard.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TeacherDashboard() {

  const [question,setQuestion] = useState([]);
  const [user,loading,error] = useAuthState(auth)
  
  const [liveTests,setLiveTests] = useState([])
  const [pastTests,setPastTests] = useState([]);
  const [upcomingTests,setUpcomingTests] = useState([]);
  const [tests,setTests] = useState([])
  const [userDataSnap,setUserDataSnap] = useState()

  function TimeFormatter(time1,time2) {
    const distance = time1 - time2
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    const min =  Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const hr = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const day = Math.floor(distance / (1000 * 60 * 60 * 24));
    const time =  {
        days: (day === 0) ? '' : `${day}d`,
        hour:(day===0 && hr ===0) ? '':`${hr}h`,
        min: (day === 0 && hr ===0 && min ===0) ? '' : `${min}m`,
        sec:`${seconds}s`
        
    }

    return `${time.days} ${time.hour} ${time.min} ${time.sec}`.trim();
}


  useEffect(() => {
    tests.forEach(async(test) => {
      console.log(test,"checkkkkkkkkkkkkkkk testttttttttttttttt")
        const testDetail = await getDoc(doc(db,'testDetails',test))
        const starttime = new Date(testDetail.data().starttime.seconds*1000);
        const endtime = new Date(testDetail.data().endtime.seconds*1000)
        const currenttime = Date.now();

        console.log(testDetail.data().createdBy,"detailllllllllllllllllllllllllll")

        const createdBy = await getDoc(doc(db,'users',testDetail.data().createdBy))
        const groupId  = await getDoc(doc(db,'group',testDetail.data().assignedTo))


        var status,statusText;

        if(starttime < currenttime && currenttime < endtime){
            const time = TimeFormatter(currenttime,starttime)
            status = 'live'
            // if(userDataSnap.tests.filter(test => test.testid === testDetail.id)[0].attempted){
            //     status = 'past'
            // }
            statusText = `Started ${time} ago`
        }
        if(currenttime < starttime){
            const time = TimeFormatter(starttime,currenttime)
            status = 'upcoming'
            statusText = `Will Start in ${time}`

        }
        if(currenttime > endtime){
            const time = TimeFormatter(currenttime,endtime)
            status = 'past'
            statusText = `Ended ${time} ago`
        }
        
        const data = {
            id: testDetail.id,
            title : testDetail.data().title,
            createdBy : createdBy.data().profile.name,
            identifier: groupId.data().groupName,
            duration: testDetail.data().duration,
            status: status,
            statusText: statusText
        }



        console.log(data,"daaaaaaaaaaaaataaaaaaaaaaaaaaaaaaaaaaaa")

        if(status === 'live' && !data.attempted){
            setLiveTests((prev) => {
                const arr = prev.filter((d) => d.id !== data.id)
                return [...arr,data]
            } )
        }
        if(status === 'past'){
            setPastTests((prev) => {
                const arr = prev.filter((d) => d.id !== data.id)
                return [...arr,data]
            })
        }
        if(status === 'upcoming'){
            setUpcomingTests((prev) => {
                const arr = prev.filter((d) => d.id !== data.id)
                return [...arr,data]
            })
        }
    })
}, [tests])
  

  useEffect(() => {
        
    async function FetchData(){
        console.log(user?.uid,'fetch')
        if(!user) return
        const docSnap = await getDoc(doc(db,'users',user?.uid))
        console.log(docSnap.data().tests)
        setTests(() => docSnap?.data().tests)
        setUserDataSnap(docSnap?.data())
    }
    FetchData()
}, [user])


  return (
    <div className="StudentDashboardScreen">
      <Header />
      <div className="StudentDashboardBody">
        <div className="greeting-msg">
          <p>{`Hi, ${user?.displayName}`}</p>
        </div>
        <div className="test-create-ongoing-container">
          <div className="test-create-container">
            <div className="test-create"><FontAwesomeIcon
              icon={"add"}
              fontSize={"40px"}
              color={'#fff'}
            />
            <p>Add New Test</p>
            </div>
          </div>
          <div className="test-ongoing-container">
            <h2 className="test-heading">Ongoing Tests</h2>
          {liveTests.length === 0 ? <p>No Ongoing Tests</p> : liveTests.map((test,index) => {
                        console.log(test,index,"line 51 student dash")
                        return <TestCard test={test} key={index} />
                    })
                    }
          </div>
          </div>
          
          <fieldset className='tests live-tests'>
                <legend><h2 className='test-heading'>Upcoming Tests</h2></legend>
                <div className='tests-body'>
                    {upcomingTests.length === 0 ? <p>No Upcoming Tests</p> : upcomingTests.map((test,index) => {
                        console.log(test,index)
                        return <TestCard test={test} key={index} />
                    })
                    }
                </div>
            </fieldset>
            <fieldset className="tests">
            <legend><h2 className="test-heading">Recent Tests</h2></legend>
            <div className="tests-body">
              {pastTests.length === 0 ? <p>No Recent Tests</p> : pastTests.map((test,index) => {
                return <TestCard test={test} key ={index} />
              })}
            </div>
          </fieldset>
        
      </div>

    </div>
  );
}

export default TeacherDashboard;


import React, { useEffect, useState } from 'react'
import Header from '../../components/general/Header'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebase/firebase'
import TestCard from '../../components/ui/TestCard'
import "./StudentDashboard.css"
import Button from '../../components/ui/Button'
import { useNavigate } from 'react-router-dom'
import {getDoc,doc} from 'firebase/firestore'

export default function StudentDashboard() {

    const [user,loading,error] = useAuthState(auth)
    const [liveTests,setLiveTests] = useState([])
    const [pastTests,setPastTests] = useState([]);
    const [upcomingTests,setUpcomingTests] = useState([]);
    const [showMoreLiveTests,setShowMoreLiveTests] = useState(false)
    const [showMoreUpcomingTests,setShowMoreUpcomingTests] = useState(false)
    const [showMorePastTests,setShowMorePastTests] = useState(false)


    const [tests,setTests] = useState([])

    const navigate = useNavigate()


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
            const testDetail = await getDoc(doc(db,'testDetails',test))
            const starttime = new Date(testDetail.data().starttime.seconds*1000);
            const endtime = new Date(testDetail.data().endtime.seconds*1000)
            const currenttime = Date.now();

            const createdBy = await getDoc(doc(db,'users',testDetail.data().createdBy))
            const groupId  = await getDoc(doc(db,'group',testDetail.data().assignedTo))

            console.log(tests.length)

            var status,statusText;

            if(starttime < currenttime && currenttime < endtime){
                const time = TimeFormatter(currenttime,starttime)
                status = 'live'
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

            if(status === 'live'){
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
        console.log(pastTests, "past testsss")
        console.log(pastTests)
    }, [tests])



    useEffect(() => {
        
        async function FetchData(){
            const docSnap = await getDoc(doc(db,'users',user.uid))
            console.log(user.uid,'fetch')
            setTests(() => docSnap.data().tests)
        }
        FetchData()
    }, [])
    console.log('hehe')
    return (
    <div className='StudentDashboardScreen'>
        <Header>
            <p style={{color: '#fff',marginRight: '15px',cursor: 'pointer'}} onClick={() => navigate('Group')}> Go to Group </p>
        </Header>
        <div className='StudentDashboardBody'>
            <div className='greeting-msg'>
                <p className='msg'>Hi , {user?.displayName}</p>
            </div>
            <div className='testResults'>
                <fieldset className='result'>

                <legend>Result</legend>
                <p>Results To be implemented</p>

                </fieldset>
            </div>
            <fieldset className='tests live-tests'>
                <legend><h2 className='test-heading'>Live Test</h2></legend>
                <div className='tests-body'>
                    {liveTests.length === 0 ? <p>No Ongoing Tests</p> : liveTests.map((test,index) => {
                        console.log(test,index,"line 51 student dash")
                        return <TestCard test={test} key={index} />
                    })
                    }
                    {liveTests.length >= 4 && <p onClick={() => setShowMoreLiveTests((prevState) => !prevState)}>{showMoreLiveTests ?"Show More" : "Show Less"}</p>}
                </div>
            </fieldset>
            <fieldset className='tests live-tests'>
                <legend><h2 className='test-heading'>Upcoming Tests</h2></legend>
                <div className='tests-body'>
                    {upcomingTests.length === 0 ? <p>No Upcoming Tests</p> : upcomingTests.map((test,index) => {
                        console.log(test,index)
                        return <TestCard test={test} key={index} />
                    })
                    }
                    {upcomingTests.length >= 4 && <p onClick={() => setShowMoreUpcomingTests((prevState) => !prevState)}>{showMoreUpcomingTests ?"Show More" : "Show Less"}</p>}
                </div>
            </fieldset>
            <fieldset className='tests live-tests'>
                <legend><h2 className='test-heading'>Past Tests</h2></legend>
                <div className='tests-body'>
                    {pastTests.length === 0 ? <p>No Past Tests</p> : pastTests.map((test,index) => {
                        console.log(test,index)
                        return <TestCard test={test} key={index} />
                    })
                    }
                    {pastTests.length >= 4 && <p onClick={() => setShowMorePastTests((prevState) => !prevState)}>{showMorePastTests ?"Show More" : "Show Less"}</p>}
                </div>
            </fieldset>
        </div>

    </div>
  )
}

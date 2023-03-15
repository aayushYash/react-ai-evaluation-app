import React, { useEffect, useState } from 'react'
import Header from '../../components/general/Header'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase/firebase'
import TestCard from '../../components/ui/TestCard'
import "./StudentDashboard.css"
import Button from '../../components/ui/Button'
import { useNavigate } from 'react-router-dom'

export default function StudentDashboard() {

    const [user,loading,error] = useAuthState(auth)
    const [liveTests,setLiveTests] = useState([])
    const [pastTests,setPastTests] = useState([]);
    const [upcomingTests,setUpcomingTests] = useState([]);
    const [showMoreLiveTests,setShowMoreLiveTests] = useState(false)
    const [showMoreUpcomingTests,setShowMoreUpcomingTests] = useState(false)
    const [showMorePastTests,setShowMorePastTests] = useState(false)

    const navigate = useNavigate()



    useEffect(() => {
        setLiveTests((prevState) => {
            return [{
                title: 'Class Test',
                subject: 'Computer Science',
                duration: 200,
                status: 'live',
                createdBy: 'xyz'
            }]
        })
        console.log(user, "student dashboard line 12")
    }, [])
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
                <div className='live-tests-body'>
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
                <div className='live-tests-body'>
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
                <div className='live-tests-body'>
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

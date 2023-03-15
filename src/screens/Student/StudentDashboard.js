import React, { useEffect } from 'react'
import Header from '../../components/general/Header'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase/firebase'

export default function StudentDashboard() {

    const [user,loading,error] = useAuthState(auth)
    const [liveTests,setLiveTests] = useState([])

    useEffect(() => {

        console.log(user, "student dashboard line 12")
    }, [])
    return (
    <div className='StudentDashboardScreen'>
        <Header />
        <div className='StudentDashboardBody'>
            <div className='greeting-msg'>
                <p style={{textTransform: 'capitalize'}}>Hi, {user?.displayName}</p>
            </div>
            <div className='testResults'>
                <p>Results To be implemented</p>
            </div>
            <div className='live-tests'>
                <h2>Live Test</h2>
                <div className='live-tests-body'>
                    {liveTests.length === 0 ? <p>No Ongoing Tests</p> : liveTests.map((test) => {
                        return <TestCard test={test} />
                    })
                    }
                </div>
            </div>
            <div className='live-tests'>
                <h2>Live Test</h2>
                <div className='live-tests-body'>
                    {liveTests.length === 0 ? <p>No Ongoing Tests</p> : liveTests.map((test) => {
                        return <TestCard test={test} />
                    })
                    }
                </div>
            </div>
            <div className='live-tests'>
                <h2>Live Test</h2>
                <div className='live-tests-body'>
                    {liveTests.length === 0 ? <p>No Ongoing Tests</p> : liveTests.map((test) => {
                        return <TestCard test={test} />
                    })
                    }
                </div>
            </div>
        </div>

    </div>
  )
}

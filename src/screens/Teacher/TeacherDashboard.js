import React, { useEffect, useState } from "react";
import Header from "../../components/general/Header";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/firebase";
import TestCard from "../../components/ui/TestCard";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import '../Student/StudentDashboard.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import { TimeFormatter } from "../../components/util/DateFormater";

function TeacherDashboard() {


  const {userid, usertype} = useParams();
  const [question,setQuestion] = useState([]);
  const [user,loading,error] = useAuthState(auth)
  
  const [liveTests,setLiveTests] = useState([])
  const [pastTests,setPastTests] = useState([]);
  const [upcomingTests,setUpcomingTests] = useState([]);

  const [renderPastTests,setRenderPastTests] = useState([])
  const [renderUpcomingTests,setRenderUpcomingTests] = useState([])

  // const [tests,setTests] = useState([])

  const [upcomingSeach,setUpcomingSeach] = useState('')
  const [searchPast,setSearchPast] = useState('')

  const [upcomingFilter,setUpcomingFilter] = useState(false)
  const [pastFilter,setPastFilter] = useState(false)

  const [groups,setGroups] = useState([])

  const [userDataSnap,setUserDataSnap] = useState()
  const navigate = useNavigate()

  // function sortPastTestHandler(){
  //   setRenderPastTests(prev => prev.sort((test1,test2) => {
  //     if(isNaN(test1.createdAt?.getTime())){
  //     return 0 - test2.createdAt?.getTime();
  //     }
  //     if(isNaN(test2.createdAt?.getTime())){
  //       return test1.createdAt?.getTime()-0;
  //     }
  //     return test1.createdAt?.getTime() - test2.createdAt?.getTime()
  //   })
  //     )
  //   setPastFilter(true)
  // }

  function sortUpcomingTestsHandler(){
    setRenderUpcomingTests(prev => prev.sort((test1,test2) => {
      console.log(test1.createtime,test1.id,test2.craetetime,test2.id)
      if(isNaN(test1.createtime?.seconds)){
      return 0 - test2.createtime?.seconds;
      }
      if(isNaN(test2.createtime?.seconds)){
        return test1.createtime?.seconds-0;
      }
      return test1.createtime?.seconds - test2.createtime?.seconds
    })
    )
    setUpcomingFilter(true)
  }
  
  function pastSelectHandler(key) {
    const selectedGroup = groups[key].id;
    setRenderPastTests(prev => pastTests.filter(test => test.assignedTo.includes(selectedGroup)
  ))
  setPastFilter(true)
  setSearchPast('')
  }
  function upcomingSelectHandler(key) {
    const selectedGroup = groups[key].id;
    setRenderUpcomingTests(prev => upcomingTests.filter(test => test.assignedTo.includes(selectedGroup)
    ))
    setUpcomingFilter(true)
    setUpcomingSeach('')
  }

  function resetFilter(resetTo){
    if(resetTo === 'upcoming') {
      setUpcomingFilter(false)
      setRenderUpcomingTests(upcomingTests)
    }
    if(resetTo === 'past') {
      setPastFilter(false)
      setRenderPastTests(pastTests)
    }
  }

  useEffect(() => {
    async function FetchTestData(){
      const testsRef = query(collection(db,'testDetails'),where('createdBy' , "==" , userid))
      const testDocRef = await getDocs(testsRef)
  
      let tests = []
      testDocRef.forEach(testDoc => {
        console.log(testDoc.data(),"testData")
        
        const starttime = new Date(testDoc.data().starttime.seconds*1000);
        const endtime = new Date(testDoc.data().endtime.seconds*1000)
      
        const currenttime = Date.now();
        let status,statusText
        if(starttime < currenttime && currenttime < endtime){
            const time = TimeFormatter(currenttime,starttime)
            status = 'live'
            statusText = `Started ${time} ago`
            setLiveTests(prev => [...prev, {
              ...testDoc.data(),
              createdBy: userDataSnap?.name,
              id: testDoc.id,
              status: status,
              statusText: statusText
            }])
        }
        if(currenttime < starttime){
            const time = TimeFormatter(starttime,currenttime)
            status = 'upcoming'
            statusText = `Will Start in ${time}`
            setUpcomingTests(prev => [...prev, {
              ...testDoc.data(),
              id: testDoc.id,
              status: status,
              statusText: statusText,
              createdBy: userDataSnap?.name,
            }])
            setRenderUpcomingTests(prev => [...prev, {
              ...testDoc.data(),
              id: testDoc.id,
              status: status,
              statusText: statusText,
              createdBy: userDataSnap?.name,
            }])


        }
        if(currenttime > endtime){
            const time = TimeFormatter(currenttime,endtime)
            status = 'past'
            statusText = `Ended ${time} ago`
            setPastTests(prev => [...prev, {
              ...testDoc.data(),
              id: testDoc.id,
              status: status,
              statusText: statusText,
              createdBy: userDataSnap?.name,
            }])
            setRenderPastTests(prev => [...prev, {
              ...testDoc.data(),
              id: testDoc.id,
              status: status,
              statusText: statusText,
              createdBy: userDataSnap?.name,
            }])
        }
      })

    }
    
    if(userDataSnap) FetchTestData()
    
    
  }, [userDataSnap])

  console.log(renderPastTests,renderUpcomingTests,"pastt upcomingss")
  
  
  useEffect(() => {
    async function FetchData(){
      const docSnap = await getDoc(doc(db,'users',userid))
        setUserDataSnap(docSnap?.data().profile)
    }

    async function FetchGroups(){
      const groupSnap = query(collection(db,'group'),where('createdBy', "==", userid))
      const groupsRef = getDocs(groupSnap);
      (await groupsRef).forEach(group => {
        setGroups(prev => [...prev,{id: group.id,groupName: group.data().groupName}])
      })
    }
    
    FetchData()
    FetchGroups()
    
}, [])


  return (
    <div className="StudentDashboardScreen">
      <Header >
        <Button text={'Group'}  onclick={() => navigate(`/${userid}/${usertype}/group`,{
          state:{
            institute: userDataSnap?.institute,
          }
        })} />
      </Header>
      <div className="StudentDashboardBody">
        <div className="greeting-msg">
          <p>{`Hi, ${userDataSnap?.name}`}</p>
        </div>
        <div className="test-create-ongoing-container">
          <div className="test-create-container">
            <div className="test-create" onClick={() => navigate(`/${userid}/${usertype}/AddTest`)}><FontAwesomeIcon
              icon={"add"}
              fontSize={"40px"}
              color={'#fff'}
            />
            <p>Add New Test</p>
            </div>
          </div>
          <div className="test-ongoing-container">
            <h2 className="test-heading">Ongoing Tests</h2>
            <div className='tests-body'>
          {liveTests.length === 0 ? <p>No Ongoing Tests</p> : liveTests.map((test,index) =>  <TestCard userid={userid} usertype={usertype} test={test} key={index} />
                    )
                    }
                    </div>
          </div>
          </div>
          
          <fieldset className='tests live-tests'>
                <legend><h2 className='test-heading'>Upcoming Tests</h2></legend>
                <div style={{
                  display:'flex',
                  justifyContent: 'flex-end',
                  margin: '10px 0',
                  alignContent: 'center',
                  flexWrap: 'wrap',
                  position: 'relative',
                }}>
                  {upcomingFilter && <Button icon={'repeat'} onclick={() => resetFilter('upcoming')} />}
                  
                  <input type={'text'} style={{
                    width: '220px',
                    outline: 'none',
                    borderRadius: '6px',
                    fontSize: '18px',
                    height: 'fit-content',
                    padding: '2px 5px',
                    alignSelf: 'center',
        
                  }}
                  value={upcomingSeach}
                  onChange={e => setUpcomingSeach(e.target.value)} 
                  placeholder="Search By Group" />
                  <Button icon={'sort'} onclick={sortUpcomingTestsHandler} />
                  <Button icon={'filter'} />

                  {upcomingSeach.length > 0 && <SearchOptions enteredGroup={upcomingSeach} groups={groups} selectedGroupHandler={upcomingSelectHandler} />}

                </div>
                <div className='tests-body'>
                    {renderUpcomingTests.length === 0 ? <p>No Upcoming Tests</p> : renderUpcomingTests.map((test,index) => <TestCard userid={userid} usertype={usertype} test={test} key={index} />
                    )
                    }
                </div>
            </fieldset>
            <fieldset className="tests">
            <legend><h2 className="test-heading">Recent Tests</h2></legend>
            <div style={{
                  display:'flex',
                  justifyContent: 'flex-end',
                  margin: '10px 0',
                  alignContent: 'center',
                  flexWrap: 'wrap',
                  position: 'relative',
                }}>
                  {pastFilter && <Button icon={'repeat'} onclick={() => resetFilter('past')} />}
                  <input type={'text'} style={{
                    width: '220px',
                    outline: 'none',
                    borderRadius: '6px',
                    fontSize: '18px',
                    height: 'fit-content',
                    padding: '2px 5px',
                    alignSelf: 'center'
                  }}
                  value={searchPast}
                  onChange={e => setSearchPast(e.target.value)}  
                  placeholder="Search By Group" />
                  <Button icon={'sort'} onclick={null}  />
                  <Button icon={'filter'} />

                  {searchPast.length > 0 && <SearchOptions enteredGroup={searchPast} groups={groups} selectedGroupHandler={pastSelectHandler} />}

                </div>
            <div className="tests-body">
              {renderPastTests.length === 0 ? <p>No Recent Tests</p> : renderPastTests.map((test,index) => <TestCard userid={userid} usertype={usertype} test={test} key ={index} />
              )}
            </div>
          </fieldset>
        
      </div>

    </div>
  );
}

function SearchOptions({enteredGroup,groups,selectedGroupHandler}) {
  console.log(groups)
  return<div className="scroll" style={{
    position: 'absolute',
    top: '40px',
    borderRadius: '8px',
    background: '#fff', 
    padding: '5px 10px',
    width: '200px',
    maxHeight: '200px',
    overflowY: 'scroll',
    zIndex: 10
  }}>
    
    {groups.map((group,index) => {
      if(group.groupName.toLowerCase().includes(enteredGroup.toLowerCase())){
        console.log(enteredGroup,group.groupName,"if condi")
        return <div key={index} style={{
          borderBottom: '1px solid rgba(0,0,0,0.3)',
          cursor: 'pointer'
        }}
        onClick={() => selectedGroupHandler(index)}>
          {group.groupName}
        </div>
      }
      return null
    })}
  </div>
}

export default TeacherDashboard;
export {SearchOptions}


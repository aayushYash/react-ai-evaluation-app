import React, { useEffect, useState } from "react";
import Header from "../../components/general/Header";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/firebase";
import TestCard from "../../components/ui/TestCard";
import "./StudentDashboard.css";
import Button from "../../components/ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import { getDoc, doc, query, collection, where, getDocs } from "firebase/firestore";
import { SearchOptions } from "../Teacher/TeacherDashboard";

export default function StudentDashboard() {
  const [liveTests, setLiveTests] = useState([]);
  const [pastTests, setPastTests] = useState([]);
  const [upcomingTests, setUpcomingTests] = useState([]);
  const [showMoreLiveTests, setShowMoreLiveTests] = useState(false);
  const [showMoreUpcomingTests, setShowMoreUpcomingTests] = useState(false);
  const [showMorePastTests, setShowMorePastTests] = useState(false);
  const [userDataSnap, setUserDataSnap] = useState();
  const [upcomingFilter, setUpcomingFilter] = useState(false);
  const [upcomingSeach, setUpcomingSeach] = useState("");
  const [groups, setGroups] = useState([]);
  const [renderUpcomingTests, setRenderUpcomingTests] = useState([]);
  const [renderPastTests, setRenderPastTests] = useState([]);
  const [pastFilter, setPastFilter] = useState(false);
  const [searchPast, setSearchPast] = useState("");

  const [tests, setTests] = useState([]);

  const navigate = useNavigate();

  const { userid, usertype } = useParams();

  function TimeFormatter(time1, time2) {
    const distance = time1 - time2;
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    const min = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const hr = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const day = Math.floor(distance / (1000 * 60 * 60 * 24));
    const time = {
      days: day === 0 ? "" : `${day}d`,
      hour: day === 0 && hr === 0 ? "" : `${hr}h`,
      min: day === 0 && hr === 0 && min === 0 ? "" : `${min}m`,
      sec: `${seconds}s`,
    };

    return `${time.days} ${time.hour} ${time.min} ${time.sec}`.trim();
  }

  function resetFilter(resetTo) {
    if (resetTo === "upcoming") {
      setUpcomingFilter(false);
      setRenderUpcomingTests(upcomingTests);
    }
    if (resetTo === "past") {
      setPastFilter(false);
      setRenderPastTests(pastTests);
    }
  }
  function pastSelectHandler(key) {
    const selectedGroup = groups[key].id;
    setRenderPastTests((prev) =>
      pastTests.filter((test) => test.assignedTo.includes(selectedGroup))
    );
    setPastFilter(true);
    setSearchPast("");
  }
  function upcomingSelectHandler(key) {
    const selectedGroup = groups[key].id;
    setRenderUpcomingTests((prev) =>
      upcomingTests.filter((test) => test.assignedTo.includes(selectedGroup))
    );
    setUpcomingFilter(true);
    setUpcomingSeach("");
  }

  useEffect(() => {
    tests.forEach((test) => {
      const starttime = new Date(test?.starttime?.seconds * 1000);
      const endtime = new Date(test?.endtime?.seconds * 1000);
      const currenttime = Date.now();

      var status, statusText;

      if (starttime < currenttime && currenttime < endtime) {
        const time = TimeFormatter(currenttime, starttime);
        status = "live";
        if (
          endtime < currenttime
        ) {
          status = "past";
        }
        statusText = `Started ${time} ago`;
      }
      if (currenttime < starttime) {
        const time = TimeFormatter(starttime, currenttime);
        status = "upcoming";
        statusText = `Will Start in ${time}`;
      }
      if (currenttime > endtime) {
        const time = TimeFormatter(currenttime, endtime);
        status = "past";
        statusText = `Ended ${time} ago`;
      }

      const data = {
        id: test.id,
        title: test.title,
        // createdBy: test.profile.name,
        // identifier: groupId.data().groupName,
        duration: test.duration,
        status: status,
        statusText: statusText,
      };
      if (status === "live" && !data.attempted) {
        setLiveTests((prev) => {
          const arr = prev.filter((d) => d.id !== data.id);
          return [...arr, data];
        });
      }
      if (status === "past") {
        setPastTests((prev) => {
          const arr = prev.filter((d) => d.id !== data.id);
          return [...arr, data];
        });
        setRenderPastTests((prev) => {
          const arr = prev.filter((d) => d.id !== data.id);
          return [...arr, data];
        });
      }
      if (status === "upcoming") {
        setUpcomingTests((prev) => {
          const arr = prev.filter((d) => d.id !== data.id);
          return [...arr, data];
        });
        setRenderUpcomingTests((prev) => {
          const arr = prev.filter((d) => d.id !== data.id);
          return [...arr, data];
        });
      }
    });
  }, [tests]);

  useEffect(() => {

    async function FetchTest(){
      groups.forEach(async group => {
        const testsQuery = query(collection(db,'testDetails'), where('assignedTo', 'array-contains', group.id))
        const testsSnap = await getDocs(testsQuery)
        testsSnap.forEach(test => {
          console.log(test.data(),test.id,"query test data")
          setTests(prev => [...prev,{id: test.id,...test.data()}])
          
        })
      })
    }

    if(groups.length !== 0) FetchTest()
  },[groups])

  useEffect(() => {
    async function FetchData() {
      const docSnap = await getDoc(doc(db, "users", userid));
      setUserDataSnap(docSnap?.data().profile);
      var groupData = []
      docSnap?.data().groups.forEach(async (groupid) => {
        const group = await (await getDoc(doc(db, "group", groupid))).data();
        setGroups((prev) => [...prev, { id: groupid, ...group }]);
        groupData = [{id: groupid}]
      });
      console.log(groupData,'groupdata')
    }
    FetchData();
  }, []);

  return (
    <div className="StudentDashboardScreen">
      <Header />
      <div className="StudentDashboardBody">
        <div className="greeting-msg">
          <p className="msg">Hi , {userDataSnap?.name}</p>
        </div>
        <fieldset className="tests live-tests">
          <legend>
            <h2 className="test-heading">Groups</h2>
          </legend>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
          }}>
            {groups.length === 0 ? <p>You are not in any group.</p> : groups.map((group,index) => {
              return <div key={index} style={{
                background: '#01082D',
                padding: '5px 4px',
                margin: '4px',
                width: 'fit-content',
                color: '#fff',
                borderRadius: '5px',
                cursor: 'pointer'
              }}>
                {group.groupName}
              </div>
            })}
          </div>
        </fieldset>
        <fieldset className="tests live-tests">
          <legend>
            <h2 className="test-heading">Live Tests</h2>
          </legend>
          <div className="tests-body">
            {liveTests.length === 0 ? (
              <p>No Lives Tests</p>
            ) : (
              liveTests.map((test, index) => (
                <TestCard
                  userid={userid}
                  usertype={usertype}
                  test={test}
                  key={index}
                />
              ))
            )}
          </div>
        </fieldset>
        <fieldset className="tests live-tests">
          <legend>
            <h2 className="test-heading">Upcoming Tests</h2>
          </legend>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "10px 0",
              alignContent: "center",
              flexWrap: "wrap",
              position: "relative",
            }}
          >
            {/* {upcomingFilter && (
              <Button icon={"repeat"} onclick={() => resetFilter("upcoming")} />
            )}

            <input
              type={"text"}
              style={{
                width: "220px",
                outline: "none",
                borderRadius: "6px",
                fontSize: "18px",
                height: "fit-content",
                padding: "2px 5px",
                alignSelf: "center",
              }}
              value={upcomingSeach}
              onChange={(e) => setUpcomingSeach(e.target.value)}
              placeholder="Search By Group"
            />
            <Button icon={"sort"} onclick={null} />
            <Button icon={"filter"} /> */}

            {upcomingSeach.length > 0 && (
              <SearchOptions
                enteredGroup={upcomingSeach}
                groups={groups}
                selectedGroupHandler={upcomingSelectHandler}
              />
            )}
          </div>
          <div className="tests-body">
            {renderUpcomingTests.length === 0 ? (
              <p>No Upcoming Tests</p>
            ) : (
              renderUpcomingTests.map((test, index) => (
                <TestCard
                  userid={userid}
                  usertype={usertype}
                  test={test}
                  key={index}
                />
              ))
            )}
          </div>
        </fieldset>
        <fieldset className="tests">
          <legend>
            <h2 className="test-heading">Past Tests</h2>
          </legend>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "10px 0",
              alignContent: "center",
              flexWrap: "wrap",
              position: "relative",
            }}
          >
            {/* {pastFilter && (
              <Button icon={"repeat"} onclick={() => resetFilter("past")} />
            )} */}
            {/* <input
              type={"text"}
              style={{
                width: "220px",
                outline: "none",
                borderRadius: "6px",
                fontSize: "18px",
                height: "fit-content",
                padding: "2px 5px",
                alignSelf: "center",
              }}
              value={searchPast}
              onChange={(e) => setSearchPast(e.target.value)}
              placeholder="Search By Group"
            />
            <Button icon={"sort"} onclick={null} />
            <Button icon={"filter"} /> */}

            {searchPast.length > 0 && (
              <SearchOptions
                enteredGroup={searchPast}
                groups={groups}
                selectedGroupHandler={pastSelectHandler}
              />
            )}
          </div>
          <div className="tests-body">
            {renderPastTests.length === 0 ? (
              <p>No Recent Tests</p>
            ) : (
              renderPastTests.map((test, index) => (
                <TestCard
                  userid={userid}
                  usertype={usertype}
                  test={test}
                  key={index}
                />
              ))
            )}
          </div>
        </fieldset>
      </div>
    </div>
  );
}



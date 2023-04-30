import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  FieldValue,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Header from "../../components/general/Header";
import Button from "../../components/ui/Button";
import InputText from "../../components/ui/InputText";
import { db } from "../../firebase/firebase";
import "./Group.css";

export default function Group() {
  const location = useLocation();

  const [userInInstitute, setUserInInstitute] = useState([]);
  const { userid } = useParams();
  const [selectedUser, setSelectedUser] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [groups, setGroups] = useState([]);
  const [closed, setCloses] = useState(true);

  function openHandle() {
    if (closed) setCloses(false);
    if (!closed) setCloses(true);
  }

  async function createGroupHandler() {
    const members = selectedUser.map((user) => user.id);
    const nameQuery = query(
      collection(db, "group"),
      where("groupName", "==", groupName)
    );
    const querySnap = await getDocs(nameQuery);
    if (groupName.length === 0) {
      toast.error("Please Enter Group Name");
      return;
    }
    if (selectedUser.length === 0) {
      toast.error("Please Select Users");
      return;
    }
    if (!querySnap.empty) {
      toast.error("Can not create another group with same name.");
      groupName("");
      return;
    }
    const docid = await addDoc(collection(db, "group"), {
      groupName: groupName,
      createdBy: userid,
      groupMember: members,
      tests: [],
    });

    console.log(docid.id);
    members.forEach(async (member) => {
      await updateDoc(doc(db, "users", member), {
        groups: arrayUnion(docid.id),
      });
    });

    toast.success("Group Created!!");
    setSelectedUser([]);
    setGroupName("");
    GetGroups();
    setCloses(true);
  }

  async function GetGroups() {
    const groups = query(
      collection(db, "group"),
      where("createdBy", "==", userid)
    );
    const groupSnap = await getDocs(groups);
    let groupArray = [];
    groupSnap.forEach((group) => {
      groupArray = [...groupArray, group.data()];
    });
    setGroups(groupArray);
  }

  async function GetUsers() {
    const users = query(
      collection(db, "users"),
      where("profile.institute", "==", location.state.institute),
      where("profile.usertype", "==", "Student")
    );
    const snap = await getDocs(users);
    let data = [];
    snap.forEach((doc) => {
      if (doc.id !== userid) {
        data = [
          ...data,
          {
            name: doc.data().profile.name,
            id: doc.id,
            instituteRoll: doc.data().profile.instituteRollNumber,
          },
        ];
      }
    });
    setUserInInstitute(data);
  }

  const navigate = useNavigate();

  useEffect(() => {
    GetUsers();
    GetGroups();
  }, []);

  return (
    <div className="group-screen">
      <Header />
      <ToastContainer />
      <div className="group-body">
        <fieldset className="group">
          <legend>Groups</legend>
          {groups.map((group, i) => (
            <div className="group-card" key={i}>
              <div style={{ height: "60px", borderBottom: "1px solid #fff" }}>
                <h1 className="group-name">{group.groupName}</h1>
              </div>
              <div>
                <h2 className="members">{`${group.groupMember.length} Members`}</h2>
                <h2 className="tests-assigned">{`${group.tests.length} Tests`}</h2>
              </div>
            </div>
          ))}
        </fieldset>
        <fieldset
          className="group-section"
          style={closed ? { display: "none" } : { display: "flex" }}
        >
          <legend>Enter Group Details</legend>
          <fieldset>
            <legend>Group Name</legend>
            <InputText
              valid={true}
              val={groupName}
              onchange={(e) => setGroupName(e.target.value)}
              maxlength={20}
            />
          </fieldset>
          <fieldset className="add-members">
            <legend>Add Members</legend>
            <div>
              {userInInstitute.map((user) => {
                return (
                  <div className="user-card" key={user.id}>
                    <div className="user">
                      <div className="user-name">
                        {user.name}[
                        <span style={{ fontSize: "16px" }}>
                          {user.instituteRoll}
                        </span>
                        ]
                      </div>
                      <div className="user-id">({user.id})</div>
                    </div>
                    {selectedUser.includes(user) ? (
                      <Button
                        text={"remove"}
                        onclick={() =>
                          setSelectedUser((prev) =>
                            prev.filter((u) => u.id !== user.id)
                          )
                        }
                      />
                    ) : (
                      <Button
                        text={"Add"}
                        onclick={() =>
                          setSelectedUser((prev) => [user, ...prev])
                        }
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <div>
              {selectedUser.length === 0 ? null : (
                <div>
                  {selectedUser.map((user) => (
                    <span style={{ margin: "0 2px" }}>{user.name}</span>
                  ))}{" "}
                  {selectedUser.length}
                </div>
              )}
            </div>
          </fieldset>
        </fieldset>
        <Button
          text={closed ? "Create New Group" : "Create Group"}
          onclick={closed ? openHandle : createGroupHandler}
        />
        {closed ? null : <Button text={"Close"} onclick={openHandle} />}
        <Button text={"Back"} onclick={() => navigate(-1)} />
      </div>
    </div>
  );
}

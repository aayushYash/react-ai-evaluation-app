import React, { useEffect, useState } from "react";
import Header from "../../components/general/Header";
import Footer from "../../components/general/Footer";
import Button from "../../components/ui/Button";
import InputText from "../../components/ui/InputText";
import DateButton from "../../components/ui/DateButton";
import "./NewTestAdd.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from "react-toastify";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useNavigate, useParams } from "react-router-dom";

function EditTest() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startdisplay, setStartDisplay] = useState(false);
  const [enddisplay, setEndDisplay] = useState(false);
  const [testduration, setTestduration] = useState(0);
  const [left, setLeft] = useState(false);
  const [questinSet, setQuestionSet] = useState({});
  const [rules, setRules] = useState([]);
  const [ruleInput, setRuleInput] = useState("");
  const [testTitle, setTestTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courseSubject, setCourseSubject] = useState("");

  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [questionInput, setQuestionInput] = useState("");
  const [marks, setMarks] = useState(null);
  const [keywordVal, setKeywordVal] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [editing, setEditing] = useState(false);
  const [key, setKey] = useState("");
  const [totalMarks, setTotalMarks] = useState(0);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [groups, setGroups] = useState([]);
  const [showGroupSelection, setShowGroupSelection] = useState(false);
  const [assignedTo, setAssignedTo] = useState([]);
  const [rerender, setRerender] = useState(false);

  const [validQuestionSet, setValidQuestionSet] = useState(false);

  const { userid, testid } = useParams();
  const navigate = useNavigate();

  function clickHandlerStart() {
    if (!startdisplay) {
      setStartDisplay(true);
    }
  }

  function clickHandlerEnd() {
    if (!enddisplay) {
      setEndDisplay(true);
    }
  }

  function onEndDate(val) {
    setEndDisplay(false);
    setEndDate(val);
  }

  function onStartDate(val) {
    setStartDisplay(false);
    setStartDate(val);
  }

  function EnableEdit(key) {
    setKeywords(questinSet[key].keywords);
    setQuestionInput(questinSet[key].question);
    setMarks(questinSet[key].marks);
    setEditing(true);
    setKey(key);
    setShowAddQuestion(true);
    getTotalMarks();
  }

  function reset() {
    setKeywordVal("");
    setQuestionInput("");
    setKeywords([]);
    setMarks(null);
    setShowAddQuestion(false);
    setEditing(false);
    getTotalMarks();
  }

  function validateQuestionSet() {
    console.log(Object.keys(questinSet), selectedGroups, testTitle);
    if (Object.keys(questinSet).length === 0) {
      toast.error("Question Set Can' be empty.");
      return false;
    }
    if (testTitle.length === 0) {
      toast.error("Enter a valid title to test.");
      return false;
    }
    if (startDate === null) {
      toast.error("Choose a start time for the test.");
      return false;
    }
    if (endDate === null) {
      toast.error("Choose a end time for the test.");
      return false;
    }
    if (endDate?.getTime() - startDate.getTime() < testduration * 60 * 1000) {
      toast.error("Live Duration Must be equal to more than Test Duration");
      return false;
    }
    if (testduration < 10) {
      toast.error("Test Duration Must be atleast of 10 Minutes");
      return false;
    }
    if (selectedGroups.length === 0) {
      toast.error("Test must be assigned to atleast one group");
      return false;
    }
    if (courseSubject.length === 0) {
      toast.error("Enter Subject/Course");
      return false;
    }

    return true;
  }

  function onAddQuestion() {
    if (
      questionInput.length === 0 ||
      keywords.length === 0 ||
      marks === null ||
      marks < 1
    ) {
      toast.error("Please Fill All Fields and Add Keywords Properly");
      return;
    }
    const questinObj = { ...questinSet };
    const index = Object.keys(questinSet).length + 1;
    questinObj["q" + index] = {
      keywords: keywords,
      question: questionInput,
      marks: marks,
    };
    reset();
    setQuestionSet(questinObj);
  }

  async function AddTest() {
    const questionSetData = questinSet;
    let groupIds = [];
    let users = [];
    selectedGroups.forEach((group) => {
      groupIds = [...groupIds, group.id];
      group.groupMember.forEach((user) => {
        users = [...users, user];
      });
    });

    const checkValidity = validateQuestionSet();
    if (!checkValidity) {
      return;
    }

    const testDetailsData = {
      createdBy: userid,
      assignedTo: groupIds,
      starttime: startDate,
      endtime: endDate,
      duration: testduration,
      title: testTitle,
      evaluationStatus: false,
      rules: rules,
      testDescription: description,
      subject: courseSubject,
      createtime: new Date(),
    };

    const testData = {
      ans: "",
      marks: 0,
      evaluationStatus: false,
    };

    await updateDoc(doc(db, "testDetails", testid), testDetailsData);
    const testDataForUser = {
      attempted: false,
      testid: testid,
    };
    await updateDoc(doc(db, "questionset", testid), questionSetData);
    users.forEach(async (user) => {
      Object.keys(questinSet).forEach(async (key) => {
        await updateDoc(doc(db, "tests", testid, user, key), testData);
      });
      await updateDoc(doc(db, "users", user), {
        tests: arrayUnion(testDataForUser),
      });
    });

    groupIds.forEach(async (group) => {
      await updateDoc(doc(db, "group", group), {
        tests: arrayUnion(testid),
      });
    });

    toast.success("Test Data Updated" + testid);
    setTimeout(() => {
      navigate(-1);
    }, 2000);
  }

  function editHandler(key) {
    const questinObj = { ...questinSet };
    questinObj[key] = {
      keywords: keywords,
      question: questionInput,
      marks: marks,
    };
    setQuestionSet(questinObj);
    reset();
  }

  function getTotalMarks() {
    var total = 0;
    for (let key in questinSet) {
      total = total + Number(questinSet[key].marks);
    }

    setTotalMarks(total);
  }

  function selectionHandler(data) {
    if (selectedGroups.includes(data)) {
      setSelectedGroups((prev) => prev.filter((gData) => gData !== data));
      return;
    }
    setSelectedGroups((prev) => [...prev, data]);
  }

  function deleteHandler(key) {
    const questinObj = questinSet;
    delete questinObj[key];
    const dObj = {};
    let i = 1;
    Object.keys(questinObj).forEach((key) => {
      dObj["q" + i] = questinObj[key];
    });

    setRerender((prev) => !prev);
    setQuestionSet(dObj);
  }

  useEffect(() => {
    getTotalMarks();
  }, [totalMarks, showAddQuestion, rerender]);

  useEffect(() => {
    let groupsData = [];
    async function GetGroupsData() {
      const groups = query(
        collection(db, "group"),
        where("createdBy", "==", userid)
      );
      const groupSnap = await getDocs(groups);
      groupSnap.forEach((group) => {
        groupsData = [...groupsData, { ...group.data(), id: group.id }];
      });
      setGroups(groupsData);
    }
    GetGroupsData();
    async function FetchTestData() {
      const testDetail = await getDoc(doc(db, "testDetails", testid));
      console.log(testDetail.data(), "test data");
      setTestTitle(testDetail.data().title);
      setCourseSubject(testDetail.data().subject);
      setStartDate(new Date(testDetail.data().starttime.seconds * 1000));
      setEndDate(new Date(testDetail.data().endtime.seconds * 1000));
      setTestduration(testDetail.data().duration);
      setDescription(testDetail.data().testDescription);
      setRules(testDetail.data().rules);

      groupsData.forEach((group) => {
        if (testDetail.data().assignedTo.includes(group.id)) {
          setSelectedGroups((prev) => [...prev, group]);
        }
      });

      const quesitionSet = await getDoc(doc(db, "questionset", testid));
      setQuestionSet(quesitionSet.data());
    }
    FetchTestData();
  }, []);

  return (
    <div className="add-test-screen">
      <ToastContainer />
      <Header />
      <div className="add-test-body">
        <div className={left ? "add-test-info left" : "add-test-info"}>
          <div
            className="iconOpen"
            onClick={() => setLeft(false)}
            style={{ alignSelf: "flex-end" }}
          >
            Close <FontAwesomeIcon icon={"times-circle"} />{" "}
          </div>
          <div className="basic-info">
            <InputText
              valid={true}
              placeholder="Title"
              val={testTitle}
              onchange={(e) => setTestTitle(e.target.value)}
            />
            <InputText
              valid={true}
              placeholder="Subject/Course"
              val={courseSubject}
              onchange={(e) => setCourseSubject(e.target.value)}
            />
            <div className="dates">
              <DateButton
                text={"Start Time"}
                val={startDate}
                onChange={onStartDate}
                display={startdisplay}
                clickHandler={clickHandlerStart}
              />
              <DateButton
                text={"End Time"}
                val={endDate}
                onChange={onEndDate}
                display={enddisplay}
                clickHandler={clickHandlerEnd}
              />
            </div>
            <div className="duration">
              <div className="live">
                Live Duration:{" "}
                {Math.floor(
                  (endDate?.getTime() - startDate?.getTime()) / 1000
                ) /
                  60 /
                  60}{" "}
                hrs
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "280px",
                }}
              >
                <InputText
                  val={testduration}
                  type={"number"}
                  valid={true}
                  onchange={(e) => setTestduration(e.target.value)}
                  width={50}
                  placeholder="Test Duration In Minutes"
                />
                <p>Min</p>
              </div>
            </div>
          </div>
          <fieldset className="description">
            <legend>Description</legend>
            <textarea
              className="scroll"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </fieldset>
          <fieldset className="rules">
            <legend>Rules</legend>
            <div className="scroll" style={{ overflowY: "scroll" }}>
              <div>
                {rules.map((rule, index) => (
                  <RuleText
                    key={index}
                    onSave={() => setRules((prev) => [...prev, ruleInput])}
                    onRemove={() =>
                      setRules((prev) => prev.filter((rule, i) => i !== index))
                    }
                    rules={rules}
                    val={ruleInput}
                    onChange={(e) => setRuleInput(e.target.value)}
                    rule={rule}
                  />
                ))}
              </div>
              <div style={{ display: "flex" }}>
                <Button
                  icon={"add"}
                  type="light"
                  onclick={() => setRules((prev) => ["", ...prev])}
                />
              </div>
            </div>
          </fieldset>
        </div>

        <div className="add-test-section scroll">
          <div className="iconOpen" onClick={() => setLeft(true)}>
            Test Information <FontAwesomeIcon icon={"forward"} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              margin: "10px 0",
              borderBottom: "1px solid #000",
              paddingBottom: "3px",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  margin: 0,
                  padding: 0,
                }}
              >
                Question Set
              </h1>
              {testid}
              <div style={{ minWidth: "150px" }}>
                <div>Total Marks : {totalMarks}</div>
                <div>Total Questions : {Object.keys(questinSet).length}</div>
              </div>
            </div>
            {!showAddQuestion && (
              <Button
                text={showGroupSelection ? "Close" : "Assign To"}
                width="fit-content"
                margin={0}
                onclick={
                  showGroupSelection
                    ? () => setShowGroupSelection(false)
                    : () => setShowGroupSelection(true)
                }
              />
            )}
            <div
              style={{
                margin: 0,
                padding: 0,
                display: "flex",
                flexWrap: "wrap",
                maxHeight: "50px",
                overflowY: "scroll",
                marginBottom: "5px",
                width: "100%",
              }}
            >
              {selectedGroups.map((group, index) => (
                <p
                  key={index}
                  style={{
                    background: "#adadad",
                    padding: "0 5px",
                    borderRadius: "5px",
                  }}
                >
                  {group.groupName}
                </p>
              ))}
            </div>
          </div>
          {showGroupSelection && (
            <GroupsToAssign
              groups={groups}
              selectedGroups={selectedGroups}
              setSelectedGroups={selectionHandler}
            />
          )}
          {showAddQuestion === true ? (
            <AddQuestionKeyword
              onCancel={() => reset()}
              questionInput={questionInput}
              onQuestionInputChange={(e) => setQuestionInput(e.target.value)}
              marksVal={marks}
              onMarksValChange={(e) => setMarks(e.target.value)}
              keywordVal={keywordVal}
              onKeywordChange={(e) => setKeywordVal(e.target.value)}
              keywords={keywords}
              onKeywordAdd={() => {
                if (keywordVal.length === 0) {
                  toast.warning("Please Enter A Text");
                  return;
                }
                setKeywordVal("");
                setKeywords((prev) => [keywordVal, ...prev]);
              }}
              onRemoveKeyword={(toBeRemoved) =>
                setKeywords((prev) =>
                  prev.filter(
                    (keyword, index) => index !== keywords.indexOf(toBeRemoved)
                  )
                )
              }
              onDone={onAddQuestion}
              questionSet={questinSet}
              editing={editing}
              onEdit={editHandler}
              keyVal={key}
            />
          ) : (
            <div className="scroll" style={{ overflowY: "scroll" }}>
              {!showGroupSelection && (
                <div className="questions-section">
                  {Object.keys(questinSet).map((key, index) => (
                    <div key={index} className="question-keyword-container">
                      <div style={{ fontSize: "18px" }}>
                        {`Q${index + 1}. `}
                        {questinSet[key].question} [{questinSet[key].marks}]
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                        }}
                      >
                        {questinSet[key].keywords.map((keyword, index) => (
                          <p
                            key={index}
                            style={{
                              background: "#adadad",
                              padding: "2px 5px",
                              borderRadius: "5px",
                            }}
                          >
                            {keyword}
                          </p>
                        ))}
                      </div>
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <Button
                          text="Edit"
                          icon={"pen"}
                          width="fit-content"
                          onclick={() => {
                            EnableEdit(key);
                          }}
                        />
                        <Button
                          text="Delete"
                          onclick={() => {
                            deleteHandler(key);
                          }}
                          icon="trash"
                          btncolor={"red"}
                          noborder={true}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {!showGroupSelection && (
                <div className="add-buttons">
                  <Button
                    text={"Add Question"}
                    onclick={() => setShowAddQuestion(true)}
                  />
                </div>
              )}
            </div>
          )}
          {!showAddQuestion && !showGroupSelection && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "clamp(200px,90%,850px)",
                borderTop: "1px solid #000",
              }}
            >
              {" "}
              <Button text={"Back"} onclick={() => navigate(-1)} />
              {Object.keys(questinSet).length !== 0 && (
                <Button
                  text={"Publish Test"}
                  width="fit-content"
                  onclick={AddTest}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RuleText({ onSave, onRemove, rules, ruleInput, onChange, rule }) {
  return (
    <div className="ruletext">
      {rule.length === 0 ? (
        <InputText
          val={ruleInput}
          onchange={onChange}
          valid={true}
          width={230}
        />
      ) : (
        <p className="p-rule">{rule}</p>
      )}
      {rule.length === 0 ? (
        <div style={{ display: "flex" }}>
          <Button onclick={onRemove} icon="times-circle" />
          <Button onclick={onSave} icon="add" />{" "}
        </div>
      ) : (
        <div style={{ display: "flex" }}>
          <Button onclick={onRemove} icon="times-circle" />{" "}
        </div>
      )}
    </div>
  );
}

function AddQuestionKeyword({
  questionInput,
  marksVal,
  keywordVal,
  onKeywordChange,
  onKeywordAdd,
  onRemoveKeyword,
  onQuestionInputChange,
  onMarksValChange,
  keywords,
  onReset,
  onCancel,
  onDone,
  editing,
  onEdit,
  questionSet,
  keyVal,
}) {
  return (
    <div className="add-question-word-container">
      <ToastContainer />
      <p>
        Q. {questionInput}[{marksVal}]
      </p>
      <fieldset className="input-field">
        <legend>Question</legend>
        <input
          type={"text"}
          value={questionInput}
          onChange={onQuestionInputChange}
        />
      </fieldset>
      <fieldset className="input-field number">
        <legend>Marks</legend>
        <input
          type={"number"}
          value={marksVal}
          onChange={onMarksValChange}
          min={1}
        />
      </fieldset>

      {/* Display Added Keywords */}
      <fieldset className="render-keywords">
        <legend>Keywords</legend>
        {keywords?.map((keyword, indexx) => (
          <div className="keyword-container" key={indexx}>
            <p>{keyword}</p>
            <Button
              icon={"times-circle"}
              margin={0}
              padding={0}
              btncolor="transparent"
              onclick={() => onRemoveKeyword(keyword)}
              iconcolor={"red"}
              noborder={true}
            />
          </div>
        ))}
      </fieldset>

      {/* Add New Keywordss */}
      <fieldset className="input-field keyword">
        <legend>Keyword</legend>
        <input type={"text"} value={keywordVal} onChange={onKeywordChange} />
        <Button
          icon={"check"}
          margin={0}
          onclick={onKeywordAdd}
          btncolor="green"
          noborder={true}
        />
      </fieldset>
      <div className="add-button">
        <Button text={"Cancel"} onclick={onCancel} noborder={true} />
        <Button
          text={editing ? "Edit" : "Done"}
          onclick={editing ? () => onEdit(keyVal) : onDone}
          noborder={true}
        />
      </div>
    </div>
  );
}

function GroupsToAssign({ groups, selectedGroups, setSelectedGroups }) {
  const [rerender, setRerender] = useState(true);
  useEffect(() => {}, [selectedGroups, rerender]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>Your Groups</h1>
      {groups.map((group, index) => {
        let checked = false;
        if (selectedGroups.includes(group)) {
          checked = !checked;
          return (
            <label
              key={index}
              style={{
                border: "1px solid #adadad",
                margin: "3px 0",
                padding: "0 5px",
                borderRadius: "5px",
                width: "200px",
              }}
            >
              <input
                type={"checkbox"}
                onChange={(e) => {
                  setRerender((prev) => !prev);
                  setSelectedGroups(group);
                }}
                value={group.groupName}
                checked={true}
              />
              {group.groupName}
            </label>
          );
        }
        return (
          <label
            key={index}
            style={{
              background: "#adadad",
              margin: "3px 0",
              padding: "0 5px",
              borderRadius: "5px",
              width: "200px",
            }}
          >
            <input
              type={"checkbox"}
              onChange={(e) => {
                setRerender((prev) => !prev);
                setSelectedGroups(group);
              }}
              value={group.groupName}
              style={{
                fontSize: "20px",
                marginRight: "5px",
              }}
            />
            {group.groupName}
          </label>
        );
      })}
    </div>
  );
}

export default EditTest;

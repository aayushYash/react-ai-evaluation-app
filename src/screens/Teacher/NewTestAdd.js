import React, { useState } from "react";
import Header from "../../components/general/Header";
import Footer from "../../components/general/Footer";
import Button from "../../components/ui/Button";
import InputText from "../../components/ui/InputText";
import DateButton from "../../components/ui/DateButton";
import './NewTestAdd.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



function NewTestAdd() {

  const [questions,setQuestions] = useState([]);
  const [startDate,setStartDate] = useState(null);
  const [endDate,setEndDate] = useState(null);
  const [startdisplay,setStartDisplay] = useState(false)
  const [enddisplay,setEndDisplay] = useState(false)
  const [testduration,setTestduration] = useState(0)
  const [left,setLeft] = useState(false)
  const [questinSet,setQuestionSet] = useState([])
  const [rules,setRules] = useState([])
  const [ruleInput,setRuleInput] = useState('')


  function clickHandlerStart() {
      console.log('clicked')
      if(!startdisplay){
          setStartDisplay(true)
      }
  }

  function clickHandlerEnd() {
    console.log('clicked')
    if(!enddisplay){
        setEndDisplay(true)
    }
}

  function onEndDate(val) {
    console.log('chnge happen')
    setEndDisplay(false)
    setEndDate(val)
  }

  function onStartDate(val) {
    console.log('chnge happen')
    setStartDisplay(false)
    setStartDate(val)
  }

  console.log(rules,"rulessssssssssssssss")
  console.log(startDate,"startdat")
  console.log('left',left)
  return (
    <div className="add-test-screen">
      <Header />
      <div className="add-test-body">
        <div className={left ? "add-test-info left" : "add-test-info"}>
        <div className="iconOpen" onClick={() => setLeft(false)}><FontAwesomeIcon icon={'backward'} /></div>
          <div className="basic-info">
            <InputText valid={true} placeholder="Title" />
            <div className="dates">
              <DateButton text={'Start Time'} val={startDate} onChange={onStartDate} display={startdisplay} clickHandler={clickHandlerStart} />
              <DateButton text={'End Time'} val={endDate} onChange={onEndDate} display={enddisplay} clickHandler={clickHandlerEnd} />
            </div>
            <div className="duration">
              <div className="live">{"Live Duration:"  }</div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'280px'}}>
                <InputText val={testduration} type={'number'} valid={true} onchange={(e) => setTestduration(e.target.value)} width={50} placeholder="Test Duration In Minutes" /> 
                <p>Min</p>
                </div>
            </div>
          </div>
          <fieldset className="description">
            <legend>Description</legend>
            <textarea rows={4} />
          </fieldset>
          <fieldset className="rules">
            <legend>Rules</legend>
            <div style={{overflowY: 'scroll'}}>
            <div>
              {rules.map((rule,index) => <RuleText key={index} onSave={() => setRules(prev => [...prev,ruleInput])} onRemove={() => setRules(prev => prev.filter((rule,i) => i !== index))} rules={rules} val={ruleInput} onChange={e => setRuleInput(e.target.value)} rule={rule}/>)}
            </div>
            <div style={{display:'flex'}}>
              <Button icon={'add'} type='light' onclick={() => setRules(prev => ["", ...prev])} />
            </div>
            </div>
          </fieldset>
        </div>



        <div className="add-test-section">
          <div className="iconOpen" onClick={() => setLeft(true)} ><FontAwesomeIcon icon={'forward'} /></div>
          {questions.length === 0 ? null : questions}
          <div className="questions-section">
            <div>
              Question
            </div>
            <div>
              keyword
            </div>
          </div>
          <div className="add-buttons">
            <div style={{display: 'flex',width: 'fit-content',flexDirection: 'column'}}>
            <Button text={'Add Question'} />
            <Button text={'Add Keyword'} />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="  w-full flex flex-col md:grid grid-cols-4 ">
        <div className=" col-span-1 bg-gray-200 border-r-2 border-gray-600">
          <div className="px-6 flex flex-col border-b border-gray-700 pb-10 items-start space-y-2">
            <div className="relative pt-10 w-full px-2">
              
            </div>

            <div className=" flex justify-center items-center">
              <p className=" bg-white p-2 rounded-md text-xs font-bold">
                Start Time
              </p>
              <p className=" bg-white p-2 rounded-md text-xs font-bold">
                {" "}
                Test Duration
              </p>
            </div>
            <p className=" bg-white p-2 rounded-md text-xs font-bold">
              Live Duration
            </p>
          </div>
          <div className=" p-3 flex border-b pb-10 border-gray-700 justify-center items-center flex-col">
            <p className=" w-full text-xl font-bold ">Description</p>
            <textarea
              className=" w-full rounded-md font-xs p-2"
              cols="30"
              rows="6"
              placeholder="Enter your text here..."
            ></textarea>
          </div>
          <div className=" flex w-[80%] p-3  flex-col">
            <p className=" text-xl font-bold">Rules</p>
            <input
              className=" px-3 py-1 mx-3 my-2 border shadow-md rounded-lg"
              type="text"
            />
            <input
              className=" px-3 py-1 mx-3 my-2 border shadow-md rounded-lg"
              type="text"
            />
            <input
              className=" px-3 py-1 mx-3 my-2 border shadow-md rounded-lg"
              type="text"
            />
            <button className="bg-[#01082D] mx-4 my-2 shadow-lg rounded-md text-white w-[110px]">
              Add New Test
            </button>
          </div>
        </div>

        <div className=" col-span-3 flex-col p-3 flex justify-center items-center ">
          <Button text="Add Question" />
        </div>
      </div> */}
    </div>
  );
}

function RuleText({onSave,onRemove,rules,ruleInput,onChange,rule}) {
  return<div className="ruletext">
    {rule.length === 0 ? <InputText val={ruleInput} onchange={onChange} valid={true} width={230} /> : <p className="p-rule">{rule}</p>}
    {rule.length === 0 ? <div style={{display: 'flex'}}><Button onclick={onRemove} icon="times-circle" />
    <Button onclick={onSave} icon="add" /> </div>: <div style={{display: 'flex'}}><Button onclick={onRemove} icon="times-circle" /> </div>}
  </div>
}

export default NewTestAdd;

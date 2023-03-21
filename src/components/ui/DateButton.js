import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react'
import DateTimePicker from 'react-datetime-picker';
import { FormateDate } from '../util/DateFormater';
import './DateButton.css'

export default function DateButton({val,text,onChange,display,clickHandler}) {
    console.log(display,val,'DateButon')
  return (
    <div onClick={clickHandler} className='date-button'>
        <FontAwesomeIcon icon={"calendar"} color={'#000'} style={{marginRight: '5px'}} />
        {display ? <DateTimePicker onChange={ onChange
        } value={val} autoFocus={true} minDate={new Date()} /> : <div>{`${val ? FormateDate(val) : text}`}</div>}
    </div>
  )
}

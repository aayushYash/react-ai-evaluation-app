import React, { useState } from 'react'
import './ToggleButton.css'

export default function ToggleButton({ group,changeHandler }) {

    const notCheckedColor = '#C8C8C8';


  return (
    <div className='toggleContainer' onChange={changeHandler} >

            <span className='toggleButtonContainer'>
                <input type='radio' value='Student' name={group} className='toggleButton' id='student' defaultChecked />
                <label className='toggleLabel'>Student</label>
                <label></label>
            </span>
            <span className='toggleButtonContainer'>
                <input type='radio' value='Teacher' name={group} className='toggleButton' />
                <label className='toggleLabel'>Teacher</label>
                <label className='dummy'></label>
            </span>
       
    </div>
  )
}

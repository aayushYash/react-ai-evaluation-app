import React from 'react'
import './RadioGroupButton.css'

export default function RadioGroupButton({ legend, buttonsText, group, changeHandler }) {


  return (
    <fieldset className='radioFieldset'>
        <legend className='legend'>
            {legend}
        </legend>
        <div className='radioContainer' onChange={changeHandler}>
        {buttonsText.map((buttonText, index) => {
            return<span key={index} className='radio'>
              <input type='radio' value={buttonText} name={group} className='radioButton' />
              <label className='radioLabel'>{buttonText}</label>
              
            </span>
        })}
        </div>

    </fieldset>
  )
}

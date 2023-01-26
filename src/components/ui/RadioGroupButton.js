import React from 'react'

export default function RadioGroupButton({ legend, buttonsText }) {
  return (
    <fieldset>
        <legend>
            {legend}
        </legend>
        <div>
        {buttonsText.map((buttonText) => {
            
        })}
        </div>

    </fieldset>
  )
}

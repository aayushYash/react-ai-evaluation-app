import React from 'react'
import './Form.css'

export default function Form({submitHandler, children}) {
  return (
    <div className='Form'>
        {children}  
    </div>
  )
}

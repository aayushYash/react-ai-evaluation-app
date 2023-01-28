import React from 'react'
import Footer from '../components/general/Footer'
import Header from '../components/general/Header'

export default function RegisterScreen() {
  return (
    <div>
        <Header />
        {/* <div className='loginPageBody'>
            <div className='leftBody'>
                <img src='' />
            </div>
            <div className='rightBody'>
            <Form>
                <ToggleButton group='typeofuser' changeHandler={ToggleHandler} />
                <span style={{'fontWeight': 700,'margin' : '10px 0'}}>LOGIN</span>
                <GoogleButton text='Continue with' />
                <span>
                    <legend>OR</legend>
                </span>
                <InputText val={emailId} onchange={OnChangeHandler} icon='envelope' type={'text'} />
                <InputText val={emailId} onchange={OnChangeHandler} icon='lock' type={'password'} />

                <p onClick={ForgotHandler} style={{'color': '#1947FF' , 'cursor': 'pointer', 'width': '200px'}} >Forgot Password ?</p>
                <Button text='Login' icon='caret-right' />
            </Form>
            </div>
        </div> */}
        <Footer position='absolute' />
    </div>
  )
}

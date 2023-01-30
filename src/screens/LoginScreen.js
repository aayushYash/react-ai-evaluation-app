import React, { useState, useEffect } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

import Footer from '../components/general/Footer'
import Header from '../components/general/Header'
import Button from '../components/ui/Button'
import Form from '../components/ui/Form'
import GoogleButton from '../components/ui/GoogleButton'
import InputText from '../components/ui/InputText'
import ToggleButton from '../components/ui/ToggleButton'
import './LoginScreen.css'

export default function LoginScreen() {

    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');


    const ForgotHandler = () => {
        console.log('click forgot handler')
    }

    const onEmailChange = (e) => {
        setEmailId(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.val)
    }

    const ToggleHandler = (e) => {
        console.log(e.target.value)
    }

    // firebase functionality below 👇.


    const LoginHandler = () => {
        // implement firebase login with password
    }

    const LoginWithGoogle = () => {
        console.log('Login with google');
    }

  return (
    <div className='loginPage'>
        <Header />
        <div className='loginPageBody'>
            <div className='leftBody'>
            <Player
                autoplay
                loop
                src="https://assets4.lottiefiles.com/packages/lf20_jcikwtux.json"
                style={{ height: '300px', width: '300px' }}
            >
            </Player>
            </div>
            <div className='rightBody'>
            <Form>
                <ToggleButton group='typeofuser' changeHandler={ToggleHandler} />
                <span style={{'fontWeight': 700,'margin' : '10px 0'}}>LOGIN</span>
                <GoogleButton text='Continue with' onClickHandler={LoginWithGoogle} />
                <span>
                    <legend>OR</legend>
                </span>
                <InputText val={emailId} onchange={onEmailChange} icon='envelope' type={'text'} />
                <InputText val={password} onchange={onPasswordChange} icon='lock' type={'password'} />

                <p onClick={ForgotHandler} style={{'color': '#1947FF' , 'cursor': 'pointer', 'width': '300px'}} >Forgot Password ?</p>
                <Button text='Login' icon='caret-right' onclick={LoginHandler} />
            </Form>
            </div>
        </div>
        <Footer position='absolute' />
    </div>
  );
}

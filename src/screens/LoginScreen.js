import React from 'react'
import Footer from '../components/general/Footer'
import Header from '../components/general/Header'
import Form from '../components/ui/Form'
import GoogleButton from '../components/ui/GoogleButton'

export default function LoginScreen() {
  return (
    <div className='loginPage'>
        <Header />
        <div className='loginPageBody'>
            <div className='leftBody'>
                <img src='' />
            </div>
            <Form>
                <GoogleButton text='Continue with' />
            </Form>
        </div>
        <Footer position='absolute' />
    </div>
  );
}

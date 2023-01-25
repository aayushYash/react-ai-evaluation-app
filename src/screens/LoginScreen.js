import React from 'react'
import Footer from '../components/general/Footer'
import Header from '../components/general/Header'

export default function LoginScreen() {
  return (
    <div className='loginPage'>
        <Header />
        <div className='loginPageBody'>
            <div className='leftBody'>
                <img src='' />
            </div>
            <div>
                <div className='socialMediaAuth'>
                    <span>
                        <img />
                    </span>
                    <span>
                        <img />
                    </span>
                </div>
                {/* <form onSubmit={submitHandler}>

                </form> */}
            </div>
        </div>
        <Footer />
    </div>
  )
}

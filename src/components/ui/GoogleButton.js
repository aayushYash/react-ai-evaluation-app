import React, { useState } from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import './GoogleButton.css';

export default function SocialMediaButton({text, onClickHandler}) {

  return (
    <div onClick={onClickHandler} className='googleButton'>
      <span className='buttonText'>{text}</span>
      
      <Player
        autoplay
        loop
        src="https://assets1.lottiefiles.com/private_files/lf30_xRDQab.json"
        style={{ height: '50px', width: '50px' }}
      >
      </Player>
    </div>
  )
}

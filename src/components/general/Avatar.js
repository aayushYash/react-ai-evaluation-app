import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'
import './Avatar.css'

export default function Avatar({user, loading, onclick}) {
  return (
    <div className='avatar' onClick={onclick}>
        {user && <img src='*' />}
        {loading && <Player 
        src={'https://assets4.lottiefiles.com/packages/lf20_GjrUw8.json'}
        autoplay
        loop>
        </Player>}
    </div>
  )
}

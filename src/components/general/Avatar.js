import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'
import './Avatar.css'

export default function Avatar({user, loading, onclick,children}) {
  return (
    <div className='avatar' onClick={onclick}>
    
        {(user && user.photoURL) ? <img src={user.photoURL} style={{borderRadius: '50%'}} /> : <FontAwesomeIcon icon={'fa-solid fa-user'} />} 
        {loading && <Player 
        src={'https://assets4.lottiefiles.com/packages/lf20_GjrUw8.json'}
        autoplay
        loop>
        </Player>}
        {children}
    </div>
  )
}

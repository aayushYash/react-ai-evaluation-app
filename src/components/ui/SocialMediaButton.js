import React, { useState } from 'react'
import GoogleIcon from '@mui/icons-material/Google';

export default function SocialMediaButton({text,socialmedia}) {

    const [socialmedia, setSocialmedia] = useState(socialmedia);

    console.log(socialmedia,"hloo")

  return (
    <div>
        <GoogleIcon />
        <span>{text}</span>
    </div>
  )
}

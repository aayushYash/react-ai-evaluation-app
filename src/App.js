import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingScreen from './screens/LandingScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingScreen />} />
        <Route path='login' element={<LoginScreen />} />
        <Route  path='register' element={<RegisterScreen />} />
        {/* <Route path='StudentDashboard' element={<StudentDashboard />}/> */}
      </Routes>
    </Router>
  )
}


import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import Navbar from './Components/Navbar'
import Home from './Components/Home'
import About from './Components/About'
import Predict from './Components/Predict'
import Contact from './Components/Contact'


function App() {
  return (
    <div>
      <Navbar/>
      <Home/>
      <About/>
      <Predict/>
      <Contact/>

    </div>
    
    

    
  );
}

export default App;

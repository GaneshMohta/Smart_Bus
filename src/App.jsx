import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import viteLogo from '/vite.svg'
import './App.css'
import Homepage from './component/Homepage';
import Cond_Data from './component/Cond_Data';
import Header from './component/Header';
import Login from './component/signup/login';
import User from './component/User';
import Payment from './component/payment/Payment';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
        <Route path='/' element={<Homepage />}></Route>
        <Route path='/cond_data' element={<Cond_Data />}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/User' element={<User />}></Route>
        <Route path='/recharge' element={<Payment/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App

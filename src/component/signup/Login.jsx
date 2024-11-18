import React, { useState } from 'react';
import './sign-in.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [val, setVal] = useState("user");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://smart-bus-5g0q.onrender.com/val/login', {
        id: user,
        password: pass,
        type: val
      });
      console.log(response.data)

      if(val=="bus"){
        localStorage.setItem('busId',response.data.bus.bus_id)
        navigate('/cond-page');
      }
      else if(val=="user"){
        localStorage.setItem('userId',response.data.user.user_id);
        localStorage.setItem('userName',response.data.user.user_name);

        navigate('/cond-page')
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div>
    <div style={{ backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

      <div className='reg-main-flex'>

        <div className="reg-img">
          <img style={{borderRadius:'10%'}} src='https://www.itf-oecd.org/sites/default/files/styles/panopoly_image_original/public/shutterstock_1608783049_450px.jpg?itok=76eIsUBm' alt='Login' />
        </div>
        <div className='reg-con'>
          <h1>Login</h1>
          <form className='f1' onSubmit={handleSubmit}>
            <input
              type='text'
              className='reg-in'
              placeholder='User_id(U001)/Bus_Id(B001)'
              onChange={(e) => setUser(e.target.value)}
              value={user}
            />
            <input
              type='password'
              className='reg-in'
              placeholder='Card_no(G4K33V1M)/BusNo(1234567891)'
              onChange={(e) => setPass(e.target.value)}
              value={pass}
            />
            <div style={{ display: 'flex' }}>
              <input
                type='radio'
                value="user"
                name='userType'
                id='user'
                checked={val === "user"} // Bind the selected value to state
                onChange={() => setVal("user")}
              />
              <label htmlFor='user'>User</label>
              <input
                type='radio'
                value="bus"
                name='userType'
                id='bus'
                checked={val === "bus"}
                onChange={() => setVal("bus")}
              />
              <label htmlFor='bus'>Bus</label>
            </div>
            <button className='btn' type='submit'>Login</button>
          </form>
          <Link style={{position:'relative',left:'10px'}} to='/register'>Register</Link>
          <Link style={{position:'relative',left:'10px'}} to='/cond-page'>Back</Link>
        </div>
      </div>

    </div>
    <div className='com-name'>SMART BUS</div>
    </div>
  );
}

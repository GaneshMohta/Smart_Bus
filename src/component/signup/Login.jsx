import React, { useState } from 'react';
import './sign-in.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [val, setVal] = useState("user");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/val/login', {
        id: user,
        password: pass,
        type: val
      });
      console.log(response.data);

      if(val=="bus"){
        navigate('/');
      }
      else if(val=="user"){
        navigate('/user')
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div style={{ backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className='reg-main-flex'>
        <div className="reg-img">
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbBDjsdSPrlLpuvho0921PFbISsgOfBwjWRw&s' alt='Login Illustration' />
        </div>
        <div className='reg-con'>
          <h1>Login</h1>
          <form className='f1' onSubmit={handleSubmit}>
            <input
              type='text'
              className='reg-in'
              placeholder='User_id/Bus_Id'
              onChange={(e) => setUser(e.target.value)}
              value={user}
            />
            <input
              type='password'
              className='reg-in'
              placeholder='Card_no/BusNo'
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
            <button type='submit'>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

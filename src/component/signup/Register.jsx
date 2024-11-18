import React, { useState } from 'react';
import './sign-in.css'
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [author, setAuthor] = useState(null);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');




  const handleSubmit = async(e) => {
    e.preventDefault();

    const payload = {
      author,
      name,
      number,
      email
    }

    await axios.post('http://localhost:3000/register',payload)
    .then(response => {
      alert('Registration successful The team contact u soon through email');
      console.log(response.data);
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
    };

  return (
    <div style={{ backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="reg-main-flex1">

        {/* <div>
          <img className='register-img' src='https://www.itf-oecd.org/sites/default/files/styles/panopoly_image_original/public/shutterstock_1608783049_450px.jpg?itok=76eIsUBm' alt="Registration"/>
        </div> */}

        <div className="reg">
          <h1>Request to Register</h1>
          <div >

            <button className='btn' onClick={() => setAuthor('user')}>User</button>
            <button className='btn' onClick={() => setAuthor('bus')}>Bus</button>
          </div>
        </div>

        <div className="reg-con1">

          {author === 'user' && (
            <div>
              <h1>Hey User</h1>
              <form className="f2" onSubmit={handleSubmit}>
                <input
                  className="reg-in1"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="reg-in1"
                  type="text"
                  name="number"
                  placeholder="Number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
                <input
                  className="reg-in1"
                  type="text"
                  name="email"
                  placeholder="email@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className='btn' type="submit">Submit</button>
              </form>
            </div>
          )}

          {author === 'bus' && (
            <div>
              <h1>Hey Conductor</h1>
              <form className="f2" onSubmit={handleSubmit}>
                <input
                  className="reg-in1"
                  type="text"
                  name="name"
                  placeholder="Bus Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="reg-in1"
                  type="text"
                  name="number"
                  placeholder="Bus Number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
                <input
                  className="reg-in1"
                  type="text"
                  name="email"
                  placeholder="bus@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className='btn' type="submit">Submit</button>
              </form>
            </div>
          )}
          <Link className='lgn' to='/'>Login</Link>
        </div>
      </div>
    </div>
  );
}

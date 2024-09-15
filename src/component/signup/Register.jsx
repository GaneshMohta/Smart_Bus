import React from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
    return (
      <div>
        <div className='reg-main-flex'>
          <div>
           <img src=''/>
          </div>
          {/*  */}
          <div className='reg-con'>
              <h1>Register a New Card</h1>
              <p>already Register? <Link to='/login'>Login</Link></p>
              <form>
                <input type='text' className='reg-in' placeholder=''/>
                <input type='text'  className='reg-in' placeholder='card_no'/>
                <input type='text'  className='reg-in' />
              </form>
          </div>
        </div>


      </div>
    )
  }

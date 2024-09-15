import React from 'react'
import Header from './Header'
import { Link } from 'react-router-dom'

export default function User() {
  return (
    <div>
      <Header/>
      <div className='m1'>
            <Link to='/recharge'>
            <div className='cond_btn'>Recharge</div>
            </Link>
      </div>
      <div className='m1'>
            <Link to='/Trips'>
            <div className='cond_btn'>Past Trips</div>
            </Link>
      </div>
      <div className='m1'>
            <Link to='/recharge'>
            <div className='cond_btn'>Card Amount</div>
            </Link>
      </div>
    </div>
  )
}

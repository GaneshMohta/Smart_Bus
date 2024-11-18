import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import './component.css'

export default function CurrentTrips() {
  const [ticket , setTicket] = useState([]);
  const userId = localStorage.getItem('userId');
  let userName;
  if (userId) {
    userName = localStorage.getItem('userName');
}

  useEffect(()=>{
    const fetchData =async()=>{
        const res = await axios.get('https://smart-bus-5g0q.onrender.com/user/curr-trips',{
            params:{
                user_id:userId
            },
        })
        setTicket(res.data);
    }

    fetchData();
  },[userId]);
  console.log("hey ",ticket)

  if(ticket.length === 0){
    return <div>
        <div className='profile-main'>
        <div className="prof-part1"></div>
        <div className="prof-part2"></div>
        </div>
        <div className='prof-absolute'>
            <h1>NO TICKETS EXISTS</h1>
            <Link to="/cond-page" style={{ textDecoration: 'none',color:'red' }}>
                    Back
            </Link>
        </div>
    </div>
  }
  return (
    <div>
    <div>
        <div className="profile-main">
            <div className="prof-part1"></div>
            <div className="prof-part2"></div>
        </div>
        <div className="prof-absolute">

            <div className='tickets'>
                <h2>{userName}</h2>
                <p>₹:{ticket[0]?.amount_debited}</p>
                <p>{ticket[0]?.destination}</p>
                <p>{new Date(ticket[0]?.record_timestamp)}</p>
            </div>

            <br />
            {userId ? (
                <Link to="/cond-page" style={{ textDecoration: 'none' }}>
                    Back
                </Link>
            ) : null}

        </div>
    </div>
</div>
  )
}

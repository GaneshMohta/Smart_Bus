import React, { useState, useEffect } from 'react';
import './component.css';
import axios from 'axios';
import Header from './Header';
import { Link } from 'react-router-dom';

export default function Cond_Data() {
    const [date, setDate] = useState('');
    const [area, setArea] = useState('');
    const [name, setName] = useState([]);

    const busId = localStorage.getItem('busId');
    console.log(busId);

    // Fetch data based on date or area
    const fetchData = async () => {
        try {
            console.log("Fetching data...");
            const response = await axios.get("http://localhost:3000/api/bus-travel", {
                params: {
                    bus_id: busId,  // Adjust based on actual logic
                    travel_date: date || undefined,
                    destination: area || undefined,  // Use undefined if area is not provided
                },
            });
            setName(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error.response);
        }
    };

    useEffect(() => {
        if (area || date) fetchData();  // Conditionally fetch data based on area or date
    }, [area, date]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();  // Call fetchData on form submit
    };

    return (
        <div>
            <Header />
            <span style={{position:'absolute',top:'4px',left:'1vw',fontWeight:'bolder'}}>
                <Link to='/cond-page' style={{textDecoration:'none',color:'white'}}>👈</Link>
            </span>
            <div style={{ position: 'absolute', top: '5%', left: '90vw', fontWeight: 'bolder',height:'40px',width:'auto',borderRadius:'50%',backgroundColor:'ORANGE',
                display:'flex',justifyContent:'center',alignItems:'center',fontSize:'15px',padding:'10px'
             }}>
                <Link to='/profile' style={{ textDecoration: 'none', color: 'white' }}>{busId}</Link>
            </div>
            <div className='cond_main'>
                <form onSubmit={handleSubmit} >
                    <div className='cond_main1'>
                        <input className='b1' type='date' value={date} onChange={(e) => setDate(e.target.value)} />
                        <input className='b1' type='text' placeholder='Enter Area' value={area} onChange={(e) => setArea(e.target.value)} />
                    </div>
                    <br />
                    <div style={{textAlign:'center'}}>
                        <button className='btn' type='submit'> Fetch </button>
                    </div>
                </form>
            </div>
            <div className='fetch'>
                <h1>Fetched Details</h1>
                <table border={2}>
                    <thead>
                        <tr>
                            <th>User-Card</th>
                            <th>Destination</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {name.map((data) => (
                            <tr key={data.travel_id}>
                                <td>{data.user_card}</td>
                                <td>{data.destination}</td>
                                <td>{data.amount_debited}</td>
                                <td>{data.travel_date}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={4}>Total Amount: {name.reduce((total, item) => total + item.amount_debited, 0)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

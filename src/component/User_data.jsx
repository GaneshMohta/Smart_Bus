import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

export default function User_data() {
    const [period, setPeriod] = useState('1week');
    const [name, setName] = useState([]);

    const userId = localStorage.getItem('userId');
    console.log(userId);
    const userName = localStorage.getItem('userName');
    console.log(userName);

    // Fetch data based on period
    const fetchData = async () => {
        try {
            console.log("Fetching data...");
            const response = await axios.post("https://smart-bus-5g0q.onrender.com/user/Travel", {
                user_id: userId,
                period: period,
            });
            setName(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error.response);
        }
    };

    useEffect(() => {
        fetchData();
    }, [period]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    return (
        <div>
            <Header />
            <span style={{position:'absolute',top:'4px',left:'1vw'}}>
             <Link to="/cond-page" style={{ textDecoration: 'none' }}>
                👈
             </Link></span>
            <span style={{ position: 'absolute', top: '4px', left: '1vw', fontWeight: 'bolder' }}>
                <Link to='/cond-page' style={{ textDecoration: 'none', color: 'white' }}>←</Link>
            </span>
            <span className='prof-det'>
                <Link to='/profile' style={{ textDecoration: 'none', color: 'white' }}>{userName}</Link>
            </span>
            <div className='cond_main'>
                <form onSubmit={handleSubmit}>
                    <div className='cond_main1'>
                        <select className='b1' value={period} onChange={(e) => setPeriod(e.target.value)}>
                            <option value="1week">Last 1 Week</option>
                            <option value="2weeks">Last 2 Weeks</option>
                            <option value="1month">Last 1 Month</option>
                            <option value="1year">Last 1 Year</option>
                        </select>
                    </div>
                    <br />
                    <div style={{ textAlign: 'center' }}>
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

import React, { useState, useEffect } from 'react';
import './component.css';
import axios from 'axios';
import Header from './Header';

export default function Cond_Data() {
    const [date, setDate] = useState('');
    const [area, setArea] = useState('');
    const [name, setName] = useState([]);

    useEffect(() => {
        if (area || date) fetchData();  // Conditionally fetch data based on area or date
    }, [area, date]);

    // Fetch data based on date or area
    const fetchData = async (e) => {
        e.preventDefault();
        try {
            console.log("hii")
            const response = await axios.get("http://localhost:3000/api/bus-travel", {
                params:{
                    bus_id: 'B001',  // Adjust based on actual logic
                    travel_date: date || undefined,
                    destination: area || undefined,  // Use undefined if area is not provided

                },// Use undefined if date is not provided
            });
            setName(response.data);
            console.log(name);
        } catch (error) {
            console.log(error.response);
        }
    };

    return (
        <div>
            <Header />
            <div className='cond_main'>
                <form onSubmit={fetchData} >
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
                <table border={2} >
                    <tr>
                        <th>User-Card</th>
                        <th>Destination</th>
                        <th>Amount</th>
                    </tr>
                    {name.map((data) => (
                        <tr>
                        <td key={data.travel_id}>
                            {data.user_card} {/* Adjust according to your backend data */}
                        </td>
                        <td>{data.destination}</td>
                        <td>{data.amount_debited}</td>
                        <td>{data.travel_date}</td>

                        </tr>
                    ))}
                    </table>
            </div>
        </div>
    );
}

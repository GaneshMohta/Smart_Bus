import React, { useEffect, useState } from 'react';
import './component.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Profile() {
    const [details, setDetails] = useState({});
    const userId = localStorage.getItem('userId');
    const BusId = localStorage.getItem('busId');
    const navigate = useNavigate();
    let userName;

    if (userId) {
        userName = localStorage.getItem('userName');
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:3000/profile', {
                    params: {
                        user_id: userId || undefined,
                        bus_id: BusId || undefined,
                    },
                });
                setDetails(res.data);
            } catch (e) {
                console.log(e);
            }
        };
        if (userId || BusId) {
            fetchData();
        }
    }, [userId, BusId]);

    console.log(details);


    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('busId');
        localStorage.removeItem('userName');
        navigate('/');
    };

    return (
        <div>
            <div>
                <div className="profile-main">
                    <div className="prof-part1"></div>
                    <div className="prof-part2"></div>
                </div>
                <div className="prof-absolute">
                    <h3>ID: {details?.user_id || details?.bus_id}</h3>
                    <h3>Phone No: {details?.user_phno || details?.bus_no}</h3>
                    {
                       (userId)?(
                            <h3>Amount: {details?.card_amount}</h3>
                        ):null
                    }


                    <div
                        style={{
                            width: '60px',
                            height: '30px',
                            backgroundColor: 'bisque',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '5%',
                            cursor: 'pointer',
                        }}
                        onClick={handleLogout}
                    >
                        Log out
                    </div>

                    <br />
                    {userId ? (
                        <Link to="/User" style={{ textDecoration: 'none' }}>
                            Back
                        </Link>
                    ) : BusId ? (
                        <Link to="/cond-page" style={{ textDecoration: 'none' }}>
                            Back
                        </Link>
                    ) : null}

                    <div className="prof-absolute2">{userName || details?.bus_owner}</div>
                </div>
            </div>
        </div>
    );
}

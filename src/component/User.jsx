// import React from 'react'
// import Header from './Header'
// import { Link } from 'react-router-dom'
// import './component.css'

// export default function User() {

//   const userName = localStorage.getItem('userName');

//   return (
//     <div>
//       <Header/>
//       <span style={{ position: 'absolute', top: '5%', left: '90%', fontWeight: 'bolder',height:'auto',width:'auto',padding:'10px',borderRadius:'50%',backgroundColor:'ORANGE',
//                 display:'flex',justifyContent:'center',alignItems:'center',fontSize:'15px;'
//              }}>
//                 <Link to='/profile' style={{ textDecoration: 'none', color: 'white' }}>{userName}</Link>
//       </span>
//       <div className='user_main'>
//       <div className='m1'>
//             <Link to='/recharge'>
//             <div className='cond_btn'>Recharge</div>
//             </Link>
//       </div>
//       <div className='m1'>
//             <Link to='/user-travel'>
//             <div className='cond_btn'>Past Trips</div>
//             </Link>
//       </div>
//       <div className='m1'>
//             <Link to='/curr-trips'>
//             <div className='cond_btn'>Current Trips</div>
//             </Link>
//       </div>
//       </div>
//     </div>
//   )
// }

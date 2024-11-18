import { Link } from 'react-router-dom'
import './component.css'
import Header from './Header'
function Homepage() {
  const busId=localStorage.getItem('busId');
  const userId = localStorage.getItem('userId');

  if(busId){
  return (
  <div>
  <div style={{height:'9vh', margin:'0vh',display:'flex',justifyContent:'space-between',alignItems:"center",paddingInlineStart:'5px',paddingInlineEnd:'5px',backgroundColor:"white",border:'2px solid white',borderBottomColor:'orange'}}>
    <div></div>
    <div className='hp'>SmartBus</div>
    <Link to='/profile'><div style={{borderRadius:'50%',backgroundColor:'orangered',width:'40px',height:'40px',display:"flex",justifyContent:"center",alignItems:"center",fontSize:'15px'}}>{busId}</div></Link>
  </div>
  <div className='bg-img' style={{display:'flex', height:'90vh'}}>

      <div className='cond_ui'>

        <img className='cond_img' src='https://www.itf-oecd.org/sites/default/files/styles/panopoly_image_original/public/shutterstock_1608783049_450px.jpg?itok=76eIsUBm' />

      </div>
      <div className='conductor_main'>

            <div className='m1'>
            <Link to='/cond_data'>
            <div className='cond_btn'>Data Sheet</div>
            </Link>
            </div>
            <div className='m1'>
            <Link to='/recharge'>
            <div className='cond_btn'>Recharge</div>
            </Link>
            </div>
        </div>

      {/* </div> */}

    </div>
    </div>
  )
}else {
  return(
    <div>
       <div style={{height:'9vh', margin:'0vh',display:'flex',justifyContent:'space-between',alignItems:"center",paddingInlineStart:'5px',paddingInlineEnd:'5px',backgroundColor:"white",border:'2px solid white',borderBottomColor:'orange'}}>
    <div></div>
    <div className='hp'>SmartBus</div>
    <Link to='/profile'><div style={{borderRadius:'50%',backgroundColor:'orangered',width:'40px',height:'40px',display:"flex",justifyContent:"center",alignItems:"center",fontSize:'15px'}}>{userId || null}</div></Link>
  </div>
  <div className='bg-img' style={{display:'flex', height:'90vh'}}>

      <div className='cond_ui'>
        {/* <h1 className='typewriter'>Hii Conductor </h1> */}
        <img className='cond_img' src='https://www.itf-oecd.org/sites/default/files/styles/panopoly_image_original/public/shutterstock_1608783049_450px.jpg?itok=76eIsUBm' />
        {/* <h1>Have a nice day</h1> */}
      </div>
      <div className='conductor_main'>

            <div className='m1'>
            <Link to='/user-travel'>
            <div className='cond_btn'>pastTrips</div>
            </Link>
            </div>
            <div className='m1'>
            <Link to='/recharge'>
            <div className='cond_btn'>Recharge</div>
            </Link>
            </div>
            <div className='m1'>
            <Link to='/curr-trips'>
            <div className='cond_btn'>Current Trips</div>
            </Link>
            </div>
      </div>

      {/* </div> */}

    </div>
    </div>
  );
}
}


export default Homepage;

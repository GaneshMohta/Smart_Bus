import { Link } from 'react-router-dom'
import './component.css'
import Header from './Header'
function Homepage() {
  const busId=localStorage.getItem('busId');
  return (
  <div>
  <div style={{height:'9vh', margin:'0vh',display:'flex',justifyContent:'space-between',alignItems:"center",paddingInlineStart:'5px',paddingInlineEnd:'5px',backgroundColor:'#795757'}}>
    <div></div>
    <div style={{fontWeight:"bolder",fontSize:'7vh'}}>SmartBus</div>
    <Link to='/profile'><div style={{borderRadius:'50%',backgroundColor:'orange',width:'40px',height:'40px',display:"flex",justifyContent:"center",alignItems:"center",fontSize:'15px'}}>{busId}</div></Link>
  </div>
  <div style={{display:'flex', height:'90vh'}}>

      <div className='cond_ui'>
        {/* <h1 className='typewriter'>Hii Conductor </h1> */}
        <img className='cond_img' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC6Br4x4iQdSsuUsR5IuDsAJAFmXNbKTb0Pw&s' />
        {/* <h1>Have a nice day</h1> */}
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
}

export default Homepage

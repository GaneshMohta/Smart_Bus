import { Link } from 'react-router-dom'
import './component.css'
import Header from './Header'
function Homepage() {
  return (
  <div>
  <div style={{height:'9vh', margin:'1vh',display:'flex',justifyContent:'space-between',alignItems:"center",paddingInlineStart:'5px',paddingInlineEnd:'5px'}}>
    <div>HII</div>
    <div>Byy</div>
    <div>User</div>
  </div>
  <div style={{display:'flex',backgroundColor:"black", height:'90vh'}}>

      <div className='cond_ui'>
        {/* <h1 className='typewriter'>Hii Conductor </h1> */}
        <img className='cond_img' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4XVtq6jyC5Hmxs-wyF6AntKAShdCvKr7TUg&s' />
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

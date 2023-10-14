import React from 'react'
import '../stylesCounter/profile.css'
import CounterNav from '../Navigation/CounterNav'
import dp from '../../uploads/dpdp.jpg'
import { Link } from 'react-router-dom'

function Profile() {
  return (
    <div className='cPPage'>
        <CounterNav />
        <div className='cProfile'>
            <div className='cProfileInfo'>
                <img src={dp} alt="" />
                <div className='cProfileDetails'>
                    <h3>First Name:</h3> <span>Stella</span>
                    <h3>Last Name:</h3> <span>Lodan</span>
                    <h3>Phone Number:</h3> <span>+234 813 220 5569</span>
                    <h3>Address:</h3> <span>24 I.T. Igbani Street, Jabi 900108, Abuja</span>
                </div>
            </div>
            <div className='cUserandPass'>
                <h4>Username:</h4> <span>Counter001SL</span>
                <Link to='/counter/change-password'>
                    <button>Change Password</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Profile
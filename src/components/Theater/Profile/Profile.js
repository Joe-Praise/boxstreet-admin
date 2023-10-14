import React from 'react'
import TheaterNav from '../Navigation/TheaterNav'
import dp from '../../uploads/dp-thumbnail.png'
import '../stylesTheater/profile.css'

function Profile() {
  return (
    <div className='tPPage'>
        <TheaterNav />
        <div className='tProfile'>
            <div className='tProfileInfo'>
                <img src={dp} alt="" />
                <div className='tProfileDetails'>
                    <h3>First Name:</h3> <span>Odogwu</span>
                    <h3>Last Name:</h3> <span>OBO</span>
                    <h3>Phone Number:</h3> <span>+234 813 220 5569</span>
                    <h3>Address:</h3> <span>24 I.T. Igbani Street, Jabi 900108, Abuja</span>
                </div>
            </div>
            <div className='tUserandPass'>
                <h4>Username:</h4> <span>TManager001BO</span>
                <button>Change Password</button>
            </div>
        </div>
    </div>
  )
}

export default Profile
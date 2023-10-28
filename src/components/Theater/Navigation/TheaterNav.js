import React from 'react'
import TheaterSideNav from './TheaterSideNav'
import logo from '../../uploads/Screenshot__335_-removebg-preview (1).png'
import { Link } from 'react-router-dom'

function TheaterNav() {
  const fullname = localStorage.getItem("fullname");
  const cinema = localStorage.getItem("cinema");

  return (
    <header>
      <div className="navHead">
        <nav className="navigation">
          <div>
            <Link to="/theater-admin">
              <img className="logo" src={logo} alt="web logo" />
            </Link>
          </div>
          <div>
            <ul className="navlinks">
              <Link to="/theater-admin" className="textdecor">
                <li className="bsColour">{"Theater Admin - " + cinema}</li>
              </Link>
            </ul>
          </div>
          <div>
            <ul className="navlinks">
                <Link to='/theater-admin/profile' className='textnone'>
                    <li className="from-left-and-back">Welcome, {fullname}</li>
                </Link>
            </ul>
          </div>
        </nav>
      </div>
      <TheaterSideNav />
    </header>
  )
}

export default TheaterNav
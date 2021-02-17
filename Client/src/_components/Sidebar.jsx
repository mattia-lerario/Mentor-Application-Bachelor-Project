import React from 'react'
import avatar from '../media/avatar.jpg'

import { NavLink } from 'react-router-dom';
import {CgProfile} from 'react-icons/cg';
import {RiDashboardFill} from 'react-icons/ri';


function Sidebar() {

  return (
    <div className="Sidebar">
      <ul className="SideList">
        <img className="Avatar" src={avatar}></img>
        <NavLink to="/profile" className="SideLink"><CgProfile /> Profile</NavLink>
        <NavLink to="/dashboard" className="SideLink"><RiDashboardFill /> Dashboard</NavLink>
        <li>Mattia</li>
        <li>Your Alumni</li>
      </ul>
    </div>
  )
}


export {Sidebar};
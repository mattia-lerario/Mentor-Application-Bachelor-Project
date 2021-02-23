import React from 'react'
import avatar from '../media/avatar.jpg'
import { NavLink } from 'react-router-dom';

//React Icons
import {CgProfile} from 'react-icons/cg';
import {GoGraph} from 'react-icons/go';
import {RiDashboardFill} from 'react-icons/ri';
import {GrScheduleNew} from 'react-icons/gr';
import {MdSchedule} from 'react-icons/md';


function Sidebar() {

  return (
    <aside className="Sidebar">
      <ul className="SideList">
        <img className="Avatar" src={avatar}></img>
        <NavLink to="/profile" className="SideLink"><CgProfile /> Profile</NavLink>
        <NavLink to="/dashboard" className="SideLink"><RiDashboardFill /> Dashboard</NavLink>
        <NavLink to="/home" className="SideLink"><GoGraph/> Power ranking</NavLink>
        <NavLink to="/home" className="SideLink"><GrScheduleNew/> Book meeting</NavLink>
        <NavLink to="/home" className="SideLink"><MdSchedule/> My schedule</NavLink>
      </ul>
    </aside>
  )
}


export {Sidebar};
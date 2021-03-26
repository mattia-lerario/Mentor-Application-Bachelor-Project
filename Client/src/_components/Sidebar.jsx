import React from 'react'
import avatar from '../media/avatar.jpg'
import { NavLink } from 'react-router-dom';
import {SidebarWrapper} from '../style/styledcomponents';


//React Icons
import {CgProfile} from 'react-icons/cg';
import {GoGraph} from 'react-icons/go';
import {RiDashboardFill} from 'react-icons/ri';
import {GrScheduleNew} from 'react-icons/gr';
import {MdSchedule} from 'react-icons/md';


function Sidebar(){
  /*
  { match }) {
  const { path } = match;
  const user = accountService.userValue;
  const isUserType = user.role;
  */

  //if(isUserType == "Admin"){

    return (
      <SidebarWrapper>
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
      </SidebarWrapper>
    )

  /*}
  if(isUserType == "Mentor"){

    return (
        <aside className="Sidebar">
          <ul className="SideList">
            
            <img className="Avatar">{user.image}</img>

            <NavLink to="/profile" className="SideLink"><CgProfile /> Profile</NavLink>

            <NavLink to="/dashboard" className="SideLink"><RiDashboardFill /> Dashboard</NavLink>

            <NavLink to="/home" className="SideLink"><GrScheduleNew/> Book meeting</NavLink>

            <NavLink to="/home" className="SideLink"><MdSchedule/> My schedule</NavLink>
          </ul>
        </aside>
    )
  }
  /*

  if(isUserType == "Company"){

    return (
        <aside className="Sidebar">
          <ul className="SideList">
            
            <img className="Avatar">{company.image</img>

            <NavLink to="/profile" className="SideLink"><CgProfile /> Profile</NavLink>

            <NavLink to="/home" className="SideLink"><GrScheduleNew/> Book meeting</NavLink>

            <NavLink to="/home" className="SideLink"><MdSchedule/> My schedule</NavLink>
          </ul>
        </aside>
    )

  }
  */
}


export {Sidebar};
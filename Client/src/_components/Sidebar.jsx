import React, { useState, useEffect } from 'react';
import { NavLink, Route, Link } from 'react-router-dom';
import avatar from '../media/avatar.jpg';
import {SidebarWrapper} from '../style/styledcomponents';
import { Role } from '@/_helpers';
import { accountService } from '@/_services';

//React Icons
import {GoGraph} from 'react-icons/go';
import {FaBars, FaCheckCircle} from 'react-icons/fa';
import {AiOutlineClose, AiOutlineUserAdd} from 'react-icons/ai';
import {MdAssignmentInd} from 'react-icons/md';
import {HiOutlineViewGridAdd} from 'react-icons/hi';

//import { accountService } from '@/_services';
function Sidebar(){
  
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  
  const [user, setUser] = useState({});
    
  useEffect(() => {
      const subscription = accountService.user.subscribe(x => setUser(x));
      return subscription.unsubscribe;
  }, []);

  //const user = accountService.userValue;

  return (
    <>
    <SidebarWrapper>

      <Link to="#" className="menu-bars">
        <FaBars onClick={showSidebar}/>
      </Link>

      {/* If the menubar-symbol is clicked the menubar active and will show menubar active, else show menubar. */}
      <aside className={sidebar ? 'Sidebar active' : 'Sidebar'}>
        <ul className="SideList" onClick={showSidebar}>
          <li>
            <Link className="SideLink" to="#">
              <AiOutlineClose/>
            </Link>
          </li>
          
          {user.role === Role.Admin &&
            <li>
              <NavLink to="/admin/users/add" className="SideLink"><AiOutlineUserAdd /> Add user</NavLink>
            </li>
          }
          {user.role === Role.Admin &&
            <li>
              <NavLink to="/admin/users/add" className="SideLink"><HiOutlineViewGridAdd /> Add company</NavLink>
            </li>
          }
          {user.role === Role.Admin &&
            <li>
              <NavLink to="/admin/companies" className="SideLink"><MdAssignmentInd /> Assign mentor</NavLink>
            </li>
          }
          {user.role === Role.Admin &&
            <li>
              <NavLink to="/admin" className="SideLink"><FaCheckCircle /> Approve hours</NavLink>
            </li>
          }
          {user.role === Role.Mentor &&
            <li>
              <NavLink to="/home" className="SideLink"><GoGraph/> Submit power ranking</NavLink>
            </li>
          }
          {user.role === Role.Mentor &&
            <li>
              <NavLink to="/home" className="SideLink"><GoGraph/> Submit power ranking</NavLink>
            </li>
          }
         
        </ul>
      </aside>
    </SidebarWrapper>
    </>
  )
{/*
  if(user.role === "Admin"){

    return (
      <SidebarWrapper>
        <aside className="Sidebar">
          <ul className="SideList">
            
            <img className="Avatar" src={avatar}></img>
            <NavLink to="/profile" className="SideLink"><CgProfile /> Profile</NavLink>
          
              <NavLink to="/dashboard" className="SideLink"><RiDashboardFill /> Dashboard</NavLink>
        
              <NavLink to="/home" className="SideLink"><GoGraph/> Power ranking</NavLink>
            
            
          </ul>
        </aside>
      </SidebarWrapper>
    )
  }

  if(user.role === "Mentor"){

    return (
      <SidebarWrapper>
        <aside className="Sidebar">
          <ul className="SideList">
            
            <img className="Avatar" src={avatar}></img>
              <NavLink to="/profile" className="SideLink"><CgProfile /> Profile</NavLink>
         
              <NavLink to="/dashboard" className="SideLink"><RiDashboardFill /> Dashboard</NavLink>
        
              <NavLink to="/home" className="SideLink"><GoGraph/> Power ranking</NavLink>
            
              <NavLink to="/home" className="SideLink"><BiCalendarPlus/> Book meeting</NavLink>
          
              <NavLink to="/home" className="SideLink"><MdSchedule/> My schedule</NavLink>
            
          </ul>
        </aside>
      </SidebarWrapper>
    )
  }
  if(user.role === "Company"){

    return (
      <SidebarWrapper>
        <aside className="Sidebar">
          <ul className="SideList">
            
            <img className="Avatar" src={avatar}></img>
              <NavLink to="/profile" className="SideLink"><CgProfile /> Profile</NavLink>
         
              <NavLink to="/dashboard" className="SideLink"><RiDashboardFill /> Dashboard</NavLink>
            
              <NavLink to="/home" className="SideLink"><BiCalendarPlus/> Book meeting</NavLink>
          
              <NavLink to="/home" className="SideLink"><MdSchedule/> My schedule</NavLink>
            
          </ul>
        </aside>
      </SidebarWrapper>
    )*/
  }
}


export {Sidebar};
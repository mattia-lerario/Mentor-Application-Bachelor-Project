import React from 'react'
import avatar from '../media/avatar.jpg'
import { NavLink } from 'react-router-dom';
import {SidebarWrapper} from '../style/styledcomponents';


//React Icons
import {CgProfile} from 'react-icons/cg';
import {GoGraph} from 'react-icons/go';
import {RiDashboardFill} from 'react-icons/ri';
import {BiCalendarPlus} from 'react-icons/bi';
import {MdSchedule} from 'react-icons/md';
//import { accountService } from '@/_services';
function Sidebar(){
  
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const [user, setUser] = useState({});
    
  useEffect(() => {
      const subscription = accountService.user.subscribe(x => setUser(x));
      //return subscription.unsubscribe;
      //
  }, []);

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
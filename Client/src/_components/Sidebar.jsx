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
  const [user, setUser] = useState({});
  
  useEffect(() => {
    const subscription = accountService.user.subscribe(x => setUser(x));
    return subscription.unsubscribe;
}, []);

    // only show nav when logged in
    if (!user) return null;

    return (
      <SidebarWrapper>
        <aside className="Sidebar">
          <ul className="SideList">
            
            <img className="Avatar" src={avatar}></img>
            <NavLink to="/profile" className="SideLink"><CgProfile /> Profile</NavLink>

            {user.role === Role.Admin &&
              <NavLink to="/dashboard" className="SideLink"><RiDashboardFill /> Dashboard</NavLink>
            }
            {user.role === Role.Admin &&
            <NavLink to="/home" className="SideLink"><GoGraph/> Power ranking</NavLink>
            }
            
            {(user.role === Role.Mentor || user.role === Role.Company) &&
              <NavLink to="/home" className="SideLink"><GrScheduleNew/> Book meeting</NavLink>
            }
            {(user.role === Role.Mentor || user.role === Role.Company) &&
            <NavLink to="/home" className="SideLink"><MdSchedule/> My schedule</NavLink>
            }
          </ul>
        </aside>
      </SidebarWrapper>
    )
}


export {Sidebar};
import React, { useState, useEffect } from 'react';
import { NavLink, Route, Link } from 'react-router-dom';

import {SidebarWrapper} from '../style/styledcomponents';
import { Role } from '@/_helpers';
import { accountService } from '@/_services';

//React Icons
import {GoGraph} from 'react-icons/go';
import {FaBars, FaCheckCircle, FaHourglassHalf, FaUserEdit, FaUserCog} from 'react-icons/fa';
import {AiOutlineClose} from 'react-icons/ai';
import {MdAssignmentInd, MdPersonAdd} from 'react-icons/md';
import {HiOutlineViewGridAdd} from 'react-icons/hi';
import {BsGraphUp} from 'react-icons/bs';

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
              <NavLink to="/admin/users/add" className="SideLink"><MdPersonAdd /> Add user</NavLink>
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
              <NavLink to="/companies/powerranking" className="SideLink"><GoGraph/> Submit power ranking</NavLink>
            </li>
          }
          {user.role === Role.Mentor &&
            <li>
              <NavLink to="/companies/updateWorkingHoursMentor" className="SideLink"><FaHourglassHalf/> Submit hours</NavLink>
            </li>
          }
          {user.role === Role.Mentor &&
            <li>
              <NavLink to="/profile/updateMentor" className="SideLink"><FaUserEdit/> Edit profile</NavLink>
            </li>
          }
          {user.role === Role.Mentor &&
            <li>
              <NavLink to="/profile/update" className="SideLink"><FaUserCog/> Update account</NavLink>
            </li>
          }

          
          {user.role === Role.Company &&
            <li>
              <NavLink to="/home" className="SideLink"><BsGraphUp/> Add KPI</NavLink>
            </li>
          }
          {user.role === Role.Company &&
            <li>
              <NavLink to="/home" className="SideLink"><MdPersonAdd/> Add team member</NavLink>
            </li>
          }
          {user.role === Role.Company &&
            <li>
              <NavLink to="/profile/updateMentor" className="SideLink"><FaUserEdit/> Edit profile</NavLink>
            </li>
          }
          {user.role === Role.Company &&
            <li>
              <NavLink to="/profile/update" className="SideLink"><FaUserCog/> Update Account</NavLink>
            </li>
          }
         
        </ul>
      </aside>
    </SidebarWrapper>
    </>
  )
}


export {Sidebar};
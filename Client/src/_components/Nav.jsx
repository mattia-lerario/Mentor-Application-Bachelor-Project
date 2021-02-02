import React, { useState, useEffect } from 'react';
import { NavLink, Route } from 'react-router-dom';

import {MenuWrapper, SidebarWrapper} from '../style/styledcomponents';
import { Role } from '@/_helpers';
import { accountService } from '@/_services';
import {Sidebar} from './Sidebar';

/*for the hamburger-menu-icon: 
import * as FaIcons from "react-icons/fa"; //(because of the * it's possible to import any icon from the react-icons(weblink: https://react-icons.github.io/react-icons/))
*/

function Nav() {
    const [user, setUser] = useState({});
    const items = [
  { name: 'home', label: 'Home' },
  {
    name: 'billing',
    label: 'Billing',
    items: [
      { name: 'statements', label: 'Statements' },
      { name: 'reports', label: 'Reports' },
    ],
  },
  {
    name: 'settings',
    label: 'Settings',
    items: [
      { name: 'profile', label: 'Profile' },
      { name: 'insurance', label: 'Insurance' },
      {
        name: 'notifications',
        label: 'Notifications',
        items: [
          { name: 'email', label: 'Email' },
          {
            name: 'desktop',
            label: 'Desktop',
            items: [
              { name: 'schedule', label: 'Schedule' },
              { name: 'frequency', label: 'Frequency' },
            ],
          },
          { name: 'sms', label: 'SMS' },
        ],
      },
    ],
  },
]
    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x));
        return subscription.unsubscribe;
    }, []);


    // only show nav when logged in
    if (!user) return null;

    return (
      <MenuWrapper>
        <nav className="MenuBar">
          <div className="MenuLinks">

            {/*
            Hamburger-menu-icon
            <NavLink to="/sidebar" className="NavLink"> <FaIcons.FaBars/> </NavLink>
            */}
            
            <NavLink exact to="/" className="NavLink">Home</NavLink>
            <NavLink to="/profile" className="NavLink">Profile</NavLink>
                    
            <NavLink to="/dashboard" className="NavLink">Dashboard</NavLink> 
                    
                    {user.role === Role.Admin &&
                        <NavLink to="/admin" className="NavLink">Admin</NavLink>
                    }
                    {user.role === Role.Admin &&
                        <NavLink to="/companies" className="NavLink">Companies</NavLink>
                    }
                    {user.role === Role.Admin &&
                        <NavLink to="/mentors" className="NavLink">Mentors</NavLink>
                    }
                     {user.role === Role.Mentor &&
                        <NavLink to="/companies" className="NavLink">Companies</NavLink>
                    }
                    <a onClick={accountService.logout} className="NavLink">Logout</a>
                </div>
            </nav>
            <Route path="/admin" component={AdminNav} />
            <Sidebar items={items}/>
        </MenuWrapper>
        
        
    );
}

function AdminNav({ match }) {
    const { path } = match;

    return (
        <nav className="AdminNav">
            <div>
                <NavLink to={`${path}/users`} className="AdminLink">Users</NavLink>
            </div>
        </nav>
    );
}

export { Nav }; 
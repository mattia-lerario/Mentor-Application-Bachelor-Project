import React, { useState, useEffect } from 'react';
import { NavLink, Route } from 'react-router-dom';

import {MenuWrapper} from '../style/styledcomponents';
import { Role } from '@/_helpers';
import { accountService } from '@/_services';

function Nav() {
    const [user, setUser] = useState({});
    {/* Listing the items in the sidebar-menu: */}
    
    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x));
        return subscription.unsubscribe;
    }, []);
    

    // only show nav when logged in
    if (!user) return null;

    return (
        <MenuWrapper>
            <nav className="MenuBar">
                <section className="MenuLinks">

                    <NavLink exact to="/" className="NavLink">Home</NavLink>
                    <NavLink to="/profile" className="NavLink">Profile</NavLink>  
                        
                    {user.role === Role.Admin &&
                        <NavLink to="/dashboard" className="NavLink">Dashboard</NavLink> 
                    }
                    {user.role === Role.Admin &&
                        <NavLink to="/admin" className="NavLink">Admin</NavLink>
                    }
                    <Route path="/admin" component={AdminNav} />
                    {user.role === Role.Admin &&
                        <NavLink to="/mentors" className="NavLink">Mentors</NavLink>
                    }

                    {user.role === Role.Mentor &&
                        <NavLink to="/companies" className="NavLink">Companies</NavLink>
                    }

                    <a onClick={accountService.logout} className="NavLink Logout">Logout</a>
                </section>
            </nav>
        </MenuWrapper>
    );
}

function AdminNav({ match }) {
    const { path } = match;

    return (
                <NavLink to={`${path}/users`} className="NavLink" id="AdminLink">Users</NavLink>
    );
}

export { Nav }; 

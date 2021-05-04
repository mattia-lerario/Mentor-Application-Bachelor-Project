import React, { useState, useEffect } from 'react';
import { NavLink, Route, Link } from 'react-router-dom';

import {MenuWrapper} from '../style/styledcomponents';
import { Role } from '@/_helpers';
import { accountService } from '@/_services';
import {Sidebar } from '@/_components';

//React Icons
import {CgProfile} from 'react-icons/cg';
import {AiFillHome} from 'react-icons/ai';
import {RiDashboardFill} from 'react-icons/ri';
import {GrLogout,GrUserAdmin} from 'react-icons/gr';
import {FaUsers} from 'react-icons/fa';

function Nav() {
    const [user, setUser] = useState({});
    
    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x));
        return subscription.unsubscribe;
    }, []);

    // only show nav when logged in
    if (!user) return null;


    return (
        <MenuWrapper>
        <nav className="MenuBar">
            <Sidebar />
            <section className="MenuLinks">
                <NavLink exact to="/" className="NavLink"><AiFillHome/> Home</NavLink>
                <NavLink to="/profile" className="NavLink"><CgProfile/> Profile</NavLink>  
                    
                {user.role === Role.Admin &&
                    <NavLink to="/dashboard" className="NavLink"><RiDashboardFill/> Companies</NavLink> 
                }
                {user.role === Role.Admin &&
                    <NavLink to="/admin" className="NavLink"><GrUserAdmin/> Admin</NavLink>
                }
                {/*<Route path="/admin" component={AdminNav} /> */}
                {user.role === Role.Admin &&
                    <NavLink to="/mentors" className="NavLink"><FaUsers/> Mentors</NavLink>
                }
                {user.role === Role.Mentor &&
                    <NavLink to="/companies" className="NavLink"><RiDashboardFill/> Companies</NavLink>
                }
                <a onClick={accountService.logout} className="NavLink Logout"><GrLogout/> Logout</a>
            </section>
        </nav>

        </MenuWrapper>
    );
}

{/*
function AdminNav({ ...match }) {
    const { path } = match;

    return (
                <NavLink to={`${path}/users`} className="NavLink" id="AdminLink">Users</NavLink>
    );
}
*/}

export { Nav }; 

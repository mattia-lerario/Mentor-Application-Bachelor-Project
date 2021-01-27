import React, { useState, useEffect } from 'react';
import { NavLink, Route } from 'react-router-dom';

import {MenuWrapper} from '../style/styledcomponents';
import { Role } from '@/_helpers';
import { accountService } from '@/_services';

function Megamenu() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x));
        return subscription.unsubscribe;
    }, []);

    // only show Megamenu when logged in
    if (!user) return null;

    return (
        <MenuWrapper>
            <nav className="MenuBar">
                
                <div className="MenuLinks">

                    <NavLink exact to="/" className="NavLink">Home</NavLink>
                    <NavLink to="/profile" className="NavLink">Profile</NavLink>
                    <NavLink to="/map" className="NavLink">Dashboard</NavLink>
                    {user.role === Role.Admin &&
                        <NavLink to="/admin" className="NavLink">Admin</NavLink>
                    }
                     {user.role === Role.Mentor &&
                        <NavLink to="/companies" className="NavLink">Companies</NavLink>
                    }
                    <a onClick={accountService.logout} className="NavLink">Logout</a>
                </div>
            </nav>
            <Route path="/admin" component={AdminNav} />
        </MenuWrapper>
    );
}

function AdminMegamenu({ match }) {
    const { path } = match;

    return (
        //<nav className="admin-nav navbar-light">
        <nav className="AdminNav">
            {/*</nav>/<div className="navbar-nav">*/}
            <div>
                {/*<NavLink to={`${path}/users`} className="nav-item nav-link">Users</NavLink>*/}
                <NavLink to={`${path}/users`} className="AdminLink">Users</NavLink>
            </div>
        </nav>
    );
}

export { Megamenu }; 
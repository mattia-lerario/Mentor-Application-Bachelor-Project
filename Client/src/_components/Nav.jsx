import React, { useState, useEffect } from 'react';
import { NavLink, Route } from 'react-router-dom';
import {MenuWrapper} from '../style/styledcomponents';

import { Role } from '@/_helpers';
import { accountService } from '@/_services';

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
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="navbar-nav navMenu">
                    <NavLink exact to="/" className="nav-item nav-link">Home</NavLink>
                    <NavLink to="/profile" className="nav-item nav-link">Profile</NavLink>
                    <NavLink to="/map" className="nav-item nav-link">Map</NavLink>
                    {user.role === Role.Admin &&
                        <NavLink to="/admin" className="nav-item nav-link">Admin</NavLink>
                    }
                    <a onClick={accountService.logout} className="nav-item nav-link">Logout</a>
                </div>
            </nav>
            <Route path="/admin" component={AdminNav} />
        </MenuWrapper>
    );
}

function AdminNav({ match }) {
    const { path } = match;

    return (
        <nav className="admin-nav navbar navbar-expand navbar-light">
            <div className="navbar-nav">
                <NavLink to={`${path}/users`} className="nav-item nav-link">Users</NavLink>
            </div>
        </nav>
    );
}

export { Nav }; 
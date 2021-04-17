import React, { useState, useEffect } from 'react';
import { Role } from '@/_helpers';
import { accountService } from '@/_services';

import {FaBars} from 'react-icons/fa';
import {AiOutlineClose, AiFillHome} from 'react-icons/ai';
import {CgProfile} from 'react-icons/cg';

export const NavData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiFillHome/>,
        className: 'nav-text'
    },
    {
        title: 'Profile',
        path: '/profile',
        icon: <CgProfile/>,
        className: 'nav-text'
    },
    {user.role === Role.Admin &&
        {
            title: 'Dashboard',
            path: '/dashboard',
            icon: <CgProfile/>,
            className: 'nav-text'
        },
    }
    {user.role === Role.Admin &&
        {
            title: 'Admin',
            path: '/admin',
            icon: </>,
            className: 'nav-text'
        }
    }
        <Route path="/admin" component={AdminNav} />
        {user.role === Role.Admin &&
            <NavLink to="/mentors" className="NavLink">Mentors</NavLink>
        }
        {user.role === Role.Mentor &&
            <NavLink to="/companies" className="NavLink">Companies</NavLink>
        }
        <a onClick={accountService.logout} className="NavLink Logout">Logout</a>
]
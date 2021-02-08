import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import { Role } from '@/_helpers';
import { accountService } from '@/_services';
import {MenuWrapper, SidebarWrapper} from '../style/styledcomponents';

import { Nav, PrivateRoute, Alert, Sidebar } from '@/_components';
import { Home } from '@/home';
import { Profile } from '@/profile';
import { Company } from '@/Company';
import { Mentor } from '@/Mentor';

import { Admin } from '@/admin';
import { Account } from '@/account';
import { Dashboard } from '@/dashboard';

function App() {
    const { pathname } = useLocation();  
    const [user, setUser] = useState({});


    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x));
        return subscription.unsubscribe;
    }, []);
    if(!user){
return (
         
        <div className={'app-container'}>
            <Alert />
            <Switch>
                <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
                <PrivateRoute exact path="/" component={Home} />

                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/companies" component={Company} />
                <PrivateRoute path="/mentors" component={Mentor} />
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} />

                <Route path="/account" component={Account} />
                <Redirect from="*" to="/" />
                  
            </Switch>
           
            
        </div>
    );


    }else{
        return (
         
        <div className={'app-container'}>
          <SidebarWrapper>
              <Sidebar/>
            </SidebarWrapper>
            <Alert />
            <Switch>
                <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
                <PrivateRoute exact path="/" component={Home} />

                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/companies" component={Company} />
                <PrivateRoute path="/mentors" component={Mentor} />
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} />

                <Route path="/account" component={Account} />
                <Redirect from="*" to="/" />
                  
            </Switch>
           
            
        </div>
    );
    }
    
} 

export { App }; 
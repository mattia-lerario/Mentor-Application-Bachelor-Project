import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { DashboardList } from './DashboardList';
import { accountService, companyService } from '@/_services';

function Dashboard() {
    const user = accountService.userValue;
    const copmany = companyService.userValue;

    const { path } = match;
    
    return (
        <div className="p-4">
            <div className="container">
                <h1>Hi {user.lastName}, how are you?!</h1>
                <p>You're logged in with React & JWT!!</p>
                <p>Dashboard!!!!!</p>

                <p>{copmany.copmanyName}</p>

                <Switch>
                    <Route exact path={path} component={DashboardList} />
                    <Route path={`${path}/DashboardList`} component={DashboardList} />
                </Switch>

            </div>
        </div>
    );
}

export { Dashboard };
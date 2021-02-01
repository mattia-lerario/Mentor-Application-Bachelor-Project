import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { DashboardList } from './DashboardList';
import { accountService, companyService } from '@/_services';

function Dashboard({ match }) {
    const user = accountService.userValue;
    const company = companyService.userValue;

    const { path } = match;
    
    return (
        <div className="p-4">
            <div className="container">
                <h1>Hi {user.lastName}, how are you?!</h1>
                <p>Company Dashboard</p>
                <p>Dashboard!!!!!</p>

                <p>{company.companyName}</p>

                <Switch>
                    <Route exact path={path} component={DashboardList} />
                    
                </Switch>

            </div>
        </div>
    );
}

export { Dashboard };
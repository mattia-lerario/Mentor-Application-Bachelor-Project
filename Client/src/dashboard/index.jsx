import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { MyChart } from '../_components/MyChart';
import { DashboardList } from './DashboardList';
import { accountService, companyService, mentorService } from '@/_services';

function Dashboard({ match }) {
    const user = accountService.userValue;
    const company = companyService.userValue;
    const mentor = mentorService.userValue;

    const { path } = match;
    
    return (
        <article className="main">
                

                <Switch>
                    <Route exact path={path} component={DashboardList} />
                    <Route path={`${path}/chart`} component={MyChart} />
                    <Route path={`${path}/companies`} component={Dashboard} />
                    <Route path={`${path}/mentors`} component={Dashboard} />
                </Switch>
         
        </article>
    );
}

export { Dashboard };
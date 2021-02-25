import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { DashboardList } from './DashboardList';
import { accountService, companyService, mentorService } from '@/_services';

function Dashboard({ match }) {
    const user = accountService.userValue;
    const company = companyService.userValue;
    const mentor = mentorService.userValue;

    const { path } = match;
    
    return (
        <article className="p-4">
            <section className="container">
                <h1>Hi {user.lastName}</h1>

                <Switch>
                    <Route exact path={path} component={DashboardList} />
                   
                </Switch>

            </section>
        </article>
    );
}

export { Dashboard };
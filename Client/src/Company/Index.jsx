import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { CompanyList } from './Company';
import { UpdateWorkingHoursMentor } from './UpdateWorkingHoursMentor';

import { accountService, companyService, mentorService } from '@/_services';
import { CompanyDetails } from './CompanyDetails';

function Company({ match }) {
    const user = accountService.userValue;

    const { path } = match;
    
    return (
        <article className="p-4">
           
            <section className="container">
                <h1>Hi {user.firstName}</h1>
                <p>Information about your companies</p>

                <Switch>
                    <Route exact path={path} component={CompanyList} />
                    <Route path={`${path}/companies`} component={Company} />
                    <Route path={`${path}/updateWorkingHoursMentor`} component={UpdateWorkingHoursMentor} />
                    <Route path={`${path}/mentors`} component={Company} />

                    <Route path={`${path}/companyDetails/:id`} component={CompanyDetails} />
                </Switch>
            </section>
        </article>
    );
}

export { Company };
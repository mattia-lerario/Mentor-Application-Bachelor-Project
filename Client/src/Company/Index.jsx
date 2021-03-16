import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { CompanyList } from './Company';
import { UpdateWorkingHouersMentor } from './UpdateWorkingHoursMentor';
import { accountService, companyService, mentorService } from '@/_services';

function Company({ match }) {
    const user = accountService.userValue;
    const company = companyService.userValue;
    const mentor = mentorService.userValue;

    const { path } = match;
    
    return (
        <div className="p-4">
            <div className="container">
                
                <h1>Hi {user.firstName}</h1>
                <p>Information about your companies</p>

                <Switch>
                    <Route exact path={path} component={CompanyList} />
                    <Route path={`${path}/companies`} component={Company} />
                    <Route path={`${path}/updateWorkingHoursMentor`} component={UpdateWorkingHouersMentor} />
                </Switch>
            </div>
        </div>
    );
}

export { Company };
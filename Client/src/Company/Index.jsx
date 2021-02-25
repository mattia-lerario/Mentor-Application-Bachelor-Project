import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { CompanyList } from './Company';
import { accountService, companyService, mentorService } from '@/_services';

function Company({ match }) {
    const user = accountService.userValue;
    const company = companyService.userValue;
    const mentor = mentorService.userValue;

    const { path } = match;
    
    return (
        <div className="p-4">
            <div className="container">
                <h1>Hi {user.lastName}</h1>
                <p>Information about your company.</p>

                <Switch>
                    <Route exact path={path} component={CompanyList} />
                    <Route path={`${path}/companies`} component={Company} />
                </Switch>
            </div>
        </div>
    );
}

export { Company };
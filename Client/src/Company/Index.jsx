import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { CompanyList } from './Company';
import { UpdateWorkingHoursMentor } from './UpdateWorkingHoursMentor';

import { accountService, companyService, mentorService } from '@/_services';
import { CompanyDetails } from './CompanyDetails';
import { PowerRanking } from './PowerRanking';

function Company({ match }) {
    const user = accountService.userValue;

    const { path } = match;
    
    return (
        <section className="main scrollhost">
                <Switch>
                    <Route exact path={path} component={CompanyList} />
                    <Route path={`${path}/companies`} component={Company} />
                    <Route path={`${path}/updateWorkingHoursMentor`} component={UpdateWorkingHoursMentor} />
                    <Route path={`${path}/mentors`} component={Company} />
                    <Route path={`${path}/powerranking`} component={PowerRanking} />
                    <Route path={`${path}/companyDetails/:id`} component={CompanyDetails} />
                </Switch>
            </section>
    );
}

export { Company };
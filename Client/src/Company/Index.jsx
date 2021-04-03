import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { CompanyList } from './Company';
import { UpdateWorkingHoursMentor } from './UpdateWorkingHoursMentor';
import { DirectUpdateWorkingHoursMentor } from './DirectUpdateWorkingHoursMentor';

import { CompanyDetails } from './CompanyDetails';

import { PowerRanking } from './PowerRanking';
import { DirectPowerRanking } from './DirectPowerRanking';
// eslint-disable-next-line react/prop-types
function Company({ match }) {
 
// eslint-disable-next-line react/prop-types
    const { path } = match;
    
    return (
        <section className="main scrollhost">
                <Switch>
                    <Route exact path={path} component={CompanyList} />
                    <Route path={`${path}/companies`} component={Company} />
                    <Route path={`${path}/updateWorkingHoursMentor`} component={UpdateWorkingHoursMentor} />
                    <Route path={`${path}/companyDetails/:id/updateWorkingHoursMentor/:id`} component={DirectUpdateWorkingHoursMentor} />
                    <Route path={`${path}/mentors`} component={Company} />
                    <Route path={`${path}/companyDetails/:id/directPowerRanking/:id`} component={DirectPowerRanking} />
                    <Route path={`${path}/powerranking`} component={PowerRanking} />
                    <Route path={`${path}/companyDetails/:id`} component={CompanyDetails} />
                </Switch>
            </section>
    );
}

export { Company };
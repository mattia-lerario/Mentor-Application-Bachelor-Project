import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {ProfileWrapper} from '../style/styledcomponents';
import { Details } from './Details';
import { Update } from './Update';
import { UpdateCompanies } from './UpdateCompanies';
import { UpdateMentor } from './UpdateMentor';
import { UpdateWorkingHouersMentor } from './UpdateWorkingHoursMentor';

function Profile({ match }) {
    const { path } = match;
    
    return (
            <article className="p-4 container">
                <h1>Your profile</h1>
                <Switch>
                    <Route exact path={path} component={Details} />
                    <Route path={`${path}/update`} component={Update} />
                    <Route path={`${path}/updateCompanies`} component={UpdateCompanies} />
                    <Route path={`${path}/updateMentor`} component={UpdateMentor} />
                    <Route path={`${path}/updateWorkingHoursMentor`} component={UpdateWorkingHouersMentor} />
                </Switch>
            </article>

    );
}

export { Profile };

/*<Route exact path={path} component={Details} />
    <Route path={`${path}/update`} component={Update} /> 
                    
   <Route exact path={path} component={MentorDetails} />
                    <Route path={`${path}/update`} component={UpdateMentor} />                 
                    
                    
                    
                    
*/
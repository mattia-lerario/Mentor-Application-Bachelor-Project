import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Details } from './Details';
import { Update } from './Update';
import { UpdateCompanies } from './UpdateCompanies';
import { UpdateMentor } from './UpdateMentor';

// eslint-disable-next-line react/prop-types
function Profile({ match }) {
    // eslint-disable-next-line react/prop-types
    const { path } = match;
    
    return (
        <section className="main scrollhost">
                <Switch>
                    <Route exact path={path} component={Details} />
                    <Route path={`${path}/update`} component={Update} />
                    <Route path={`${path}/updateCompanies`} component={UpdateCompanies} />
                    <Route path={`${path}/updateMentor`} component={UpdateMentor} />
                </Switch>
        </section>
    );
}

export { Profile };

/*<Route exact path={path} component={Details} />
    <Route path={`${path}/update`} component={Update} /> 
                    
   <Route exact path={path} component={MentorDetails} />
                    <Route path={`${path}/update`} component={UpdateMentor} />                 
                    
                    
                    
                    
*/
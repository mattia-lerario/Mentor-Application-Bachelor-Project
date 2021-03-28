import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { MentorList } from './Mentor';
import { MentorDetails } from './MentorDetails';
// eslint-disable-next-line react/prop-types
function Mentor({ match }) {
  
// eslint-disable-next-line react/prop-types
    const { path } = match;
    
    return (
        <section className="main scrollhost">
            <h1>Mentor Dashboard</h1>
            <Switch>
                <Route exact path={path} component={MentorList} />
                <Route path={`${path}/mentors`} component={Mentor} />
                <Route path={`${path}/mentorDetails/:id`} component={MentorDetails} />
            </Switch>
        </section>                
    );
}

export { Mentor };
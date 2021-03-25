import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { MentorList } from './Mentor';

function Mentor({ match }) {
  

    const { path } = match;
    
    return (
        <article className="main">
                
                <h1>Mentor Dashboard</h1>

                <Switch>
                    <Route exact path={path} component={MentorList} />
                    <Route path={`${path}/mentors`} component={Mentor} />
                </Switch>
        </article>
    );
}

export { Mentor };
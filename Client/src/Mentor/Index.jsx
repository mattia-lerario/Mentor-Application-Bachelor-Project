import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { MentorList } from './Mentor';

import { accountService, mentorService } from '@/_services';

function Mentor({ match }) {
    const user = accountService.userValue;
    const mentor = mentorService.userValue;

    const { path } = match;
    
    return (
        <div className="p-4">
            <div className="container">
                <h1>Hi {user.lastName}, Welcome to the Mentor View</h1>
                <p>Mentor Dashboard</p>

                <Switch>
                    <Route exact path={path} component={MentorList} />
                    <Route path={`${path}/mentors`} component={Mentor} />
                </Switch>
            </div>
        </div>
    );
}

export { Mentor };
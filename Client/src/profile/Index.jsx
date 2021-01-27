import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Details } from './Details';
import { Update } from './Update';

import { MentorDetails } from './MentorDetails';
import { UpdateMentor } from './UpdateMentor';

function Profile({ match }) {
    const { path } = match;
    
    return (
        <div className="p-4">
            <div className="container">
                <Switch>
                    <Route exact path={path} component={MentorDetails} />
                    <Route path={`${path}/update`} component={UpdateMentor} />
                </Switch>
            </div>
        </div>
    );
}

export { Profile };

/*<Route exact path={path} component={Details} />
                    <Route path={`${path}/update`} component={Update} /> */
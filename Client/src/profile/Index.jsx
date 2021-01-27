import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {ProfileWrapper} from '../style/styledcomponents';
import { Details } from './Details';
import { Update } from './Update';

import { MentorDetails } from './MentorDetails';
import { UpdateMentor } from './UpdateMentor';

function Profile({ match }) {
    const { path } = match;
    
    return (
        <ProfileWrapper>
            <div className="Padding">
                    <Switch>
                        <Route exact path={path} component={Details} />
                        <Route path={`${path}/update`} component={Update} />
                    </Switch>
            </div>
        </ProfileWrapper>

    );
}

export { Profile };

/*<Route exact path={path} component={Details} />
    <Route path={`${path}/update`} component={Update} /> 
                    
   <Route exact path={path} component={MentorDetails} />
                    <Route path={`${path}/update`} component={UpdateMentor} />                 
                    
                    
                    
                    
*/
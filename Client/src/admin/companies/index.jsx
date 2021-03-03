import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { CompanyList } from './CompanyList';
import { AddMentorToCompany } from './AddMentorToCompanies';


function Companies({ match }) {
    const { path } = match;
    
    return (
        <Switch>
            <Route exact path={path} component={CompanyList} />
            <Route path={`${path}/addMentor/:id`} component={AddMentorToCompany} />
        </Switch>
    );
}


export { Companies};
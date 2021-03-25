import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { CompanyList } from './CompanyList';
import { AddEditMentor } from './AddMentorToCompanies';


function Companies({ match }) {
    const { path } = match;
    
    return (
        <Switch>
            <Route exact path={path} component={CompanyList} />

            <Route path={`${path}/editMentor/:id`} component={AddEditMentor} />

            <Route path={`${path}/addMentor/:id`} component={AddEditMentor} />

        </Switch>
    );
}


export { Companies};
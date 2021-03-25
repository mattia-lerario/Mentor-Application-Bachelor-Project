import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Overview } from './Overview';
import { Users } from './users';
import {Companies} from './companies';
//import {CompanyList} from './Dashboard';

function Admin({ match }) {
    const { path } = match;

    return (
        <article className="main">
                <Switch>
                    <Route exact path={path} component={Overview} />
                    <Route path={`${path}/users`} component={Users} />
                    <Route path={`${path}/companies`} component={Companies} />
                </Switch>
        </article>
    );
}

export { Admin };
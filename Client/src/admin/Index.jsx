import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Overview } from './Overview';
import { Users } from './users';
import {Companies} from './companies';
//import {CompanyList} from './Dashboard';

function Admin({ ...match }) {
    const { path } = match;

    return (
        <section className="main scrollhost">
            <Switch>
                <Route exact path={path} component={Overview} />
                <Route path={`${path}/users`} component={Users} />
                <Route path={`${path}/companies`} component={Companies} />
            </Switch>
        </section>
    );
}

export { Admin };
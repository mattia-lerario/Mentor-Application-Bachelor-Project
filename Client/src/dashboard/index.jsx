import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { MyChart } from '../_components/MyChart';
import { DashboardList } from './DashboardList';
import { CompanyDetails } from './CompanyDetails';


function Dashboard({ ...match }) {


    const { path } = match;
    
    return (
        <section className="main mainMargin scrollhost">
            <Switch>
                <Route exact path={path} component={DashboardList} />
                <Route path={`${path}/chart`} component={MyChart} />
                <Route path={`${path}/companies`} component={Dashboard} />
                <Route path={`${path}/mentors`} component={Dashboard} />
                <Route path={`${path}/companyDetails/:id`} component={CompanyDetails} />
            </Switch>
        </section>
    );
}

export { Dashboard };
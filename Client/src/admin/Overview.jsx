import React from 'react';
import { Link } from 'react-router-dom';

function Overview({match }) {
    const { path } = match;

    return (
        <section>
            <h1>Admin</h1>
            <p>This section can only be accessed by administrators.</p>
            <button className={'Btn BtnMain'}><Link to={`${path}/users`} className={'BtnLink'}>Manage Users</Link></button>
            <button className={'Btn BtnMain'}><Link to={`${path}/companies`} className={'BtnLink'}>Manage companies</Link></button>
        </section>
    );
}

export { Overview };
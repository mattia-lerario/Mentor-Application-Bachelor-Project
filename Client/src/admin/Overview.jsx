import React from 'react';
import { Link } from 'react-router-dom';

function Overview({ match }) {
    const { path } = match;

    return (
        <section>
            <h1>Admin</h1>
            <p>This section can only be accessed by administrators.</p>
            <Link to={`${path}/users`} className={'BtnLink'}>
                <button type="button" className={'Btn BtnMain'}>Manage Users</button>
            </Link>
            <Link to={`${path}/companies`} className={'BtnLink'}>
                <button type="button" className={'Btn BtnMain'}>Manage companies</button>
            </Link>
        </section>
    );
}

export { Overview };
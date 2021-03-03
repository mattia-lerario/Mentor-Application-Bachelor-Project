import React from 'react';
import { Link } from 'react-router-dom';
import { BtnWrapper } from '../style/styledcomponents';

function Overview({ match }) {
    const { path } = match;

    return (
        <BtnWrapper>
            <h1>Admin</h1>
            <p>This section can only be accessed by administrators.</p>
            <button className="Btn MainBtn"><Link to={`${path}/users`} className="LinkBtn">Manage Users</Link></button>
            <button className="Btn MainBtn"><Link to={`${path}/companies`} className="LinkBtn">Manage companies</Link></button>
        </BtnWrapper>
    );
}

export { Overview };
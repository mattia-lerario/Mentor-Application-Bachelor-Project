import React from 'react';
import { Link } from 'react-router-dom';

import { accountService } from '@/_services';
import { BtnWrapper } from '../style/styledcomponents';

function MentorDetails({ match }) {
    const { path } = match;
    const user = accountService.userValue;

    if (user.role === "Mentor") {
    return (
        
        <BtnWrapper>
            <h1>{user.firstName} Profile</h1>
            <p>
                <strong>Name: </strong> {user.title} {user.firstName} {user.lastName}<br />
                <strong>Email: </strong> {user.email}<br />
                <strong>Role: </strong>{user.role}
            </p>

            <button className="Btn MainBtn"><Link to={`${path}/updateMentor`} className="LinkBtn">Update Profile</Link></button>
        </BtnWrapper>
        
    );

    }

    else{
        <BtnWrapper>
        <h1>My Mentor Profile</h1>
        <p>
            <strong>Name: </strong> {user.title} {user.firstName} {user.lastName}<br />
            <strong>Email: </strong> {user.email}<br />
            <strong>Role: </strong>{user.role}
            <strong>DoB: </strong>{user.dateOfBirth}
        </p>

        if ({user.role} != "admin") {
            
        }
        <button className="Btn MainBtn"><Link to={`${path}/update`} className="LinkBtn">Update Profile</Link></button>
    </BtnWrapper>
    }
}

export { MentorDetails };
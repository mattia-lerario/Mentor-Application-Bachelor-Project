import React from 'react';
import { Link } from 'react-router-dom';

import { accountService } from '@/_services';
import { BtnWrapper } from '../style/styledcomponents';

function Details({ match }) {
    const { path } = match;
    const user = accountService.userValue;
    const isUserType = user.role;
    if(isUserType == "Mentor"){

        
        return (
        <BtnWrapper>
            <section>
                <h1>{user.firstName}'s Profile</h1>
                <p>
                    <strong>Name: </strong> {user.title} {user.firstName} {user.lastName}<br />
                    <strong>Email: </strong> {user.email}<br />
                    <strong>Role: </strong>{user.role}
                </p>
                
                <button className="Btn MainBtn"><Link to={`${path}/update`} className="LinkBtn">Update Account</Link></button>
                
                <button className="Btn MainBtn"><Link to={`${path}/updateMentor`} className="LinkBtn">Update {user.role} Information</Link></button>
            </section>
        
        </BtnWrapper>
        
    );
}
    if(isUserType == "Company"){
        return (
            
            <BtnWrapper>
                <h1>{user.firstName}'s Profile</h1>
                <p>
                    <strong>Name: </strong> {user.title} {user.firstName} {user.lastName}<br />
                    <strong>Email: </strong> {user.email}<br />
                    <strong>Role: </strong>{user.role}
                </p>
                
                <button className="Btn MainBtn"><Link to={`${path}/update`} className="LinkBtn">Update Account</Link></button>
                
                <button className="Btn MainBtn"><Link to={`${path}/updateCompanies`} className="LinkBtn">Update {user.role} Information</Link></button>
            </BtnWrapper>
            
        );
}
}
    

export { Details };
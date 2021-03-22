import React from 'react';
import { Link } from 'react-router-dom';

import { accountService } from '@/_services';

function Details({ match }) {
    const { path } = match;
    const user = accountService.userValue;
    const isUserType = user.role;

    if(isUserType == "Admin"){

        return (
                <section>
                    <p>
                      <strong>Name: </strong> {user.title} {user.firstName} {user.lastName}<br />
                      <strong>Email: </strong> {user.email}<br />
                      <strong>Role: </strong>{user.role}
                    </p>
                
                   <button className={'Btn BtnMain'}><Link to={`${path}/update`} className={'BtnLink'}>Update Account</Link></button>
                

                </section>
        )
        // <button className="Btn MainBtn"><Link to={`${path}/updateWorkingHoursMentor`} className="LinkBtn">Update houers</Link></button>


    };

    if(isUserType == "Mentor"){

        
        return (
            <section>
                <h1>{user.firstName}'s Profile</h1>
                <p>
                    <strong>Name: </strong> {user.title} {user.firstName} {user.lastName}<br />
                    <strong>Email: </strong> {user.email}<br />
                    <strong>Role: </strong>{user.role}
                </p>
                
                <button className={'Btn BtnMain'}><Link to={`${path}/update`} className={'BtnLink'}>Update Account</Link></button>
                
                <button className={'Btn BtnMain'}><Link to={`${path}/updateMentor`} className={'BtnLink'}>Update {user.role} Information</Link></button>
            </section>
        
        
    );
    }
    if(isUserType == "Company"){
        return (
            <section>
                <h1>{user.firstName}'s Profile</h1>
                <p>
                    <strong>Name: </strong> {user.title} {user.firstName} {user.lastName}<br />
                    <strong>Email: </strong> {user.email}<br />
                    <strong>Role: </strong>{user.role}
                </p>
                
                <button className={'Btn BtnMain'}><Link to={`${path}/update`} className={'BtnLink'}>Update Account</Link></button>
                
                <button className={'Btn BtnMain'}><Link to={`${path}/updateCompanies`} className={'BtnLink'}>Update {user.role} Information</Link></button>            
            </section>
        );
}
}
    

export { Details };
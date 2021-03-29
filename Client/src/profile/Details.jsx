import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {BsPencil} from 'react-icons/bs';

import { accountService, mentorService, companyService} from '@/_services';

function Details({ match }) {
    const { path } = match;
    const user = accountService.userValue;
    const isUserType = user.role;
    const [roleUser, setUsers] = useState(null);
   // const [company, setUsers] = useState(null);

    if(isUserType == "Admin"){

        return (
                <section>
                <h1>{user.firstName} Profile</h1>
                    <p>
                      <strong>Name: </strong> {user.title} {user.firstName} {user.lastName}<br />
                      <strong>Email: </strong> {user.email}<br />
                      <strong>Role: </strong>{user.role}
                    </p>
                
                   
                    <Link to={`${path}/update`} className={'BtnLink'}>
                       <button className={'Btn BtnMain'}>Update Account</button>
                    </Link>
                

                </section>
        )
    }

    if(isUserType == "Mentor"){

       useEffect(() => {
            mentorService.getAll().then(x => setUsers(x));
      
        }, []);

        return (
            <section>
                <article>
                    <h1>{user.firstName} Profile Imformation</h1>
                    <p>
                        <strong>Name: </strong> {user.title} {user.firstName} {user.lastName}<br />
                        <strong>Email: </strong> {user.email}<br />
                        <strong>Role: </strong>{user.role}
                    </p>              
                    
                    <Link to={`${path}/update`} className={'BtnLink'}>
                        <button className={'Btn BtnMain'}>Update Account</button>
                    </Link>
        
                </article>

                <article>
                <h2>You'r Mentor Imformation</h2>
                
                <h4>Bio</h4>
                {roleUser && roleUser.filter(mentor => mentor.id === user.mentors[0]).map(mentor => 
                
                <article key = {mentor.id}>
                    <section>
                        <p>{mentor.mentorDescription}</p>
                        <p>{mentor.mentorName}</p>
                    </section>
                    <section>
                        <h5>Work experience:</h5>
                        <p>...</p>
                    </section>
                    <section>
                        <h5>Expertise:</h5>
                        <ul></ul>
                    </section>
                </article>
                )}
                </article>
                <Link to={`${path}/updateMentor`} className={'BtnLink'}>
                    <BsPencil/>
                </Link>
            </section>       
        
    );
    }
    if(isUserType == "Company"){

        useEffect(() => {
            companyService.getAll().then(x => setUsers(x));
      
        }, []);

        return (
            <section>
                <h1>{user.firstName} Profile</h1>
                <p>
                    <strong>Name: </strong> {user.title} {user.firstName} {user.lastName}<br />
                    <strong>Email: </strong> {user.email}<br />
                    <strong>Role: </strong>{user.role}
                </p>
                
                
                <Link to={`${path}/update`} className={'BtnLink'}>
                    <button className={'Btn BtnMain'}>Update Account</button>
                </Link>
                
                <article>
                <h2>You'r Company Imformation</h2>
                
                <h4>Bio</h4>
                {roleUser && roleUser.filter(company => company.id === user.companies[0]).map(company => 
                
                <section key = {company.id}>
                    <article>
                        <p>{company.companyDescription}</p>
                    </article>
                </section>
                )}
                </article>

                
                <Link to={`${path}/updateCompanies`} className={'BtnLink'}>
                    <button className={'Btn BtnMain'}>Update {user.role} Information</button>  
                </Link>          
            </section>
        );
}
}
    

export { Details };
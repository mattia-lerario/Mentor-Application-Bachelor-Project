import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
                
                   <button className={'Btn BtnMain'}><Link to={`${path}/update`} className={'BtnLink'}>Update Account</Link></button>
                

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
                    <button type="button" className={'Btn BtnMain Right'}><Link to={`${path}/updateWorkingHoursMentor`} className={'BtnLink'}>Update hours</Link></button>
                    <button type="button" className={'Btn BtnMain Right'}><Link to={`${path}/powerranking`} className={'BtnLink'}>PowerRanking</Link></button>              
                    <button type="button" className={'Btn BtnMain'}><Link to={`${path}/update`} className={'BtnLink'}>Update Account</Link></button>
        
                </article>

                <article>
                <h2>You'r Mentor Imformation</h2>
                
                <h4>Bio</h4>
                {roleUser && roleUser.filter(mentor => mentor.id === user.mentors[0]).map(mentor => 
                
                <section key = {mentor.id}>
                    <article>
                        <p>{mentor.mentorDescription}</p>
                    </article>
                </section>
                )}
                </article>
                <button type="button" className={'Btn BtnMain'}><Link to={`${path}/updateMentor`} className={'BtnLink'}>Update {user.role} Information</Link></button>
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
                
                <button className={'Btn BtnMain'}><Link to={`${path}/update`} className={'BtnLink'}>Update Account</Link></button>
                
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

                <button className={'Btn BtnMain'}><Link to={`${path}/updateCompanies`} className={'BtnLink'}>Update {user.role} Information</Link></button>            
            </section>
        );
}
}
    

export { Details };
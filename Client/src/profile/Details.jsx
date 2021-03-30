import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { accountService, mentorService, companyService} from '@/_services';
//icons
import {BsPencil} from 'react-icons/bs';
import {AiFillPhone} from 'react-icons/ai';
import {HiOutlineMail} from 'react-icons/hi';
//styling
import {ProfileWrapper} from '../style/styledcomponents';
//img
import avatar from '../media/avatar.jpg'

function Details({ match }) {
    const { path } = match;
    const user = accountService.userValue;
    const isUserType = user.role;
    const [roleUser, setUsers] = useState(null);
   
    // button style
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
            <ProfileWrapper>
                <section className="ProfileWrapper">
                    <article className="MentorInfoBox">
                        
                        <Link to={`${path}/updateMentor`} className="Tooltip">    
                            <BsPencil/>
                            <span className="TooltipText">Update mentor information</span>
                        </Link>

                        <img className="Center" src={avatar}></img>
                        <section className="ContactDetails">
                            <h3 className="Center">{user.firstName} {user.lastName}</h3>
                            <button className="Center"><HiOutlineMail/>{user.email}</button>
                            <button className="Center" /*onClick={phone}*/><AiFillPhone/>123 45 678</button>
                        </section>

                        {roleUser && roleUser.filter(mentor => mentor.id === user.mentors[0]).map(mentor => 
                        
                        <article key = {mentor.id}>
                            <section className="Section">
                                <h5>Bio</h5>
                                <p>{mentor.mentorDescription}</p>
                                <p>Skills:</p>
                            </section>
                            <section className="Section">
                                <h5>Areas of expertise:</h5>
                                <p className="AreaExpertise">Area1</p>
                                <p className="AreaExpertise">Area2</p>
                                <p className="AreaExpertise">Area3</p>
                            </section>
                            <section className="Section">
                                <h5>Work experience:</h5>
                                <p>...</p>
                            </section>
                        </article>
                        )}
                    </article>
                
                    <article className="ProfileInfo">
                        <h2>Profile Information</h2>
                        <p>
                            <strong>Name: </strong> {user.title} {user.firstName} {user.lastName}<br />
                            <strong>Email: </strong> {user.email}<br />
                            <strong>Role: </strong>{user.role}
                        </p>              
                        
                        <Link to={`${path}/update`} className={'BtnLink'}>
                            <button className={'Btn BtnMain'}>Update Account</button>
                        </Link>
                    </article>
                </section>   
            </ProfileWrapper>    
        
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
                <h2>Your Company Imformation</h2>
                
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
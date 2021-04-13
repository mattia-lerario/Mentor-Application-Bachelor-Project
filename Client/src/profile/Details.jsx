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
            <ProfileWrapper>
                <section className="ProfileWrapper">
                    <article className="MentorInfoBox">
                        
                        <Link to={`${path}/updateMentor`} className={'Tooltip'}>    
                            <BsPencil/>
                            <span className={'TooltipText'}>Update mentor information</span>
                        </Link>

                        <img className="Center" src={avatar}></img>
                        <section className="ContactDetails">
                            <h3 className="Center">{user.firstName} {user.lastName}</h3>
                            <button className="Center"><HiOutlineMail/> {user.email}</button>
                            <button className="Center" /*onClick={phone}*/><AiFillPhone/> 123 45 678</button>
                        </section>

                        {/*
                        Fungerer ikke herfra og ned til )}
                        Linjen under det er noe galt med, endret fra mentor til admin
                        {roleUser && roleUser.filter(admin => admin.id === user.admins[0]).map(admin => 
                        
                        <article key = {admin.id}>
                            <section className="Section">
                                <h5>Bio</h5>
                                <p>{admin.adminDescription}</p>
                                <p>Description of person(current job, education, experience)</p>
                            </section>
                            <section className="Section">
                                <h5>Skills</h5>
                                <p>Description of skills</p>
                            </section>
                            <section className="Section">
                                <h5>Areas of expertise:</h5>
                                <p className="AreaExpertise">Area1</p>
                                <p className="AreaExpertise">Area2</p>
                                <p className="AreaExpertise">Area3</p>
                            </section>
                            <section className="Section">
                                <h5>Work experience:</h5>
                                <dl>
                                    <dt>Job Title 1</dt>
                                        <dd>- Employer/Company</dd>
                                        <p>Description</p>
                                    <dt>Job Title 2</dt>
                                        <dd>- Employer Company</dd>
                                        <p>Description</p>
                                </dl>
                            </section>
                        </article>
                        )}*/}
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
                        
                        <Link to={`${path}/updateMentor`} className={'Tooltip'}>    
                            <BsPencil/>
                            <span className={'TooltipText'}>Update mentor information</span>
                        </Link>

                        <img className="Center" src={avatar}></img>
                        <section className="ContactDetails">
                            <h3 className="Center">{user.firstName} {user.lastName}</h3>
                            <button className="Center"><HiOutlineMail/> {user.email}</button>
                            <button className="Center" /*onClick={phone}*/><AiFillPhone/> 123 45 678</button>
                        </section>

                        {roleUser && roleUser.filter(mentor => mentor.id === user.mentors[0]).map(mentor => 
                        
                        <article key = {mentor.id}>
                            <section className="Section">
                                <h5>Bio</h5>
                                <p>{mentor.mentorDescription}</p>
                                <p>Description of person(current job, education, experience)</p>
                            </section>
                            <section className="Section">
                                <h5>Skills</h5>
                                <p>Description of skills</p>
                            </section>
                            <section className="Section">
                                <h5>Areas of expertise:</h5>
                                <p className="AreaExpertise">Area1</p>
                                <p className="AreaExpertise">Area2</p>
                                <p className="AreaExpertise">Area3</p>
                            </section>
                            <section className="Section">
                                <h5>Work experience:</h5>
                                <dl>
                                    <dt>Job Title 1</dt>
                                        <dd>- Employer/Company</dd>
                                        <p>Description</p>
                                    <dt>Job Title 2</dt>
                                        <dd>- Employer Company</dd>
                                        <p>Description</p>
                                </dl>
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
            <ProfileWrapper>
            <section className="ProfileWrapper">
                <article className="MentorInfoBox">
                    
                    <Link to={`${path}/updateCompanies`} className={'Tooltip'}>    
                        <BsPencil/>
                        <span className={'TooltipText'}>Update company information</span>
                    </Link>

                    <img className="Center" src={avatar}></img>
                    <section className="ContactDetails">
                        <h3 className="Center">{user.firstName} {user.lastName}</h3>
                        <button className="Center"><HiOutlineMail/> {user.email}</button>
                        <button className="Center" /*onClick={phone}*/><AiFillPhone/> 123 45 678</button>
                    </section>

                    {roleUser && roleUser.filter(company => company.id === user.companies[0]).map(company => 
                    
                    <article key = {company.id}>
                        <section className="Section">
                            <h5>Bio</h5>
                            <p>{company.companyDescription}</p>
                            <p>Description of person(current job, education, experience)</p>
                        </section>
                        <section className="Section">
                            <h5>Skills</h5>
                            <p>Description of skills</p>
                        </section>
                        <section className="Section">
                            <h5>Areas of expertise:</h5>
                            <p className="AreaExpertise">Area1</p>
                            <p className="AreaExpertise">Area2</p>
                            <p className="AreaExpertise">Area3</p>
                        </section>
                        <section className="Section">
                            <h5>Work experience:</h5>
                            <dl>
                                <dt>Job Title 1</dt>
                                    <dd>- Employer/Company</dd>
                                    <p>Description</p>
                                <dt>Job Title 2</dt>
                                    <dd>- Employer Company</dd>
                                    <p>Description</p>
                            </dl>
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
}
    

export { Details };
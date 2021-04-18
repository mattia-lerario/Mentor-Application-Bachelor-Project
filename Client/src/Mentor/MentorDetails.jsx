import React, { useState, useEffect } from 'react';

import { mentorService } from '@/_services';

import { Link } from 'react-router-dom';
import {ProfileWrapper} from '../style/styledcomponents';
import {AiFillPhone} from 'react-icons/ai';
import {HiOutlineMail} from 'react-icons/hi';
import avatar from '../media/avatar.jpg'


function MentorDetails({ history, match}) {

    const { id } = match.params;
    const mentorId = id;
    const [mentor, setUsers] = useState(null);

    useEffect(() => {
        mentorService.getAll().then(x => setUsers(x));
  
    }, []);
   
    return (

        <ProfileWrapper>
             <section className="ProfileWrapper">
                    <article className="MentorInfoBox">

            <Link to="/mentors" className={'BtnSimple BtnBack'}>Back</Link>
        
            {mentor && mentor.filter(mentor => mentor.id === mentorId).map(mentor => 

                <article key = {mentor.id}>

                <img className="Center" src={avatar}></img>
                <section className="ContactDetails">
                    <h3 className="Center">{mentor.mentorName}</h3>
                    <button className="Center"><HiOutlineMail/>{mentor.email}</button>
                    <button className="Center" /*onClick={phone}*/><AiFillPhone/>123 45 678</button>
                </section>
                     
                 
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
                    <section className="Team">
                        <dl className="teamMemberCard">
                            <dt>Job Title 1</dt>
                            <dd>- Duration</dd>
                            <p>Employer /Company</p>
                            <p>Description</p>
                        </dl>
                        <dl className="teamMemberCard">
                            <dt>Job Title 1</dt>
                            <dd>- Duration</dd>
                            <p>Employer /Company</p>
                            <p>Description</p>
                        </dl>
                        <dl className="teamMemberCard">
                            <dt>Job Title 1</dt>
                            <dd>- Duration</dd>
                            <p>Employer /Company</p>
                            <p>Description</p>
                        </dl>
                    </section>
                </section>
             </article>
            )}
            </article>
        </section>

        </ProfileWrapper>
    );
}    

export { MentorDetails };
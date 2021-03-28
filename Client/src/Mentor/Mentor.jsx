import React, { useState, useEffect} from 'react';

import avatar from '../media/avatar.jpg'
import {mentorService, accountService} from '@/_services';
import {HiOutlineMail} from 'react-icons/hi';
import {ListWrapper} from '../style/styledcomponents';
import { Link } from 'react-router-dom';
// eslint-disable-next-line react/prop-types
function MentorList({match}) {
    // eslint-disable-next-line react/prop-types
    const { path } = match;
    const [mentor, setUsers] = useState(null);


    useEffect(() => {
        mentorService.getAll().then(x => setUsers(x));
    }, []);

    return (
        <ListWrapper>
        <div>
            <h2>All Mentors in the system</h2>
            <p>Click on the mentor to see details more details</p>  

            {mentor && mentor.map(mentor =>
             <Link className={'noLink'}to={`${path}/mentorDetails/${mentor.id}`}>

            <section className="card" key={mentor.id}>

                {<img className="cardImg" src={avatar}></img>}
                <p className="companyName">{mentor.mentorName}</p>
                <p>Mentor Number: {mentor.mentorNumber}</p>
                <p>Description: {mentor.mentorDescription}</p>
                <p><HiOutlineMail/>: {mentor.email}</p>

            </section>
            </Link>
)}     
    
        </div>

        </ListWrapper>
        
        );
}

export { MentorList }; 
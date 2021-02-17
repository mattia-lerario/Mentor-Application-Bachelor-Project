import React, { useState, useEffect } from 'react';


import { mentorService } from '@/_services';
import {GiPhone} from 'react-icons/Gi';
import {HiOutlineMail} from 'react-icons/Hi';
import {ListWrapper} from '../style/styledcomponents';

function MentorList({ match }) {
    const { path } = match;
    const [mentor, setUsers] = useState(null);

    useEffect(() => {
        mentorService.getAll().then(x => setUsers(x));
    }, []);

    return (
        <ListWrapper>
        <div>
            <h1>All Mentors</h1>
            
            {mentor && mentor.map(mentor =>

            <div className="card" key={mentor.id}>
            <p className="companyName">{mentor.lastName}</p>
            <p><HiOutlineMail/>{mentor.mail} </p>
            <p><GiPhone/>mentor.phone</p>
            </div> 
            
            )}

        </div>

        </ListWrapper>
        
        );
}

export { MentorList }; 
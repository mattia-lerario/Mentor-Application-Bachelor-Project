import React, { useState, useEffect } from 'react';


import { mentorService } from '@/_services';
import {GiPhone} from 'react-icons/gi';
import {HiOutlineMail} from 'react-icons/hi';
import {ListWrapper} from '../style/styledcomponents';

function MentorList() {
    
    const [mentor, setUsers] = useState(null);

    useEffect(() => {
        mentorService.getAll().then(x => setUsers(x));
    }, []);

    return (
        <ListWrapper>
        <div>
            <h2>All Mentors</h2>  
           
            {mentor && mentor.map(mentor =>

            <div className="card" key={mentor.id}>
            <p className="companyName">{mentor.mentorName}</p>
            <p>Mentor Number: {mentor.mentorNumber}</p>
            <p>Description: {mentor.mentorDescription}</p>
            
            <p><HiOutlineMail/>: {mentor.email}</p>
            </div>
)}     
            
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
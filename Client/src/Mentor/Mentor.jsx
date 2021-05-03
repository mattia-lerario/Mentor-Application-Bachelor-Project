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
           
            <p>Click on the mentor to see more details</p>  

            {mentor && mentor.map(mentor =>
             <Link className={'noLink'}to={`${path}/mentorDetails/${mentor.id}`}>

            <article className="card" key={mentor.id}>

                <section className="cardTop">
                    {<img className="cardImg" src={avatar}></img>}
                    <h4 className="companyName">{mentor.mentorFirstName} {mentor.mentorLastName}</h4>      
                </section>

                <section className="cardMetric">
                  
                    <p>Description: {mentor.mentorDescription}</p>
                </section>
                
                <section className="cardBottom">
                    <Link to={`${path}/updateMentor`} className={'Tooltip'}> 
                        <HiOutlineMail/>{/*{mentor.email} */}
                        <span className={'TooltipText'}>Send email</span>
                    </Link>
                </section>
            </article>
            </Link>
)}     
    
        </div>

        </ListWrapper>
        
        );
}

export { MentorList }; 
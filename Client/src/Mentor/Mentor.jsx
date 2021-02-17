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
            <h1>All mentorService</h1>

            
            <div className="card">
                <p className="companyName">Mentor</p>
                <p>Mentor ID:</p>
                <p>Sales Revenue: </p>
                <p><HiOutlineMail/>: </p>
                <p><GiPhone/>: </p>
            </div> 
            <div className="card">
                <p className="companyName">Mentor</p>
                <p>Mentor ID:</p>
                <p>Sales Revenue: </p>
                <p><HiOutlineMail/>: </p>
                <p><GiPhone/>: </p>
            </div> 
            <div className="card">
                <p className="companyName">Mentor</p>
                <p>Mentor ID:</p>
                <p>Sales Revenue: </p>
                <p><HiOutlineMail/>: </p>
                <p><GiPhone/>: </p>
            </div> 
            <div className="card">
                <p className="companyName">Mentor</p>
                <p>Mentor ID:</p>
                <p>Sales Revenue: </p>
                <p><HiOutlineMail/>: </p>
                <p><GiPhone/>: </p>
            </div> 
        </div>

        </ListWrapper>
        
        );
}

export { MentorList }; 
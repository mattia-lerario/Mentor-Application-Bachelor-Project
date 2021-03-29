import React, { useState, useEffect } from 'react';

import { mentorService } from '@/_services';

import {CompanyWrapper} from '../style/styledcomponents';


function MentorDetails({ history, match}) {

    const { id } = match.params;
    const mentorId = id;
    const [mentor, setUsers] = useState(null);

    useEffect(() => {
        mentorService.getAll().then(x => setUsers(x));
  
    }, []);
   
    return (

        <CompanyWrapper>

            <a href="javascript:history.back()">Go Back</a>
        
            {mentor && mentor.filter(mentor => mentor.id === mentorId).map(mentor => 
                <article key={mentor.id}>

                    <section>
                        <h1>{mentor.mentorName}</h1>
                    </section>

                    <section>
                        <h4>Bio</h4>
                        <p>{mentor.mentorDescription}</p>
                    </section>
                </article>
            )}

        </CompanyWrapper>
    );
}    

export { MentorDetails };
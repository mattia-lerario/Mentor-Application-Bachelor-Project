import React, { useState, useEffect } from 'react';


import { mentorService } from '@/_services';

function MentorList({ match }) {
    const { path } = match;
    const [mentor, setUsers] = useState(null);

    useEffect(() => {
        mentorService.getAll().then(x => setUsers(x));
    }, []);

    return (
        
        <div>
            <h1>All mentorService</h1>
            
            <table>
            <thead>
                    <tr>
                        <th style={{ width: '30%' }}>mentor ID</th>
                        <th style={{ width: '30%' }}>mentor Name</th>
                        <th style={{ width: '30%' }}>Sales Revenue</th>
                        <th style={{ width: '30%' }}>Email</th>
                        <th style={{ width: '10%' }}>mentor number</th>
                    </tr>
                </thead>
                <tbody>
                    {mentor && mentor.map(mentor =>
                        <tr key={mentor.id}>
                            <td>{mentor.mentorName}</td>
                            <td>{mentor.salesRevenue}</td>
                            <td>{mentor.email}</td>
                            <td>{mentor.mentorNumber}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                
                            </td>
                        </tr>
                    )}
                    {!mentor &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <span className="spinner-border spinner-border-lg align-center"></span>
                            </td>
                        </tr>
                    }

                </tbody>

            </table>

        </div>
        
        );
}

export { MentorList }; 
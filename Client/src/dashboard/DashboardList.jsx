import React, { useState, useEffect } from 'react';

//Styling
import {ListWrapper} from '../style/styledcomponents';

import { companyService } from '@/_services';
import { mentorService } from '@/_services';

//icon
import {HiOutlineMail} from 'react-icons/hi';

function DashboardList({ match }) {
    const { path } = match;
    const [company, setUsers] = useState(null);

    useEffect(() => {
        companyService.getAll().then(x => setUsers(x));
    }, []);

    return (
        
        <ListWrapper>
            <div>
                <h2>All Companies</h2>
                <p>All companies showcased in dashboard.</p>

                {company && company.map(company =>

                <div className="card">
                    <p className="companyName">{company.companyName}</p>
                    <p>Sales Revenue: {company.salesRevenue}</p>
                    <p>Company number: {company.companyNumber}</p>
                    <p><HiOutlineMail/>: {company.email}</p>
                </div>
                )}              
                
            </div>
        </ListWrapper>
        
        );
}

export { DashboardList }; 
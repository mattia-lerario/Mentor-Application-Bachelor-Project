import React, { useState, useEffect } from 'react';


import {ListWrapper} from '../style/styledcomponents';
import { companyService } from '@/_services';
import {HiOutlineMail} from 'react-icons/hi';

function CompanyList({ match }) {
    const { path } = match;
    const [company, setUsers] = useState(null);

    useEffect(() => {
        companyService.getAll().then(x => setUsers(x));
    }, []);

    return (
                <ListWrapper>
            <div>
                <h1>All Companies</h1>

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

export { CompanyList }; 
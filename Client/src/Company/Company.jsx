import React, { useState, useEffect } from 'react';


import {ListWrapper, BtnWrapper} from '../style/styledcomponents';
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
                {company && company.map(company =>

                <div className="card" key={company.id}>
                    <p className="companyName">{company.companyName}</p>
                    <p>Sales Revenue: {company.salesRevenue}</p>
                    <p>Company number: {company.companyNumber}</p>
                    <p><HiOutlineMail/>: {company.email}</p>
                   
                </div>
                )}

            {!company}(
                <div className="card">
                    <p className="companyName">emty...</p>
                </div>
                )              
                
            </div>
        </ListWrapper>
        
        );
}

export { CompanyList }; 
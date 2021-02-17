import React, { useState, useEffect } from 'react';


import {ListWrapper} from '../style/styledcomponents';
import { companyService } from '@/_services';
import {HiOutlineMail} from 'react-icons/Hi';

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

                <div className="card">
                    <p className="companyName">Company 1</p>
                    <p>Sales Revenue</p>
                    <p>Company number: </p>
                    <p><HiOutlineMail/>: </p>
                </div>  
                <div className="card">
                    <p className="companyName">Company 2</p>
                    <p>Sales Revenue</p>
                    <p>Company number: </p>
                    <p><HiOutlineMail/>: </p>
                </div>  
                <div className="card">
                    <p className="companyName">Company 3</p>
                    <p>Sales Revenue</p>
                    <p>Company number: </p>
                    <p>Email: </p>
                </div>  
                <div className="card">
                    <p className="companyName">Company 4</p>
                    <p>Sales Revenue</p>
                    <p>Company number: </p>
                    <p>Email: </p>
                </div>  
{/*
                <table className="ListTable">
                    <thead>
                        <tr>
                            <th style={{ width: '15%' }}>Company ID</th>
                            <th style={{ width: '25%' }}>Company Name</th>
                            <th style={{ width: '20%' }}>Sales Revenue</th>
                            <th style={{ width: '20%' }}>Email</th>
                            <th style={{ width: '15%' }}>Company number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {company && company.map(company =>
                            <tr key={company.id}>
                                <td>{company.companyName}</td>
                                <td>{company.salesRevenue}</td>
                                <td>{company.email}</td>
                                <td>{company.companyNumber}</td>
                                <td style={{ whiteSpace: 'nowrap' }}>
                                    
                                </td>
                            </tr>
                        )}
                        {!company &&
                            <tr>
                                <td colSpan="4" className="text-center">
                                    <span className="spinner-border spinner-border-lg align-center"></span>
                                </td>
                            </tr>
                        }

                    </tbody>

                </table>
*/}

            </div>
        </ListWrapper>
        
        );
}

export { CompanyList }; 
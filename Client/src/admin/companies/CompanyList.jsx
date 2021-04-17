import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { accountService } from '@/_services';
import { companyService } from '@/_services';

function CompanyList({ match }) {
    const { path } = match;
    const [companies, setCompanies] = useState(null);

    useEffect(() => {
        companyService.getAll().then(x =>
             setCompanies(x));
    }, []);

    function deleteCompany(id) {
        setCompanies(companies.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        
        companyService.delete(id).then(() => {
            setCompanies(companies => companies.filter(x => x.id !== id));
        });
    }

    return (
        <section>
            <Link to="/admin" className={'BtnSimple BtnBack'}>Back</Link>
            <h1>All Companies</h1>
            <p>To assign a mentor to a company you have to edit the company.</p>
           
            <table className={'Table'}>
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Name</th>
                        <th style={{ width: '30%' }}>Email</th>
                        <th style={{ width: '30%' }}>Mentor</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {companies && companies.map(companies =>
                        <tr key={companies.id}>
                            <td>{companies.companyName}</td>
                            <td>{companies.email}</td>
                            <td>{companies.leadMentor}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                    <Link to={`${path}/addMentor/${companies.id}`} className={'BtnSimple'}>Edit</Link>
                                    <Link onClick={() => deleteCompany(companies.id)} className={'BtnSimple'} style={{ width: '60px' }} disabled={companies.isDeleting}>
                                        {companies.isDeleting 
                                            ? <span></span>
                                            : <span>Delete</span>
                                        }
                                    </Link>
                            </td>
                        </tr>
                    )}
                    {!companies &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <span></span>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </section>
    );
}

export { CompanyList };
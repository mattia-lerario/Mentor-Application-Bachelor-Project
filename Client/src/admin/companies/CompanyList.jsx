import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { accountService } from '@/_services';
import { companyService } from '@/_services';
import { BtnWrapper } from '../../style/styledcomponents';

function CompanyList({ match }) {
    const { path } = match;
    const [companies, setcompaniess] = useState(null);

    useEffect(() => {
        companyService.getAll().then(x => setcompaniess(x));
    }, []);

    function deleteCompany(id) {
        setcompaniess(companies.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        
        companyService.delete(id).then(() => {
            setcompaniess(companies => companies.filter(x => x.id !== id));
        });
    }

    return (
        <section>
            <h1>All Companies</h1>
            <p>ss</p>
           
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
                            <td>Mentor</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                            <BtnWrapper>
                                    <Link to={`${path}/edit/${companies.id}`} className="Btn MainBtn LinkBtn">Details</Link>
                                    <Link to={`${path}/addMentor/${companies.id}`} className="Btn MainBtn LinkBtn">Add Mentor</Link>
                                    <Link onClick={() => deleteCompany(companies.id)} className="Btn DeleteBtn LinkBtn" style={{ width: '60px' }} disabled={companies.isDeleting}>
                                        {companies.isDeleting 
                                            ? <span></span>
                                            : <span>Delete</span>
                                        }
                                    </Link>
                                </BtnWrapper>
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
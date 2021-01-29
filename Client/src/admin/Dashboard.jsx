import React, { useState, useEffect } from 'react';


import { companyService } from '@/_services';

function CompanyList({ match }) {
    const { path } = match;
    const [company, setUsers] = useState(null);

    useEffect(() => {
        companyService.getAll().then(x => setUsers(x));
    }, []);

    return (
        
        <div>
        
            <h1>Company</h1>
            <p>All companies showcased in dashboard</p>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Company Name</th>
                        <th style={{ width: '30%' }}>Email</th>
                        <th style={{ width: '30%' }}>Sales Revenue</th>
                        <th style={{ width: '10%' }}>Company number</th>
                    </tr>
                </thead>
                <tbody>
                    {company && company.map(company =>
                        <tr key={company.id}>
                            <td>{company.email}</td>
                            <td>{company.salesRevenue}</td>
                            <td>{company.companyNumber}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                            <BtnWrapper>
            <h1>{user.firstName}'s Profile</h1>
            <p>
                <strong>Name: </strong> {user.title} {user.firstName} {user.lastName}<br />
                <strong>Email: </strong> {user.email}<br />
                <strong>Role: </strong>{user.role}
            </p>
            <button className="Btn MainBtn"><Link to={`${path}/update`} className="LinkBtn">Update Profile</Link></button>
        |</BtnWrapper>
                            </td>
                        </tr>
                    )}
                    {!users &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <span className="spinner-border spinner-border-lg align-center"></span>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>

        </div>


/*
        <BtnWrapper>
            <h1>{user.firstName}'s Profile</h1>
            <p>
                <strong>Name: </strong> {user.title} {user.firstName} {user.lastName}<br />
                <strong>Email: </strong> {user.email}<br />
                <strong>Role: </strong>{user.role}
            </p>
            <button className="Btn MainBtn"><Link to={`${path}/update`} className="LinkBtn">Update Profile</Link></button>
        </BtnWrapper>
    */    
    );
}

export { CompanyList };
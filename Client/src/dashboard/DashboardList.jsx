import React, { useState, useEffect } from 'react';


import { companyService } from '@/_services';

function DashboardList({ match }) {
    const { path } = match;
    const [company, setUsers] = useState(null);

    useEffect(() => {
        companyService.getAll().then(x => setUsers(x));
    }, []);

    return (
        
        <div>
            <h1>All Companies</h1>
            <p>All companies showcased in dashboard</p>

            <table>
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
                            <td>{company.companyName}</td>
                            <td>{company.salesRevenue}</td>
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

        </div>
        
        );
}

export { DashboardList }; 
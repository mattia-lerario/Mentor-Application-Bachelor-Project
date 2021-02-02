import React, { useState, useEffect } from 'react';


import { companyService } from '@/_services';
import { mentorService } from '@/_services';

const StyledLi = styled.li`
  & >= h2 {
    font-weight: 900;
    font-size: 4rem;
  }
`;

function DashboardCard({ match }) {
    const { path } = match;
    const [company, setUsers] = useState(null);

    useEffect(() => {
        companyService.getAll().then(x => setUsers(x));
    }, []);

    /*const CompanyItem = ({ companyName, companyNumber, email, salesRevenue, companyDescription }) => (

        <StyledLi>
        <span>
        <h1>{companyName}</h1>
        <h2>{companyNumber}</h2>
        <h3>{email}</h3>
        </span>
        <p>{companyDescription}</p>
        <p>{salesRevenue}</p>

        </StyledLi>   
        );*/

    return (
        
        <div>
            <h1>All Companies</h1>
            <p>All companies showcased in dashboard</p>
              
            <table>
            <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Company Name</th>
                        <th style={{ width: '30%' }}>Sales Revenue</th>
                        <th style={{ width: '30%' }}>Company number</th>
                        <th style={{ width: '10%' }}>Email</th>
                    </tr>
                </thead>
                <tbody>

                    {company && company.map(company =>
                        /*<tr key={company.id}>
                            <td>{company.companyName}</td>
                            <td>{company.salesRevenue}</td>
                            <td>{company.companyNumber}</td>
                            <td>{company.email}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                            </td>
                        </tr>*/
                        <tr key={company.id}>
                            <StyledLi>
                            <span>
                            <h1>{company.companyName}</h1>
                            <h2>{company.companyNumber}</h2>
                            <h3>{company.email}</h3>
                            </span>
                            <p>{company.companyDescription}</p>
                            <p>{company.salesRevenue}</p>

                               </StyledLi> 
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

export { DashboardCard }; 
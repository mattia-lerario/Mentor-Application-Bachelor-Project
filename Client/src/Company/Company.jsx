import React, { useState, useEffect, useReducer } from 'react';


import { companyService } from '@/_services';
import {accountService} from '@/_services';


function CompanyList({ match }) {
    const { path } = match;
    const [company, setUsers] = useState(null);

    useEffect(() => {
        companyService.getAll().then(x => setUsers(x));
    }, []);


    return (
        
        <div>
            
            <table>
                <tbody>
                    {company && company.map(company =>
                        <tr key={company.id}>
                        
                            <div>
                                <h2>{company.companyName}</h2>
                                <h2>{company.companyNumber}</h2>
                                
                            </div>
                            <p>{company.email}</p>
                            <p>{company.companyDescription}</p>
                            <p>{company.salesRevenue} NOK</p>
                                
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

export { CompanyList }; 
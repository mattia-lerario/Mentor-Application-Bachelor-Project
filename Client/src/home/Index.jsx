import React, { useEffect, useState } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { accountService,companyService  } from '@/_services';
import { BarChart } from '@/_components';
import { CompanyDetails } from '../Company/CompanyDetails';
import { Company } from '../Company';
import { CompanyWrapper } from '../style/styledcomponents';
import { Role } from '@/_helpers';
function Home() {
    const user = accountService.userValue;
  
    const companyId = user.companies[0];
    const [company, setUsers] = useState(null);

    const graphData = [
  {
    label: 'Series 1',
    data: [
      { primary: " AS", secondary: 1},
      { primary: "Tollit AS", secondary: 1 },
      { primary: "Smart Cognition AS", secondary: 1 },
    ],
  },
  {
    label: 'Series 2',
    data: [
      { primary: "Elevate AS", secondary: 3 },
      { primary: "LeadX AS", secondary: 2 },
      { primary: "Boxeez AS", secondary: 1 },
    ],
  },
  {
    label: 'Series 3',
    data: [
      { primary: "RoadGuard AS", secondary: 2 },
      { primary: "Volur AS", secondary: 1 },
      { primary: "Leratech Solutions", secondary: 1 },
    ],
  }
];
  console.log(companyId);
  
    
    
  return (
      
     
        <section className="main mainMargin scrollhost">
      <h1>Hi {user.name} </h1>
        {
          user.role === Role.Company &&
        <NavLink className={'noLink'} to={`/companies/companyDetails/${companyId}`} >
          <div><p>Go to Company Details</p></div>
          </NavLink>
      }
      
      {
          user.role === Role.Mentor &&
          <NavLink className={'noLink'} to={`/companies/companyDetails/${companyId}`} />
        }
        </section>
  
    );
}

export { Home };
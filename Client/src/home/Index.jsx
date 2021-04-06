import React, {useEffect,useState} from 'react';
import { accountService,companyService  } from '@/_services';
import {BarChart} from '@/_components';

function Home() {
    const user = accountService.userValue;
    
    const companyId = user.companies.id;
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

  
    
    
    return (
        <section className="main mainMargin scrollhost">
            <h1>Hi {user.name} </h1>
            
                <BarChart companyData={graphData}></BarChart>
            <br/>    
        </section>
    );
}

export { Home };
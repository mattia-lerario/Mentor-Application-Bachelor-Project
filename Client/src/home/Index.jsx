import React, {useEffect,useState} from 'react';
import { accountService,companyService  } from '@/_services';
import {BarChart} from '@/_components';

function Home() {
    const user = accountService.userValue;
    
    const companyId = user.companies.id;
    const [company, setUsers] = useState(null);
    
  

  
    
    
    return (
        <section className="main mainMargin scrollhost">
            <h1>Hi {user.name} </h1>
            
                <BarChart></BarChart>
            <br/>    
        </section>
    );
}

export { Home };
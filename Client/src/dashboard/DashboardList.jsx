import React, { useState, useEffect } from 'react';
//Styling
import {ListWrapper} from '../style/styledcomponents';
import { companyService } from '@/_services';

import { Link } from 'react-router-dom';
//icons

import {AiOutlineNumber} from 'react-icons/ai';

function DashboardList({ match }) {
    const { path } = match;
    const [company, setUsers] = useState(null);

    useEffect(() => {
        companyService.getAll().then(x => setUsers(x));
    }, []);
  
    

    return (
        <ListWrapper>
                <h1>Company Dashboard</h1>
                <p>All registred companies.</p>

                {company && company.map(company =>
                <Link className={'noLink'}to={`${path}/companyDetail/${company.id}`}>
                <article className="card" key= {company.id}>
                    
                    <section className="cardTop">
                        <img className="cardImg">{company.companyImg}</img> {/*Får ikke denne til å fungere. 
                        Tanken var å kunne legge ved et bilde som respresenterer bedriften når man legger de til i databasen. -Tora.*/}                        
                        <h4 className="companyName">{company.companyName}</h4>
                    <p><AiOutlineNumber/>{company.phase}</p>

                    </section>

                    <section className="cardMetric">
                        <p>Sales Revenue: {company.salesRevenue}</p>
                        <p>Company number: {company.companyDescription}</p>
                    </section>

                </article>
                </Link>

                )}              
        </ListWrapper>
        
        );
}

export { DashboardList }; 
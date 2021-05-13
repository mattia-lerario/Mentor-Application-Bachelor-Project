import React, { useState, useEffect } from 'react';
//Styling
import {ListWrapper} from '../style/styledcomponents';
import { companyService } from '@/_services';

import { Link } from 'react-router-dom';
//icons
import {AiOutlineNumber} from 'react-icons/ai';
import {HiOutlineMail} from 'react-icons/hi';
//img
import avatar from '../media/avatar.jpg';

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
                        <img className="cardImg" src={avatar}></img>
                        <h4 className="companyName">{company.companyName}</h4>
                    </section>

                    <section className="cardMetric">
                        <p>Sales Revenue: {company.salesRevenue}</p>
                        <p>Company number: {company.companyDescription}</p>
                    </section>
                    
                    <section className="cardBottom">
                        <Link to={`${path}/updateMentor`} className={'Tooltip'}>    
                            <HiOutlineMail/>
                            <span className={'TooltipText'}>Send email</span>
                        </Link>
                        <Link className={'Tooltip Left'}>    
                            <p><AiOutlineNumber/>{company.phase}</p>
                            <span className={'TooltipText'}>Phase</span>
                        </Link>
                    </section>

                </article>
                </Link>

                )}              
        </ListWrapper>
        
        );
}

export { DashboardList }; 
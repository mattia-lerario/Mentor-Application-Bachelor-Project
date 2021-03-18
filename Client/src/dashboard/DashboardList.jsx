import React, { useState, useEffect } from 'react';

//Styling
import {ListWrapper} from '../style/styledcomponents';

import { companyService } from '@/_services';
import { mentorService } from '@/_services';

//icons
import {HiOutlineMail} from 'react-icons/hi';
import {AiFillPhone, AiOutlineNumber} from 'react-icons/ai';
import {GrScheduleNew} from 'react-icons/gr';

function DashboardList({ match }) {
    const { path } = match;
    const [company, setUsers] = useState(null);

    useEffect(() => {
        companyService.getAll().then(x => setUsers(x));
    }, []);
  
    function phone(){
        //ringe nr
    }
    function schedule(){
        //til en annen side
    }

    return (
        <ListWrapper>
                <h1>All Companies</h1>

                {company && company.map(company =>

                <article className="card" key= {company.id}/*onClick={() => alert(company.companyName)}*/>
                    
                    <section className="cardTop">
                        <img className="cardImg">{company.companyImg}</img> {/*Får ikke denne til å fungere. 
                        Tanken var å kunne legge ved et bilde som respresenterer bedriften når man legger de til i databasen. -Tora.*/}                        
                        <h4 className="companyName">{company.companyName}</h4>
                    <p><AiOutlineNumber/>{company.phase}</p>

                    </section>

                    <section className="cardMetric">
                        <p>Sales Revenue: {company.salesRevenue}</p>
                        <p>Company number: {company.companyNumber}</p>
                    </section>

                </article>
                )}              
        </ListWrapper>
        
        );
}

export { DashboardList }; 
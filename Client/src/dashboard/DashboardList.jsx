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
                <h2>All Companies</h2>
                <p>All companies showcased in dashboard.</p>

                {company && company.map(company =>

                <article className="card" /*onClick={() => alert(company.companyName)}*/>
                    <section className="cardImg">
                        <img className="companyImg">{company.companyImg}</img> {/*Får ikke denne til å fungere. 
                        Tanken var å kunne legge ved et bilde som respresenterer bedriften når man legger de til i databasen. -Tora.*/}
                        
                        {/*
                        <p className="companyName">{company.companyName}</p>
                        */}
                    </section>

                    <section className="cardMetric">
                        <p>Sales Revenue: {company.salesRevenue}</p>
                        <p>Company number: {company.companyNumber}</p>
                    </section>

                    <section className="cardBottom">
                        {/*
                        Fjernet muligheten til å sende mail, ringe og booke møte i 'Dashboard', i med at dashboardet er ¨
                        tenkt for admins til å ha en oversikt over alle selskaper, right?
                        Mens under 'Companies' i menyen vil hver mentor få opp sine egen selskaper, right?
                        Beholdt alle funksjonene der, for at en mentor skal kunne sende mail, ringe og 
                        booke møte med selskapene sine.
                        Er vel ikke nødvendig for en admin å kunne gjøre dette?
                        Burde evt. tilpasse menyen etter brukeren som er logget inn. En mentor trenger ikke 
                        'Companies' i menyen sin, når han/hun har Dashboard. Hver mentro skal vel heller ikke 
                        ha tilgang til 'Dashboard' med alle selskapene, men kun 'Companies' med sine egen selskaper, 
                        ikke sant?
                        */}
                        <p><AiOutlineNumber/>{company.phase}</p>
                    </section>
                </article>
                )}              
        </ListWrapper>
        
        );
}

export { DashboardList }; 
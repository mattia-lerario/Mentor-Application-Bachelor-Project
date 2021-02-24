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

    return (
        
        <ListWrapper>
                <h2>All Companies</h2>
                <p>All companies showcased in dashboard.</p>

                {company && company.map(company =>

                <article className="card">
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
                        <p><HiOutlineMail/></p> 
                        {/*
                        <p id="cardMail"><HiOutlineMail/>: {company.email}</p> 
                        Evt bare ha mail-symbolet med en click funksjon for å sende mail til selskapet.
                        Uten at hele mail-adressen står skrevet her. -Tora*/}
                        <p><AiFillPhone/></p>
                        <p><GrScheduleNew/></p>
                        <p><AiOutlineNumber/>{company.phase}1</p> {/*Fungerer ikke, enda jeg har lagt det til i databasen også -Tora */}
                        {/*Legge inn sortering etter phase-number? fra 1 til 5 el. -Tora */}
                    </section>
                </article>
                )}              
        </ListWrapper>
        
        );
}

export { DashboardList }; 
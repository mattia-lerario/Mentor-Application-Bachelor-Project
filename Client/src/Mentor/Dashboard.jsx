import React, { useState, useEffect } from 'react';

//Styling
import {ListWrapper} from '../style/styledcomponents';

import { companyService } from '@/_services';
import { mentorService } from '@/_services';

//icons
import {HiOutlineMail} from 'react-icons/hi';
import {AiFillPhone, AiOutlineNumber} from 'react-icons/ai';
import {GrScheduleNew} from 'react-icons/gr';


import avatar from '../media/avatar.jpg';

function AssignedCompaniesList() {
    
    const [company, setUsers] = useState(null);
    useEffect(() => {
        companyService.getAll().then(x => 
            setUsers(x));
    }, []);

    useEffect(() => {
        mentorService.getAll().then(x => setUsers(x));
    }, []);

    function email(){
        //sende mail
        <a href="mailto:company.email"></a>
    }
    function phone(){
        //ringe nr
    }
    function schedule(){
        //til en annen side
    }

    return (
        
        <ListWrapper>
                <h2>Your companies</h2>

                {company && company.map(company => 

                <article className="card" key={company.id} onClick={() => alert(company.companyName)}>
                    <section className="cardImg">
                        <img className="companyImg" src={avatar}></img> {/*Får ikke denne til å fungere. 
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
                        <button onClick={email}><HiOutlineMail/></button> 
                        {/*
                        <p id="cardMail"><HiOutlineMail/>: {company.email}</p> 
                        Evt bare ha mail-symbolet med en click funksjon for å sende mail til selskapet.
                        Uten at hele mail-adressen står skrevet her. -Tora
                        */}
                        <button onClick={phone}><AiFillPhone/></button>
                        <button onClick={schedule}><GrScheduleNew/></button>
                        <p><AiOutlineNumber/>{company.phase}</p>
                    </section>
                </article>
                )}              
        </ListWrapper>
        
        );
}

export { AssignedCompaniesList }; 
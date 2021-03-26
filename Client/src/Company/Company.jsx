import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//style
import {ListWrapper} from '../style/styledcomponents'; 

import { companyService, accountService } from '@/_services';

//icons
import {HiOutlineMail} from 'react-icons/hi';
import {AiFillPhone, AiOutlineNumber} from 'react-icons/ai';
import {GrScheduleNew} from 'react-icons/gr';

function CompanyList({ match }) {
    const { path } = match;
    const [company, setUsers] = useState(null);

    const mentorId = accountService.userValue.mentors[0];
    //const mentorId = "605ddc40abbe3a5e54f27298a";

    console.log("trigger ", mentorId);
    
    useEffect(() => {
        companyService.getAll().then(x => setUsers(x));
    }, []);

  
    function phone(name, number){

        return(
        alert("Contact " + name + " on " + number)
        );        
    }
    function schedule(name){

        return(
        alert("Schedule with " + name)
        )
    }

    return (

        <ListWrapper>
            
             <button className={'Btn BtnMain Right'}><Link to={`${path}/updateWorkingHoursMentor`} className={'BtnLink'}>Update hours</Link></button>
             <button className={'Btn BtnMain Right'}><Link to={`${path}/powerranking`} className={'BtnLink'}>PowerRanking</Link></button>

             <h1>Your Companies</h1>
             
                {company && company.filter(company => company.leadMentor.includes(mentorId)).map(company => 
                
                <article key={company.id} className="card">
                <Link className={'noLink'}to={`${path}/companyDetails/${company.id}`}>
                    
                    <section className="cardTop">
                        <img className="cardImg">{company.companyImg}</img>                         
                    </section>

                    <section>
                    <h4 className="companyName">{company.companyName}</h4>                    
                    </section>

                    <section className="cardMetric">
                        <p>Sales Revenue: {company.salesRevenue}</p>
                        <p>Company number: {company.companyNumber}</p>
                    </section>

                    </Link>

                    <section className="cardBottom">
                        <button><HiOutlineMail/></button>
                        <button onClick={phone}><AiFillPhone/></button>
                        <button onClick={schedule}><GrScheduleNew/></button>
                        <p><AiOutlineNumber/>{company.phase}</p>
                    </section>                    
                </article>
                )}            
                
        </ListWrapper>
        
        );
}

export { CompanyList }; 

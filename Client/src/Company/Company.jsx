import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//style
import {ListWrapper} from '../style/styledcomponents';
import { BtnWrapper } from '../style/styledcomponents';

import { companyService, alertService } from '@/_services';

//icons
import {HiOutlineMail} from 'react-icons/hi';
import {AiFillPhone, AiOutlineCustomerService, AiOutlineNumber} from 'react-icons/ai';
import {GrScheduleNew} from 'react-icons/gr';

function CompanyList({ match }) {
    const { path } = match;
    const [company, setUsers] = useState(null);
    
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

             <h2>Your Companies</h2>
             <br></br>

                {company && company.filter(company => company.companyName.includes(" ")).map(company => 
                
                <article key={company.id} className="card">
                <Link to={`${path}/companyDetails/${company.id}`}>
                 
    
                    <section className="cardImg">
                        <img className="companyImg">{company.companyImg}</img> {/*Får ikke denne til å fungere. 
                        Tanken var å kunne legge ved et bilde som respresenterer bedriften når man legger de til i databasen. -Tora.*/}                        
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

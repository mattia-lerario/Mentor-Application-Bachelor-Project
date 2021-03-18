import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//style
import {ListWrapper} from '../style/styledcomponents';
import { BtnWrapper } from '../style/styledcomponents';

import { companyService } from '@/_services';
import { mentorService } from '@/_services';

//icons
import {HiOutlineMail} from 'react-icons/hi';
import {AiFillPhone, AiOutlineNumber} from 'react-icons/ai';
import {GrScheduleNew} from 'react-icons/gr';


function CompanyList({ match }) {
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
   /* function enterCompany(id){
        //til en annen side
        return(
        <Link to={`${path}/companyDetails/${id}`} className="Btn MainBtn LinkBtn">Knapp</Link>)
    }*/

    return (

        <ListWrapper>
             <button className={'Btn BtnMain Right'}><Link to={`${path}/updateWorkingHoursMentor`} className={'BtnLink'}>Update hours</Link></button>

             <h2>Your Companies</h2>
             <br></br>

                {company && company.filter(company => company.companyName.includes(" ")).map(company => 
                
                <article key={company.id} className="card">
                <Link to={`${path}/companyDetails/${company.id}`}>
                    
                    <section className="cardTop">
                        <img className="cardImg">{company.companyImg}</img> {/*Får ikke denne til å fungere. 
                        Tanken var å kunne legge ved et bilde som respresenterer bedriften når man legger de til i databasen. -Tora.*/}                        
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

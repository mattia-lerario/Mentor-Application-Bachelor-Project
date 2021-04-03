import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//style
import {ListWrapper} from '../style/styledcomponents'; 

import { companyService, accountService } from '@/_services';

//icons
import {HiOutlineMail} from 'react-icons/hi';
import {AiFillPhone, AiOutlineNumber} from 'react-icons/ai';
import {BiCalendarPlus} from 'react-icons/bi';

// eslint-disable-next-line react/prop-types
function CompanyList({ match }) {
    // eslint-disable-next-line react/prop-types
    const { path } = match;
    console.log(path)
    const [company, setUsers] = useState(null);

    const mentorId = accountService.userValue.mentors[0];
    
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
            
             <Link to={`${path}/updateWorkingHoursMentor`} className={'BtnLink'}>
                <button type="button" className={'Btn BtnMain Right'}>Update hours</button>
             </Link>
             <Link to={`${path}/powerranking`} className={'BtnLink'}>
                <button type="button" className={'Btn BtnMain Right'}>PowerRanking</button>
             </Link>
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
                        <Link to={`${path}/updateMentor`} className={'Tooltip'}>    
                            <HiOutlineMail/>
                            <span className={'TooltipText'}>Send email</span>
                        </Link>
                        <Link onClick={phone} className={'Tooltip'}>    
                            <AiFillPhone/>
                            <span className={'TooltipText'}>Make call</span>
                        </Link>
                        <Link onClick={schedule} className={'Tooltip'}>    
                            <BiCalendarPlus/>
                            <span className={'TooltipText'}>Book meeting</span>
                        </Link>
                        <p><AiOutlineNumber/>{company.phase}</p>
                    </section>                    
                </article>
                )}            
                
        </ListWrapper>
        
        );
}

export { CompanyList }; 

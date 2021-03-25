import React, { useState, useEffect } from 'react';

import { companyService, accountService } from '@/_services';
import { Field, Form } from 'formik';
import { Chart } from 'react-charts'

//import {MyChart, BarChart} from '@/_components';
//style
import {CompanyWrapper} from '../style/styledcomponents';


function CompanyDetails({ match }) {

    const { id } = match.params;
    const companyId = id;
   

    const [company, setUsers] = useState(null);
 

    function findMentor(id) {

   //console.log(accountService.getById(id).firstName);

    //console.log(accountService.getById(id).then(mentor => mentor.firstName));

    //const mentorName = "";
    accountService.getById(id).then(mentor => mentor.firstName);

    const mentor = "some mentor";

    return(
        mentor
    )

    }

    useEffect(() => {
        companyService.getAll().then(x => setUsers(x));
    }, []);
    

    return (

        <CompanyWrapper>
            {/* <Link to="/companies" className={'BtnSimple Right'}>Back</Link> */}

            {company && company.filter(company => company.id === companyId).map(company => 
                <article key={company.id}>

                    <section className="headerImg">
                        {company.companyImg} {/*Not working, but is supposed to show the image saved in the database on the specific company */}                    
                    </section>

                    <section>
                        <h1>{company.companyName}</h1>
                    </section>

                    <section>
                        <h4>Company details</h4>
                        <p>{company.CompanyDetails}</p>
                    </section>

                    <section className="MetricsBox">
                        <h4>Metrics</h4>
                        <p>Sales Revenue: {company.salesRevenue}</p>
                        <p>Company number: {company.companyNumber}</p>
                                         
                    </section>
                    <section>
                        
                        <h4>Time Log</h4>
                        <ul  key = {company.id}>
                        {company.hoursSpendtOnCompany && company.hoursSpendtOnCompany.map(hr =>

                       //date=new Date(hr.dateOfWork)
                                                
                        <li key = {hr.id}>{hr.hours} hours was used {hr.dateOfWork[8]}{hr.dateOfWork[9]}/{hr.dateOfWork[5]}{hr.dateOfWork[6]} by {findMentor(hr.byMentor)}</li> 
                        )}
                        </ul>
                        <p><b>Total time used on {company.companyName}</b></p>

                    </section>

                    <section className="MetricsBox">

                        <h4>Section for power ranking</h4>
                        {company.powerRanking && company.powerRanking.map(pr =>

                        <article
                        key = {pr.date}>
                            <p>{pr.question1}</p>
                            <p>{pr.comment1}</p>
                            <br></br>
                            <p>{pr.question2}</p>
                            <p>{pr.comment2}</p>
                        </article>
                        )}
                    </section>

                </article>
            )}

        </CompanyWrapper>
    );
}    

export { CompanyDetails };
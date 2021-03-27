import React, { useState, useEffect } from 'react';

import { companyService, accountService } from '@/_services';


//import {MyChart, BarChart} from '@/_components';
//style
import {CompanyWrapper} from '../style/styledcomponents';

// eslint-disable-next-line react/prop-types
function CompanyDetails({ match }) {
    const [totalHours, setTotalHours] = useState(0);
    // eslint-disable-next-line react/prop-types
    const { id } = match.params;
    const companyId = id;

    const [company, setUsers] = useState(null);

    function sumHours(timeLogList) {

        
        let hours = 0;
        timeLogList.forEach(item => {
            console.log(item);
        hours += item.hours;
           
        });

        setTotalHours(hours);
    }

    function findMentor(id) {

    accountService.getById(id).then(mentor => mentor.firstName);

    const mentor = "some mentor";

    return(
        mentor
    )

    }


    useEffect(() => {
        companyService.getAll().then(x => setUsers(x));
      
    }, []);

    useEffect(() => {
              
        if(!company)return;
        console.log(company);
        sumHours(company[0].hoursSpendtOnCompany)
        
    
    }, [company]);
    


    return (

        <CompanyWrapper>

            {company && company.filter(company => company.id === companyId).map(company => 
                <article key={company.id}>

                    <section className="headerImg">
                        {company.companyImg}                     
                    </section>

                    <section>
                        <h1>{company.companyName}</h1>
                    </section>

                    <section className ="Box MetricsBox">
                        <h4>Bio</h4>
                        <p>{company.companyDescription}</p>
                    </section>
                    
                    <section className="Box2">
                        <section className="Box MetricsBox">
                            <h4>Metrics</h4>
                            <p>Sales Revenue: {company.salesRevenue}</p>
                            <p>Company number: {company.companyNumber}</p>
                        </section>

                        <section className="Box TimeLog">
                            <h4>Time Log</h4>
                            <ul>
                                {company.hoursSpendtOnCompany && company.hoursSpendtOnCompany.map((hr, index) =>
                                <li key = {index}>{hr.hours} hours was used {hr.dateOfWork[8]}{hr.dateOfWork[9]}/{hr.dateOfWork[5]}{hr.dateOfWork[6]} by {findMentor(hr.byMentor)}</li>             
                                )}
                            </ul>
                            
                            <p><b>Total time used on {company.companyName}</b></p>
                            <p>{totalHours}</p>

                        </section>
                    </section>

                    <section className="Box PRbox">
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
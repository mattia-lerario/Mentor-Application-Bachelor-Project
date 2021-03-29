import React, { useState, useEffect } from 'react';

import { companyService, accountService } from '@/_services';

//import {MyChart, BarChart} from '@/_components';
//style
import {CompanyWrapper} from '../style/styledcomponents';


function CompanyDetails({ match }) {

    const [totalHours, setTotalHours] = useState(0);

    const { id } = match.params;
    const companyId = id;
    const [company, setUsers] = useState(null);

    function sumHours(timeLogList) {

        const reducer = (hr, currentValue) => hr + currentValue.hours;   
        const hours = (timeLogList.reduce(reducer, 0));
        setTotalHours(hours);
    }

    useEffect(() => {
        companyService.getAll().then(x => setUsers(x));
    }, []);

    useEffect(() => {
         
        async function fetchData() {
            
            if(!company)return;
            const comp = (await company.find(c => c.id === companyId));



            sumHours(comp.hoursSpendtOnCompany);
        }
        fetchData();
        
    }, [company]);
    

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
                        <p>{company.CompanyDetails}</p>
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
                                <li key = {index}>{hr.hours} hours was used {hr.dateOfWork[8]}{hr.dateOfWork[9]}/{hr.dateOfWork[5]}{hr.dateOfWork[6]}</li>             
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
                              { /*<br></br>
                                <BarChart data={data}></BarChart>*/}
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
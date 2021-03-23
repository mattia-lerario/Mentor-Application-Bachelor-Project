import React, { useState, useEffect } from 'react';

import { companyService } from '@/_services';
import { Field, Form } from 'formik';
import { Chart } from 'react-charts'

//import {MyChart, BarChart} from '@/_components';
//style
import {CompanyWrapper} from '../style/styledcomponents';



function CompanyDetails({ match }) {

    const { id } = match.params;
    const companyId = id;

    const [company, setUsers] = useState(null);
    /*charts*/
    /*const [chartData, setCharsdata] = useState({});

    const chart = () => {
        setCharsdata({
        labels: ['question 1', 'question 2','question 3','question 4'],
        dataSets: [{
            label: 'Raking from 1-6',
            data: [1,2,3,4],
            borderWidth: 4
        }
    ]
    })
    }*/

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
                        {company.powerRanking && company.powerRanking.map(pr =>

                        <article>
                            <p>{pr.question1}</p>
                            <p>{pr.question2}</p>
                        </article>
                        
                        )}
                    </section>

                </article>
            )}

        </CompanyWrapper>
    );
}    

export { CompanyDetails };
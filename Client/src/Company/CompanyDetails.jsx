import React, { useState, useEffect } from 'react';

import { companyService } from '@/_services';
import { Field, Form } from 'formik';
import { FormWrapper } from '../style/styledcomponents';


function CompanyDetails({ match }) {

    const { id } = match.params;
    const companyId = id;

    const [company, setUsers] = useState(null);

    useEffect(() => {
        companyService.getAll().then(x => setUsers(x));
    }, []);

    return (
        <FormWrapper>
            {/* <Link to="/companies" className={'BtnSimple Right'}>Back</Link> */}

            {company && company.filter(company => company.id === companyId).map(company => 

                <article key={company.id} className="card">

                    <section className="cardImg">
                        <p>Bilde</p>                      
                    </section>

                    <section>
                        <h4 className="companyName">{company.companyName}</h4>
                    </section>

                    <section className="cardMetric">
                        <p>Sales Revenue: {company.salesRevenue}</p>
                        <p>Company number: {company.companyNumber}</p>
                    </section>
                </article>
            )}

        </FormWrapper>
    );
}    

export { CompanyDetails };
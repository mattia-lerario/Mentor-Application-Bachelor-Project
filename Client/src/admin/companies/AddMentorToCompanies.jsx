import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { companyService, alertService } from '@/_services';
import { BtnWrapper } from '../../style/styledcomponents';
import { FormWrapper } from '../../style/styledcomponents';

function AddMentorToCompany({ history, match }) {

    const { id } = match.params;
    const company = companyService.companyValue;
    
    return(

        <Form> 

    <h1>{company.companyName }</h1>
    <p>
        <strong>Name: {company.companyName }</strong> <br />
        <strong>Email: {company.email}</strong><br />
        <strong>Role: {company.salesRevenue}</strong>
    </p>

    </Form>
    
    )
}

export { AddMentorToCompany };
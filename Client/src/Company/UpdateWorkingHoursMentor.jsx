import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { companyService, mentorService, alertService } from '@/_services';

function UpdateWorkingHouersMentor({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
   // const user = accountService.userValue;
    //const company = companyService.companyValue;
    //const mentor = mentorService.mentorValue;

    const [companies, setCompanies] = useState(null);

    useEffect(() => {
        companyService.getAll().then(x => setCompanies(x));
    }, []);

    const initialValues = {
        companyName: '',
        houersUsed: '',
    };

   /* const validationSchema = Yup.object().shape({
    
    });         */

    function onSubmit(fields, {setSubmitting }) {
        
            updateCompany(id, fields, setSubmitting);    
        
        }
        
        function updateCompany(id,fields,setSubmitting){
            companyService.update(id,fields)    
            .then(() => {
                alertService.success('Update successful', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
                console.log(error);
            });

        }

    return (
        <Formik initialValues={initialValues} /*validationSchema={validationSchema}*/ onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting, setFieldValue }) => {
                useEffect(() => {
                    if (!isAddMode) {
                        // get user and set form fields
                        mentorService.getById(id).then(mentor => {
                            const fields = ['companyName', 'houersUsed'];
                            fields.forEach(field => setFieldValue(field, mentor[field], false));
                        });
                    }
                }, []);

                return (
                    <Form>
                       
                        <div className="form-group col-7">
                                    <label>Choose Company</label>

                                    <Field name="companyName" as="select" className={'FormGroups' + (errors.companyName && touched.companyName ? ' is-invalid' : '')}>


                                {companies && companies.map(company =>
                                    <option key={company.id} value ={company.id}>{company.companyName}</option>)}
     
                                    </Field>
                                    <ErrorMessage name="mentor" component="div" className="InvalidFeedback" />

                        </div>

                        <div className="form-group col-7">
                                    <label>Houers used</label>
                                    <Field name="houersUsed" type="integer" className={'form-control' + (errors.houersUsed && touched.houersUsed ? ' is-invalid' : '')} />
                                    <ErrorMessage name="houersUsed" component="div" className="invalid-feedback" />
                        </div>
                               

                      <div className="form-group">
                            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Save
                            </button>
                            <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
                            </div>
                    </Form> 
                );
            }}
        </Formik>
    );
}

export { UpdateWorkingHouersMentor };
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { companyService, mentorService, alertService } from '@/_services';

function UpdateWorkingHoursMentor({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;

    const [companies, setCompanies] = useState(null);

    useEffect(() => {
        companyService.getAll().then(x => setCompanies(x));
    }, []);

    const initialValues = {
        companyId: '',
        hoursUsed: 0,
        date: '',
    };

   const validationSchema = Yup.object().shape({

    hoursUsed: Yup.number()
            .required('Hours is required')
            .positive('It must be a positive number')
            .min(1, "You must have minimum 1 hour")
            ,

    date: Yup.date()
            .required('Date is required')
            .max(new Date())
    
    });

    function onSubmit(fields, {setSubmitting }) {
        //console.log(fields);
        companyService.addMentorHours(fields.companyId,fields)    
        .then(() => {
            alertService.success('Update successful', { keepAfterRouteChange: true });
            history.push('.');
        })
        .catch(error => {
            setSubmitting(true);
            alertService.error(error);
            console.log(error);
        }); 
    }    
        
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting, setFieldValue }) => {
                useEffect(() => {
                    if (!isAddMode) {
                        // get user and set form fields
                        mentorService.getById(id).then(company => {
                            const fields = ['companyId', 'hoursUsed', 'date'];
                            fields.forEach(field => setFieldValue(field, company[field], false));
                        });
                    }
                }, []);

                return (
                    <Form>
                       
                        <div className="form-group col-7">
                                    <label>Choose Company</label>
                                    <Field name="companyId" as="select" className={'FormGroups' + (errors.companyId && touched.companyId ? ' is-invalid' : '')}>

                                {companies && companies.map(company =>
                                    <option key={company.id} value ={company.id}>{company.companyName}</option>)}
                                    </Field>

                                    <ErrorMessage name="companyId" component="div" className="InvalidFeedback" />
                        </div>

                        <div className="form-group col-7">
                                    <label>Hours used</label>
                                    <Field name="hoursUsed" type="number" className={'form-control' + (errors.hoursUsed && touched.hoursUsed ? ' is-invalid' : '')} />
                                    <ErrorMessage name="hoursUsed" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group col-7">
                                    <label>Date of work</label>
                                    <Field name="date" type="date" className={'form-control' + (errors.date && touched.date ? ' is-invalid' : '')} />
                                    <ErrorMessage name="date" component="div" className="invalid-feedback" />
                        </div>
                               

                      <div className="form-group">
                            <button type="submit" disabled={isSubmitting} className={'Btn BtnMain'}>
                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Save
                            </button>
                            <Link to={isAddMode ? '.' : '..'} className={'BtnSimple'}>Cancel</Link>
                            </div>
                    </Form> 
                );
            }}
        </Formik>
    );
}

export { UpdateWorkingHoursMentor };
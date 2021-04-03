import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { companyService, mentorService, alertService } from '@/_services';
// eslint-disable-next-line react/prop-types
function DirectUpdateWorkingHoursMentor({ history,match }) {
    // eslint-disable-next-line react/prop-types
    const { id } = match.params;
    const companyId = id;
    const isAddMode = !id;

    const initialValues = {
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
        
        companyService.addMentorHours(companyId,fields)    
        .then(() => {
            alertService.success('Update successful', { keepAfterRouteChange: true });
             // eslint-disable-next-line react/prop-types
            history.push('/companies/');
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
                            const fields = ['hoursUsed', 'date'];
                            fields.forEach(field => setFieldValue(field, company[field], false));
                        });
                    }
                }, []);

                return (
                    <Form>

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

export { DirectUpdateWorkingHoursMentor };
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { companyService, mentorService, alertService } from '@/_services';

function PowerRanking({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;

    const [companies, setCompanies] = useState(null);

    useEffect(() => {
        companyService.getAll().then(x => setCompanies(x));
    }, []);

    const initialValues = {
        question1: 0,
        comment1: '',
        question2: 0,
        comment2: '',
        question3: 0,
        comment3: '',
        question4: 0,
        comment4: '',
        question5: 0,
        comment5: '',
        question6: 0,
        comment6: '',
        question7: 0,
        comment7: '',
        question8: 0,
        comment8: '',
        quarter:'',
        date: '',
    };

   const validationSchema = Yup.object().shape({

    question1: Yup.number()
            .required('Questions must be answered with a value from 1 to 6')
            .positive('It must be a positive number')
            .min(1, "You must have minimum 1")
            ,
    quarter: Yup.number()
            .required('You Must select the Quarter of the Year this is for.')
            .positive('It must be a positive number')
            .min(1,"Minimum is 1")
            .max(4,"Maximum is 4"),
    date: Yup.date()
            .required('Date is required')
            .max(new Date())
    
    });

    function onSubmit(fields, {setSubmitting }) {
        console.log(fields);
        companyService.createPowerRanking(fields)    
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
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting, setFieldValue }) => {
                useEffect(() => {
                    if (!isAddMode) {
                        // get user and set form fields
                        companyService.getById(id).then(company => {
                            const fields = ['question1', 'comment1','question2', 'comment2','question3', 'comment3','question4', 'comment4','question5', 'comment5','question6', 'comment6','question7', 'comment7','question8', 'comment8','quarter', 'date'];
                            fields.forEach(field => setFieldValue(field, company[field], false));
                        });
                    }
                }, []);

                return (
                    <Form>
                       
                        <div className="form-group col-7">
                                    <label>Question1</label>
                                    <Field name="question1" type="number" className={'FormGroups' + (errors.question1 && touched.question1 ? ' is-invalid' : '')} />

                                    <ErrorMessage name="question1" component="div" className="InvalidFeedback" />
                        </div>

                        <div className="form-group col-7">
                                    <label>Question2</label>
                                    <Field name="question2" type="number" className={'FormGroups' + (errors.question2 && touched.question2 ? ' is-invalid' : '')} />

                                    <ErrorMessage name="companyId" component="div" className="InvalidFeedback" />
                        </div>

                        <div className="form-group col-7">
                                    <label>Question3</label>
                                    <Field name="question3" type="number" className={'FormGroups' + (errors.question3 && touched.question3 ? ' is-invalid' : '')} />

                                    <ErrorMessage name="question3" component="div" className="InvalidFeedback" />
                        </div>

                        <div className="form-group col-7">
                                    <label>Question4</label>
                                    <Field name="question4" type="number" className={'FormGroups' + (errors.question4 && touched.question4 ? ' is-invalid' : '')} />

                                    <ErrorMessage name="question4" component="div" className="InvalidFeedback" />
                        </div>

                        <div className="form-group col-7">
                                    <label>Question5</label>
                                    <Field name="question5" type="number" className={'FormGroups' + (errors.question5 && touched.question5 ? ' is-invalid' : '')} />

                                    <ErrorMessage name="question5" component="div" className="InvalidFeedback" />
                        </div>

                        <div className="form-group col-7">
                                    <label>Question6</label>
                                    <Field name="question6" type="number" className={'FormGroups' + (errors.question6 && touched.question6 ? ' is-invalid' : '')} />

                                    <ErrorMessage name="question6" component="div" className="InvalidFeedback" />
                        </div>

                        <div className="form-group col-7">
                                    <label>Question7</label>
                                    <Field name="question7" type="number" className={'FormGroups' + (errors.question7 && touched.question7 ? ' is-invalid' : '')} />

                                    <ErrorMessage name="question7" component="div" className="InvalidFeedback" />
                        </div>

                        <div className="form-group col-7">
                                    <label>Question8</label>
                                    <Field name="question8" type="number" className={'FormGroups' + (errors.question8 && touched.question8 ? ' is-invalid' : '')} />

                                    <ErrorMessage name="question8" component="div" className="InvalidFeedback" />
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

export { PowerRanking };
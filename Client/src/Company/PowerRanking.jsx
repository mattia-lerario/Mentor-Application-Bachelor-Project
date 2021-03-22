import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { companyService, alertService } from '@/_services';

function PowerRanking({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;

    const [companies, setCompanies] = useState(null);

    useEffect(() => {
        companyService.getAll().then(x => setCompanies(x));
    }, []);

    const initialValues = {
        question1: 0,
        comment1: 'q',
        question2: 0,
        comment2: 'q',
        question3: 0,
        comment3: 'q',
        question4: 0,
        comment4: 'q',
        question5: 0,
        comment5: 'q',
        question6: 0,
        comment6: 'q',
        question7: 0,
        comment7: 'q',
        question8: 0,
        comment8: 'q',
        question9: 0,
        comment9: 'q',
        question10: 0,
        comment10: 'q',
        question11: 0,
        comment11: 'q',
        date: '',
    };

   /*const validationSchema = Yup.object().shape({

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
    
    });*/

    function onSubmit(fields, {setSubmitting }) {
        console.log(fields.companyId);
        companyService.createPowerRanking(fields.companyId, fields)    
        .then(() => {
            alertService.success('Update successful', { keepAfterRouteChange: true });
            history.push('.');
        })
        .catch(error => {
            setSubmitting(false);
          alertService.error(error);
           // console.log(error);
        }); 
    }    
        
    return (
        <Formik initialValues={initialValues} /*validationSchema={validationSchema}*/ onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting, setFieldValue }) => {
                useEffect(() => {
                    if (!isAddMode) {
                        // get user and set form fields
                        console.log(id);
                        companyService.getById(id).then(company => {
                            const fields = ['companyId','question1', 'comment1','question2', 'comment2','question3', 'comment3','question4', 'comment4','question5', 'comment5','question6', 'comment6','question7', 'comment7','question8', 'comment8','question9', 'comment9', 'question10', 'comment10','question11', 'comment11','date'];
                            fields.forEach(field => setFieldValue(field, company[field], false));
                        });
                    }
                }, []);

                return (
                    <Form>
                        <div className="form-group col-7">
                                    <label>Choose Company to examine</label>
                                    <Field name="companyId" as="select" className={'FormGroups' + (errors.companyId && touched.companyId ? ' is-invalid' : '')}>
                                    <option key="blank" value=" "></option>
                                {companies && companies.map(company =>
                                
                                    <option key={company.id} value ={company.id}>{company.companyName}</option>)}
                                    </Field>

                                    <ErrorMessage name="companyId" component="div" className="InvalidFeedback" />
                        </div>
                       
                       <div>
                        <div className="form-group col-7">
                                    <label>Question1</label>
                                    <Field name="question1" type="number" className={'FormGroups' + (errors.question1 && touched.question1 ? ' is-invalid' : '')} />

                                    <ErrorMessage name="question1" component="div" className="InvalidFeedback" />
                        </div>

                         <div className="form-group col-7">
                                    <label>Comment 1</label>
                                    <Field name="comment1" type="textarea" className={'FormGroups' + (errors.comment1 && touched.comment1 ? ' is-invalid' : '')} />

                                    <ErrorMessage name="comment1" component="div" className="InvalidFeedback" />
                        </div>
                        </div>
                         
                        <div className="form-group col-7">
                                    <label>Question2</label>
                                    <Field name="question2" type="number" className={'FormGroups' + (errors.question2 && touched.question2 ? ' is-invalid' : '')} />

                                    <ErrorMessage name="companyId" component="div" className="InvalidFeedback" />
                        </div>

                        <div className="form-group col-7">
                                    <label>Comment 2</label>
                                    <Field name="comment2" type="textarea" className={'FormGroups' + (errors.comment2 && touched.comment2 ? ' is-invalid' : '')} />

                                    <ErrorMessage name="comment2" component="div" className="InvalidFeedback" />
                        </div>

                        <div className="form-group col-7">
                                    <label>Question3</label>
                                    <Field name="question3" type="number" className={'FormGroups' + (errors.question3 && touched.question3 ? ' is-invalid' : '')} />

                                    <ErrorMessage name="question3" component="div" className="InvalidFeedback" />
                        </div>

                        <div className="form-group col-7">
                                    <label>Comment 3</label>
                                    <Field name="comment3" type="textarea" className={'FormGroups' + (errors.comment3 && touched.comment3 ? ' is-invalid' : '')} />

                                    <ErrorMessage name="comment3" component="div" className="InvalidFeedback" />
                        </div>

                        <div className="form-group col-7">
                                    <label>Question4</label>
                                    <Field name="question4" type="number" className={'FormGroups' + (errors.question4 && touched.question4 ? ' is-invalid' : '')} />

                                    <ErrorMessage name="question4" component="div" className="InvalidFeedback" />
                        </div>

                        <div className="form-group col-7">
                                    <label>Comment 4</label>
                                    <Field name="comment4" type="textarea" className={'FormGroups' + (errors.comment4 && touched.comment4 ? ' is-invalid' : '')} />

                                    <ErrorMessage name="comment4" component="div" className="InvalidFeedback" />
                        </div>

                        <div className="form-group col-7">
                                    <label>Question5</label>
                                    <Field name="question5" type="number" className={'FormGroups' + (errors.question5 && touched.question5 ? ' is-invalid' : '')} />

                                    <ErrorMessage name="question5" component="div" className="InvalidFeedback" />
                        </div>

                        <div className="form-group col-7">
                                    <label>Comment5</label>
                                    <Field name="comment5" type="textarea" className={'FormGroups' + (errors.comment5 && touched.comment5 ? ' is-invalid' : '')} />

                                    <ErrorMessage name="comment5" component="div" className="InvalidFeedback" />
                        </div>

                        <div className="form-group col-7">
                                    <label>Question6</label>
                                    <Field name="question6" type="number" className={'FormGroups' + (errors.question6 && touched.question6 ? ' is-invalid' : '')} />

                                    <ErrorMessage name="question6" component="div" className="InvalidFeedback" />
                        </div>

                        <div className="form-group col-7">
                                    <label>Comment6</label>
                                    <Field name="comment6" type="textarea" className={'FormGroups' + (errors.comment6 && touched.comment6 ? ' is-invalid' : '')} />

                                    <ErrorMessage name="comment6" component="div" className="InvalidFeedback" />
                        </div>

                        <div className="form-group col-7">
                                    <label>Question7</label>
                                    <Field name="question7" type="number" className={'FormGroups' + (errors.question7 && touched.question7 ? ' is-invalid' : '')} />

                                    <ErrorMessage name="question7" component="div" className="InvalidFeedback" />
                        </div>

                        <div className="form-group col-7">
                                    <label>Comment 7</label>
                                    <Field name="comment7" type="textarea" className={'FormGroups' + (errors.comment7 && touched.comment7 ? ' is-invalid' : '')} />

                                    <ErrorMessage name="comment7" component="div" className="InvalidFeedback" />
                        </div>

                        <div className="form-group col-7">
                                    <label>Question8</label>
                                    <Field name="question8" type="number" className={'FormGroups' + (errors.question8 && touched.question8 ? ' is-invalid' : '')} />

                                    <ErrorMessage name="question8" component="div" className="InvalidFeedback" />
                        </div>

                        <div className="form-group col-7">
                                    <label>Comment 8</label>
                                    <Field name="comment8" type="textarea" className={'FormGroups' + (errors.comment8 && touched.comment8 ? ' is-invalid' : '')} />

                                    <ErrorMessage name="comment8" component="div" className="InvalidFeedback" />
                        </div>
                        <div className="form-group col-7">
                                    <label>Question8</label>
                                    <Field name="question8" type="number" className={'FormGroups' + (errors.question8 && touched.question8 ? ' is-invalid' : '')} />

                                    <ErrorMessage name="question8" component="div" className="InvalidFeedback" />
                        </div>

                        <div className="form-group col-7">
                                    <label>Comment 8</label>
                                    <Field name="comment8" type="textarea" className={'FormGroups' + (errors.comment8 && touched.comment8 ? ' is-invalid' : '')} />

                                    <ErrorMessage name="comment8" component="div" className="InvalidFeedback" />
                        </div>
                        <div className="form-group col-7">
                                    <label>Question8</label>
                                    <Field name="question8" type="number" className={'FormGroups' + (errors.question8 && touched.question8 ? ' is-invalid' : '')} />

                                    <ErrorMessage name="question8" component="div" className="InvalidFeedback" />
                        </div>

                        <div className="form-group col-7">
                                    <label>Comment 9</label>
                                    <Field name="comment9" type="textarea" className={'FormGroups' + (errors.comment9 && touched.comment9 ? ' is-invalid' : '')} />

                                    <ErrorMessage name="comment9" component="div" className="InvalidFeedback" />
                        </div>
                        <div className="form-group col-7">
                                    <label>Question 10</label>
                                    <Field name="question10" type="number" className={'FormGroups' + (errors.question10 && touched.question10 ? ' is-invalid' : '')} />

                                    <ErrorMessage name="question10" component="div" className="InvalidFeedback" />
                        </div>

                        <div className="form-group col-7">
                                    <label>Comment 11</label>
                                    <Field name="comment8" type="textarea" className={'FormGroups' + (errors.comment11 && touched.comment11 ? ' is-invalid' : '')} />

                                    <ErrorMessage name="comment11" component="div" className="InvalidFeedback" />
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
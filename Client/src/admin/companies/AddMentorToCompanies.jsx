import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { companyService, alertService, mentorService } from '@/_services';
import { BtnWrapper } from '../../style/styledcomponents';
import { FormWrapper } from '../../style/styledcomponents';

function AddEditMentor({ history, match }) {

    const [mentors, setMentors] = useState(null);
    const company = companyService.userValue;

    useEffect(() => {
        mentorService.getAll().then(x => setMentors(x));
    }, []);

    const { id } = match.params;
    const isAddMode = !id;

    const initialValues = {
        companyName: '',
        companyNumber: '',
        tlfNumber: '',
        email: '',
        salesRevenue: '',
        companyDescription: '',
        mentor: '',
    }

    const validationSchema = Yup.object().shape({
        companyName: Yup.string()
            .required('Company Name is required'),
        companyNumber: Yup.string()
            .required('Company Number is required'),
        tlfNumber: Yup.string()
            .required('Tlf is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        salesRevenue: Yup.string()
            .required('Sales Revenue is required'),
        companyDescription: Yup.string()
            .required("Description of company is Required"),
        phase: Yup.string()
            .required("Description of company is Required"),
        mentor: Yup.string(),
        
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
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
        
        /*useEffect(() => {
           
            async function fetchMentors(){
                const mentorArray = await mentorService.getAll();
                //const mentorArray1 = ["hei", "JAn", "Jørn"];
                setMentors(mentorArray);
            }

             fetchMentors();

        }, []);*/
        

        return (
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ errors, touched, isSubmitting, setFieldValue }) => {
                    useEffect(() => {                        
                            // get user and set form fields
                            companyService.getById(id).then(company => {
                                const fields = ['companyName', 'companyNumber', 'tlfNumber', 'email', 'salesRevenue', 'companyDescription','phase','mentor'];
                                fields.forEach(field => setFieldValue(field, company[field], false));
                            });                      
                    }, []);
                    
                    /*useEffect(() => {                        
                        // get mentor and set form fields
                        mentorService.getAll().then(mentor => {
                            const field = ['mentor'];
                            field.forEach(field => setFieldValue(field, mentor[field], false));
                        });                      
                }, []);*/
    
                    return (
                        <Form>
                            
                            <div className="form-row">
                                
                                <div className="form-group col-5">
                                    <label>Company Name</label>
                                    <Field name="companyName" type="text" className={'form-control' + (errors.companyName && touched.companyName ? ' is-invalid' : '')} />
                                    <ErrorMessage name="companyName" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group col-5">
                                    <label>Company Number</label>
                                    <Field name="companyNumber" type="text" className={'form-control' + (errors.companyNumber && touched.companyNumber ? ' is-invalid' : '')} />
                                    <ErrorMessage name="companyNumber" component="div" className="invalid-feedback" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-7">
                                    <label>Phone Number</label>
                                    <Field name="tlfNumber" type="text" className={'form-control' + (errors.tlfNumber && touched.tlfNumber ? ' is-invalid' : '')} />
                                    <ErrorMessage name="tlfNumber" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group col-7">
                                    <label>Email</label>
                                    <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                </div>
    
                                <div className="form-group col-7">
                                    <label>Sales Revenue</label>
                                    <Field name="salesRevenue" type="text" className={'form-control' + (errors.salesRevenue && touched.salesRevenue ? ' is-invalid' : '')} />
                                    <ErrorMessage name="salesRevenue" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group col-7">
                                    <label>Company Description</label>
                                    <Field component="textarea" name="companyDescription" type="text" className={'form-control' + (errors.companyDescription && touched.companyDescription ? ' is-invalid' : '')} />
                                    <ErrorMessage name="companyDescription" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group col-7">
                                    <label>Quarter</label>

                                    <Field name="phase" as="select" className={'form-control' + (errors.phase && touched.phase ? ' is-invalid' : '')}>
                                    <option value="">Unknown</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                       
                                    </Field>

                                    <ErrorMessage name="phase" component="div" className="invalid-feedback" />
                                </div>
                                

                                <div className="form-group col-7">
                                    <label>Assign Mentor</label>

                                    <Field name="mentor" as="select" className={'FormGroups' + (errors.mentor && touched.mentor ? ' is-invalid' : '')}>

                                        {/*mentors.map((mentor, index) => 
                                        <option key={index} value= {mentor._id}>{mentor.mentorName}</option>)*/}

                                {mentors && mentors.map(mentor =>
                                    <option key={mentor.id} value ={mentor.id}>{mentor.mentorName}</option>)}
     
                                    </Field>
                                    <ErrorMessage name="mentor" component="div" className="InvalidFeedback" />

                                </div>
    
    
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

export { AddEditMentor };
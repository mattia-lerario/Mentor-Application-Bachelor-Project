import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import {accountService, companyService, alertService } from '@/_services';

function UpdateCompanies({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    const user = accountService.userValue;
    const company = companyService.companyValue;

    const initialValues = {
        companyName: '',
        companyNumber: '',
        tlfNumber: '',
        email: '',
        salesRevenue: '',
        companyDescription: '',
        phase:'',        
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
            .required("Phase of company is Required")
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();

        console.log(isAddMode);

        if (isAddMode) {
            createCompany(fields, setSubmitting);
        } 
        
        else {
            updateCompany(id, fields, setSubmitting);
            
        }
        
        }


        function createCompany(fields, setSubmitting){
            companyService.create(fields)
            .then(() => {
                alertService.success('Create successful', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
                console.log(error);
            });


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
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting, setFieldValue }) => {
                useEffect(() => {
                    if (!isAddMode) {
                        // get user and set form fields
                        companyService.getById(id).then(company => {
                            const fields = ['companyName', 'companyNumber', 'tlfNumber', 'email', 'salesRevenue', 'companyDescription', 'phase'];
                            fields.forEach(field => setFieldValue(field, company[field], false));
                        });
                    }
                }, []);

                

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
                                <label>Phase</label>
                                <Field name="phase" type="text" className={'form-control' + (errors.phase && touched.phase ? ' is-invalid' : '')} />
                                <ErrorMessage name="phase" component="div" className="invalid-feedback" />
                            </div>


                        </div>
                        
                        <div className="form-group">
                            <button type="submit" disabled={isSubmitting} className={'Btn BtnMain'}>
                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Save
                            </button>
                            <Link to={isAddMode ? '.' : '..'} className={'Btn BtnSimple'}>Cancel</Link>
                        </div>
                        
                       
                    </Form>
                );
            }}
        </Formik>
    );
}

export { UpdateCompanies };
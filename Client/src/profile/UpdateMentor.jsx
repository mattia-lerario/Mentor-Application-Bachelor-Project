import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage, isEmptyArray } from 'formik';
import * as Yup from 'yup';

import { accountService,companyService, mentorService, alertService } from '@/_services';
import { empty } from 'rxjs';

function UpdateMentor({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    const user = accountService.userValue;
    const company = companyService.companyValue;
    const mentor = mentorService.mentorValue;

    const initialValues = {
        mentorName: user.firstName + " " + user.lastName,
        mentorNumber: '999887766',
        tlfNumber: '99887744',
        email: user.email,
        mentorDescription: 'This is a description',
    };

    const validationSchema = Yup.object().shape({
        mentorName: Yup.string()
            .required('Name Is required'),
        mentorNumber: Yup.string()
            .required('First Name is required'),
        tlfNumber: Yup.string()
            .required('Last Name is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        mentorDescription: Yup.string()
        .required('Description is required')
    });         

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();

        console.log(user.mentors.length);

       if (user.mentors.length > 0) {
            updateMentor(user.mentors, fields, setSubmitting); 
           //createMentor(fields, setSubmitting);
        }         
        else {
           //updateMentor(user.mentors, fields, setSubmitting);
           createMentor(fields, setSubmitting);         
        }
        
        }

    function createMentor(fields, setSubmitting){
        console.log(user.id);
            mentorService.create(user.id, fields)
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
        function updateMentor(id,fields,setSubmitting){
            mentorService.update(id,fields)    
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
                        mentorService.getById(id).then(mentor => {
                            const fields = ['mentorName', 'mentorNumber', 'tlfNumber', 'email','mentorDescription'];
                            fields.forEach(field => setFieldValue(field, mentor[field], false));
                        });
                    }
                }, []);

                return (
                    <Form>
                        <div className="form-row">
                            <div className="form-group col">
                                <label>Full Name</label>
                                <Field name="mentorName"
                                type="text" className={'form-control' + (errors.mentorName && touched.mentorName ? 'is-invalid' : '')} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col">
                                <label>Org nr:</label>
                                <Field name="mentorNumber"
                                type="text" className={'form-control' + (errors.mentorNumber && touched.mentorNumber ? 'is-invalid' : '')} />
                            </div>
                            <div className="form-group col">
                                <label>Phone Number</label>
                                <Field name="tlfNumber"
                                type="text" className={'form-control' + (errors.tlfNumber && touched.tlfNumber ? 'is-invalid' : '')} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-7">
                                <label>Email</label>
                                <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col">
                                <label>Mentor Description</label>
                                <Field name="mentorDescription"
                                type="text" className={'form-control' + (errors.mentorDescription && touched.mentorDescription ? 'is-invalid' : '')} />
                            </div>
                            
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

export { UpdateMentor };
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import {FormWrapper} from '../style/styledcomponents';
import { accountService, alertService } from '@/_services';

function Update({ history }) {
    
    const user = accountService.userValue;

    const initialValues = {
        title: user.title,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: '',
        confirmPassword: ''
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required'),
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string()
            .when('password', (password, schema) => {
                if (password) return schema.required('Confirm Password is required');
            })
            .oneOf([Yup.ref('password')], 'Passwords must match')
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        console.log(user.id);
        accountService.update(user.id, fields)

            .then(() => {
                alertService.success('Update successful', { keepAfterRouteChange: true });
                history.push('.');
            })
            
          .catch(error => {
                setSubmitting(false);
                alertService.error(error);
                console.log(error)
            });
    }

    
    const [isDeleting, setIsDeleting] = useState(false);
    function onDelete() {
        if (confirm('Are you sure?')) {
            setIsDeleting(true);
            accountService.delete(user.id)
                .then(() => alertService.success('Account deleted successfully'));
        }
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting }) => (
                <FormWrapper>
                    <Form>
                        <section  className="Center">
                            <h1>Update Profile</h1>
                            <div className="FormRow">
                                <div>
                                    <label>Title</label>
                                    <Field name="title" as="select" className={'FormGroups' + (errors.title && touched.title ? ' is-invalid' : '')}>
                                        <option value=""></option>
                                        <option value="Mr">Mr</option>
                                        <option value="Mrs">Mrs</option>
                                        <option value="Miss">Miss</option>
                                        <option value="Ms">Ms</option>
                                    </Field>
                                    <ErrorMessage name="title" component="div" className="InvalidFeedback" />
                                </div>
                                <div>
                                    <label>First Name</label>
                                    <Field name="firstName" type="text" className={'FormGroups' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                    <ErrorMessage name="firstName" component="div" className="InvalidFeedback" />
                                </div>
                                <div>
                                    <label>Last Name</label>
                                    <Field name="lastName" type="text" className={'FormGroups' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                    <ErrorMessage name="lastName" component="div" className="InvalidFeedback" />
                                </div>
                            </div>
                            <div className="FormRow">
                                <label>Email</label>
                                <Field name="email" type="text" className={'FormGroups' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                <ErrorMessage name="email" component="div" className="InvalidFeedback" />
                            </div>

                            <h3 className="PaddingTop">Change Password</h3>
                            <p>Leave blank to keep the same password</p>
                            <div className="FormRow">
                                <div>
                                    <label>Password</label>
                                    <Field name="password" type="password" className={'FormGroups' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                    <ErrorMessage name="password" component="div" className="InvalidFeedback" />
                                </div>
                                <div>
                                    <label>Confirm Password</label>
                                    <Field name="confirmPassword" type="password" className={'FormGroups' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                    <ErrorMessage name="confirmPassword" component="div" className="InvalidFeedback" />
                                </div>
                            </div>
                                <button type="submit" disabled={isSubmitting} className={'Btn BtnMain'}>

                                    {
                                    isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>} 
                                    Update
                                </button>
                                <button type="button" onClick={() => onDelete()} className={'Btn BtnDelete'} style={{ width: '75px' }} disabled={isDeleting}>
                                    {isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                                <Link to="." className={'BtnSimple'}>Cancel</Link>
                        </section>
                    </Form>
                </FormWrapper>
                
            )}
        </Formik>
    )
}

export { Update };
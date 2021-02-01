import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { accountService, alertService } from '@/_services';
import { BtnWrapper } from '../../style/styledcomponents';
import { FormWrapper } from '../../style/styledcomponents';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    
    const initialValues = {
        title: '',
        firstName: '',
        lastName: '',
        email: '',
        role: '',
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
        role: Yup.string()
            .required('Role is required'),
        password: Yup.string()
            .concat(isAddMode ? Yup.string().required('Password is required') : null)
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string()
            .when('password', (password, schema) => {
                if (password) return schema.required('Confirm Password is required');
            })
            .oneOf([Yup.ref('password')], 'Passwords must match')
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        if (isAddMode) {
            createUser(fields, setSubmitting);
        } else {
            updateUser(id, fields, setSubmitting);
        }
    }

    function createUser(fields, setSubmitting) {
        accountService.create(fields)
            .then(() => {
                alertService.success('User added successfully', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    function updateUser(id, fields, setSubmitting) {
        accountService.update(id, fields)
            .then(() => {
                alertService.success('Update successful', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting, setFieldValue }) => {
                    useEffect(() => {
                        if (!isAddMode) {
                            // get user and set form fields
                            accountService.getById(id).then(user => {
                                const fields = ['title', 'firstName', 'lastName', 'email', 'role'];
                                fields.forEach(field => setFieldValue(field, user[field], false));
                            });
                        }
                    },
                []);

                return (
                    <FormWrapper>
                        <div className="Center">
                            <h1>{isAddMode ? 'Add User' : 'Edit User'}</h1>
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
                                <div>
                                    <label>Email</label>
                                    <Field name="email" type="text" className={'FormGroups' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                    <ErrorMessage name="email" component="div" className="InvalidFeedback" />
                                </div>
                                <div>
                                    <label>Role</label>
                                    <Field name="role" as="select" className={'FormGroups' + (errors.role && touched.role ? ' is-invalid' : '')}>
                                        <option value=""></option>
                                        <option value="User">User</option>
                                        <option value="Mentor">Mentor</option>
                                        <option value="Company">Company</option>
                                        <option value="Admin">Admin</option>
                                    </Field>
                                    <ErrorMessage name="role" component="div" className="InvalidFeedback" />
                                </div>
                            </div>
                            {!isAddMode &&
                                <div>
                                    <h3 className="pt-3">Change Password</h3>
                                    <p>Leave blank to keep the same password</p>
                                </div>
                            }
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
                            <div className="form-group">
                                <BtnWrapper>
                                    <button type="submit" disabled={isSubmitting} className="Btn MainBtn">
                                        {isSubmitting && <span className=""></span>}
                                        Save
                                    </button>
                                    <Link to={isAddMode ? '.' : '..'} className="CancelBtn">Cancel</Link>
                                </BtnWrapper>
                            </div>
                        </div>
                    </FormWrapper>
                );
            }}
        </Formik>
    );
}

export { AddEdit };
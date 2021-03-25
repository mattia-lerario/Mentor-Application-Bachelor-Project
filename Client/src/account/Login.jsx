import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import {GlassForm} from '../style/styledcomponents';
import * as Yup from 'yup';

import { accountService, alertService } from '@/_services';

function Login({ history, location }) {
    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string().required('Password is required')
    });

    function onSubmit({ email, password }, { setSubmitting }) {
        alertService.clear();
        accountService.login(email, password)
            .then(() => {
                const { from } = location.state || { from: { pathname: "/" } };
                history.push(from);
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
                console.log(error)
            });
    }

    return (
        <GlassForm>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting }) => (
                <Form className="GlassBox">
                    <h3 className="CardHeaderLogin">Login</h3>
                    <section className="CardBodyLogin">
                        <div>
                            <label>Email</label>
                            <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                            <ErrorMessage name="email" component="div" className="InvalidFeedback" />
                        </div>
                        <div>
                            <label>Password</label>
                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="InvalidFeedback" />
                        </div>
                        <div className="form-row">
                            <div className="col">
                                <button type="submit" disabled={isSubmitting} className={'Btn BtnMain'}>
                                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Login
                                </button>
                            </div>
                                <Link to="forgot-password" className={'BtnSimple'}>Forgot Password?</Link>
                        </div>
                    </section>
                </Form>
            )}
        </Formik>
        </GlassForm>
    )
}

export { Login }; 
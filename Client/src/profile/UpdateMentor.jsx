import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Box, Button, Card, CardContent, CircularProgress, Grid, Step, StepLabel, Stepper } from '@material-ui/core';
import { Field, Form, Formik,  FieldArray } from 'formik';
import {TextField } from 'formik-material-ui';
import { object } from 'yup';
import { accountService, mentorService, alertService } from '@/_services';
import * as Yup from 'yup';

import {StepFormWrapper} from '../style/styledcomponents';


function UpdateMentor({ history, match }) {

    const { id } = match.params;
    const user = accountService.userValue;

    const initialValues = {
        
      mentorFirstName: user.firstName,
      mentorLastName: user.lastName,
      tlfNumber: '99887744',
      email: user.email,
      mentorDescription: 'This is a description',
      industriExpertise: 'Other..',
      mentorExpertise: 'Tech, children...',
      workExperience: 'Worked as mentor',
    };

    function onSubmit(fields, { setStatus, setSubmitting }) {

        setStatus();

        console.log(fields);
  
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
        
            mentorService.create(user.id, fields)
            .then(() => {
                alertService.success('Create successful', { keepAfterRouteChange: true });
                // eslint-disable-next-line react/prop-types
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
                // eslint-disable-next-line react/prop-types
                history.push('.');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
                console.log(error);
            });
  
        }
        
      return (
        <Card>
        <CardContent>
        <StepFormWrapper>
          <FormikStepper initialValues={initialValues}  onSubmit={onSubmit}>

          <FormikStep label="Personal Data" validationSchema={object({
              mentorFirstName: Yup.string()
              .required('A name is required'),
              mentorLastName: Yup.string()
              .required('A mentor needs a last name'),
              mentorDescription: Yup.string()
              .required('Please write somthing to describe yourself.'),
          })}>
              <Box className="Comment Margin">
                <Field fullWidth name="mentorFirstName" component={TextField} label="First Name"/>
              </Box>
              <Box className="Comment Margin">
                <Field fullWidth name="mentorLastName" component={TextField} label="Last Name"/>
              </Box>
              <Box className="Comment Margin">
                <Field fullWidth name="mentorDescription" component={TextField} label="Write your Bio"/>
              </Box>
            </FormikStep>

            <FormikStep label="Contact Information" validationSchema={object({
              tlfNumber: Yup.string()
              .required('A number is required'),
              email: Yup.string()
              .email('Email is invalid')
              .required('Email is required, f,eks a@b.c'),
          })}>
              <Box className="Email Margin">
                <Field fullWidth name="email" component={TextField} label="Email"/>
              </Box>
              <Box className="Number Margin">
                <Field fullWidth name="tlfNumber" component={TextField} label="Phone Number"/>
              </Box>
            </FormikStep>

            <FormikStep label="Experience and expertise"validationSchema={object({
              industriExpertise: Yup.string()
              .required('Write somthing about your industry expertise'),
              mentorExpertise: Yup.string()
              .required('Write somthing about your mentor expertise'),
              workExperience: Yup.string()
              .required('Write somthing about your former carrier.'),
          })}>
              <Box className="Comment Margin">
                <Field fullWidth name="industriExpertise" component={TextField} label="Write about your industry expertise"/>
              </Box>
              <Box className="Comment Margin">
                <Field fullWidth name="mentorExpertise" component={TextField} label="Write your mentor expertise"/>
              </Box>
              <Box className="Comment Margin">
                <Field fullWidth name="workExperience" component={TextField} label="Write your work experience"/>
              </Box>
            </FormikStep>
            </FormikStepper>
      </StepFormWrapper>
        </CardContent>
      </Card>);
  }
  export function FormikStep({ children }) {
      return <>{children}</>;
  }
  export function FormikStepper({ children, ...props }) {
    const childrenArray = React.Children.toArray(children);
    const [step, setStep] = useState(0);
    const currentChild = childrenArray[step];
    const [completed, setCompleted] = useState(false);
    function isLastStep() {
        return step === childrenArray.length - 1;
    }
    return (<Formik {...props} validationSchema={currentChild.props.validationSchema} onSubmit={async (values, helpers) => {
            if (isLastStep()) {
                await props.onSubmit(values, helpers);
                setCompleted(true);
            }
            else {
                setStep((s) => s + 1);
            }
        }}>
      {({ isSubmitting }) => (<Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (<Step key={child.props.label} completed={step > index || completed}>
                <StepLabel>{child.props.label}</StepLabel>
              </Step>))}
          </Stepper>

          {currentChild}

          <Grid container spacing={2}>
            {step > 0 ? (<Grid item>
                <Button disabled={isSubmitting} variant="contained" color="primary" onClick={() => setStep((s) => s - 1)}>
                  Back
                </Button>
              </Grid>) : null}
            <Grid item>
              
              <Button startIcon={isSubmitting ? <CircularProgress size="1rem"/> : null} disabled={isSubmitting} variant="contained" color="primary" type="submit">
                {isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}
              </Button>
            </Grid>
          </Grid>
        </Form>)}
    </Formik>);
}

export { UpdateMentor };

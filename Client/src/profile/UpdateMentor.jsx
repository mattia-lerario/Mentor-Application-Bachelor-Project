import React, { useState } from 'react';
import { Box, Button, Card, CardContent, CircularProgress, Grid, Step, StepLabel, Stepper } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import {TextField } from 'formik-material-ui';
import { object } from 'yup';
import { accountService, mentorService, alertService } from '@/_services';
import * as Yup from 'yup';

function UpdateMentor({ history, match }) {

    const { id } = match.params;
    const user = accountService.userValue;

    const initialValues = {
        
      mentorName: user.firstName + " " + user.lastName,
      mentorNumber: '999887766',
      tlfNumber: '99887744',
      email: user.email,
      mentorDescription: 'This is a description',
    };

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
          <FormikStepper initialValues={initialValues}  onSubmit={onSubmit}>{/*onSubmit={async (values) => {
              await sleep(3000);
              console.log('values', values);
          }}>*/}       
          <FormikStep label="Personal Data" validationSchema={object({
              mentorName: Yup.string()
              .required('A name is required'),
              mentorNumber: Yup.string()
              .required('A mentor needs a number'),
          })}>
              <Box paddingBottom={2}>
                <Field fullWidth name="mentorName" component={TextField} label="First Name"/>
              </Box>
              <Box paddingBottom={2}>
                <Field fullWidth name="mentorNumber" component={TextField} label="Mentor number"/>
              </Box>
            </FormikStep>
            <FormikStep label="Contact Information" validationSchema={object({
              tlfNumber: Yup.string()
              .required('A number is required'),
              email: Yup.string()
              .email('Email is invalid')
              .required('Email is required, f,eks a@b.c'),
          })}>
              <Box paddingBottom={2}>
                <Field fullWidth name="email" component={TextField} label="Email"/>
              </Box>
              <Box paddingBottom={2}>
                <Field fullWidth name="tlfNumber" component={TextField} label="Telefon Number"/>
              </Box>
            </FormikStep>
            <FormikStep label="Experience and expertise">
              <Box paddingBottom={2}>
                <Field fullWidth name="mentorDescription" component={TextField} label="Write you'r Bio"/>
              </Box>
            </FormikStep>
            </FormikStepper>
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
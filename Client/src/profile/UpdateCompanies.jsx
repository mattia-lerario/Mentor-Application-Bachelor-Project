import React, { useState } from 'react';
import { Box, Button, Card, CardContent, CircularProgress, Grid, Step, StepLabel, Stepper } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import {TextField } from 'formik-material-ui';
import { object } from 'yup';
import { accountService, companyService, alertService } from '@/_services';
import * as Yup from 'yup';

// eslint-disable-next-line react/prop-types
function UpdateCompanies({ history, match }) {
    // eslint-disable-next-line react/prop-types
    const { id } = match.params;
    const user = accountService.userValue;
    

    const initialValues = {
        companyName: 'name',
        companyNumber: '999887766',
        tlfNumber: '999887766',
        salesRevenue: '0',
        companyDescription: 'Big company',
        phase:'1',        
    }

 function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
    
        if (user.companies.length>0) {
         //createCompany(fields, setSubmitting);
            updateCompany(user.companies, fields, setSubmitting);
                       
        }   
        else {
            createCompany(fields, setSubmitting);
            //updateCompany(user.companies, fields, setSubmitting);             
        }
        
        }


       function createCompany(fields, setSubmitting){
            console.log(user.id);
            companyService.create(user.id, fields)
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

       

        function updateCompany(id,fields,setSubmitting){
            companyService.update(id,fields)    
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
          <FormikStep label="General information" validationSchema={object({
              companyName: Yup.string()
              .required('A name is required'),
              companyNumber: Yup.string()
              .required('A company needs a number'),
          })}>
              <Box paddingBottom={2}>
                <Field fullWidth name="companyName" component={TextField} label="Company Name"/>
              </Box>
              <Box paddingBottom={2}>
                <Field fullWidth name="companyNumber" component={TextField} label="Company number"/>
              </Box>
            </FormikStep>

            <FormikStep label="Contact Information" validationSchema={object({
              tlfNumber: Yup.string()
              .required('A number is required'),
              salesRevenue: Yup.string()
              .required('at least 0'),
          })}>
              <Box paddingBottom={2}>
                <Field fullWidth name="salesRevenue" component={TextField} label="Your company's sales revenue"/>
              </Box>
              <Box paddingBottom={2}>
                <Field fullWidth name="tlfNumber" component={TextField} label="Telefon Number"/>
              </Box>
            </FormikStep>
            <FormikStep label="Experience and expertise" validationSchema={object({
              companyDescription: Yup.string()
              .required('A description is required'),
              phase: Yup.string()
              .required('at least 1'),
          })}>
              <Box paddingBottom={2}>
                <Field fullWidth name="companyDescription" component={TextField} label="Write you'r Bio"/>
              </Box>
              <Box paddingBottom={2}>
                <Field fullWidth name="phase" component={TextField} label="Phase in program">
                </Field>
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

export { UpdateCompanies };
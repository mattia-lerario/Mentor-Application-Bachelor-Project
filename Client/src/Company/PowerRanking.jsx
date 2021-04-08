import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, CircularProgress, Grid, Step, StepLabel, Stepper, TextareaAutosize } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import {TextField} from 'formik-material-ui';

import InputLabel from '@material-ui/core/InputLabel';

import { object } from 'yup';
import { companyService, alertService } from '@/_services';
import * as Yup from 'yup';

import {StepFormWrapper} from '../style/styledcomponents';

function PowerRanking({history,match}) {
  const { id } = match.params;
  const isAddMode = !id;
    const [companies, setCompanies] = useState(null);
   
    useEffect(() => {
        companyService.getAll().then(x => setCompanies(x));
    }, []);

    const initialValues = {
        question1: 1,
        comment1: 'Comment',
        question2: 1,
        comment2: ' Write Comment here',
        question3: 1,
        comment3: ' Write Comment here',
        question4: 1,
        comment4: ' Write Comment here',
        question5: 1,
        comment5: ' Write Comment here',
        question6: 1,
        comment6: ' Write Comment here',
        question7: 1,
        comment7: ' Write Comment here',
        question8: 1,
        comment8: ' Write Comment here',
        question9: 1,
        comment9: ' Write Comment here',
        question10: 1,
        comment10: ' Write Comment here',
        question11: 1,
        comment11: ' Write Comment here',
        date: '',
    }

   function onSubmit(fields, {setSubmitting }) {
     console.log(fields.companyId);
     
       companyService.createPowerRanking(fields.companyId, fields)
         .then(() => {
           alertService.success('Information Updated', { keepAfterRouteChange: true });
           // eslint-disable-next-line react/prop-types
           history.push('.');
         })
         .catch(error => {
           console.log(error);
           setSubmitting(false);
           alertService.error(error);
         });
     
    }  

    return (
      <StepFormWrapper>
        <Card>
        <CardContent>
        <FormikStepper initialValues={initialValues}  onSubmit={onSubmit}>
          <FormikStep label="Company and date">
              <Box className="Date Margin">
              <label>Choose a company </label>
              <br/>
              <Field name="companyId" as="select" label="Choose company" className="DropDown">
                   
                    <option key="blank" value="blank"></option>
                        {companies && companies.map(company =>
                    <option key={company.id} value ={company.id}>{company.companyName}</option>)}
              </Field>

              </Box>
              <Box className="Date Margin">
              <InputLabel id="demo-simple-select-label">Date of examination</InputLabel>
                <Field fullWidth name="date" type="date" component={TextField}/>
              </Box>
            </FormikStep>

{/*--------------------------------------------------Step 1-----------------------------------------------------------*/}
              
          <FormikStep className="Step" label="Question 1" validationSchema={object({
              question1: Yup.number()
              .required('Questions must be answered with a value from 1 to 6')
              .positive('It must be a positive number')
              .min(1, "You must have minimum 1"),
              comment1: Yup.string()
              .required('Please give a comment to this rating'),
          })}>
          <Box className="Question Margin">
            <label>
              Do the team have the necessary drive and execution power to reach the company goals, formal 
              background to execute key tasks, complementary CV (tech and business), ability to take feedback from mentors and  
              an overall underatsing of the challenges should be taken into account in building a great company?
            </label>
          </Box>
              <Box className="Rating Margin">
                <Field fullWidth name="question1" type="number" component={TextField} label="Rate from 1-6"/>
              </Box>
              <Box className="Comment Margin">
                <Field fullWidth name="comment1" component={TextField} label="Comment"/>
              </Box>
            </FormikStep>
{/*--------------------------------------------------Step 2-----------------------------------------------------------*/}
           
            <FormikStep label="Question 2" validationSchema={object({
              question1: Yup.number()
              .required('Questions must be answered with a value from 1 to 6')
              .positive('It must be a positive number')
              .min(1, "You must have minimum 1"),
              comment1: Yup.string()
              .required('Please give a comment to this rating'),
          })}>
            <Box className="Question Margin">
              <label> 
                Is the positioning of the product offering good enough to make a difference in the market?
                Do the offering have the needed competitive edge?
                Is the offering scalable?
                How unique is the offering compared to others in the market?
              </label>
            </Box>
              <Box className="Rating Margin">
                <Field fullWidth name="question1" type="number" component={TextField} label="Rate from 1-6"/>
              </Box>
              <Box className="Comment Margin">
                <Field fullWidth name="comment1" component={TextField} label="Comment"/>
              </Box>
            </FormikStep>

{/*--------------------------------------------------Step 3-----------------------------------------------------------*/}
            <FormikStep label="Question 3" validationSchema={object({
              question3: Yup.number()
              .required('Questions must be answered with a value from 1 to 6')
              .positive('It must be a positive number')
              .min(1, "You must have minimum 1"),
              comment3: Yup.string()
              .required('Please give a comment to this rating'),
          })}>
            <Box className="Question Margin">
              <label>
                Is the target market large enough?
                Is there attractive follow on market? 
                Is it possible for the company to grow outside the Nordics? 
              </label>
            </Box>
              <Box className="Rating Margin">
                <Field fullWidth name="question3" type="number" component={TextField} label="Rate from 1-6"/>
              </Box>
              <Box className="Comment Margin">
                <Field fullWidth name="comment3" component={TextField} label="Comment"/>
              </Box>
            </FormikStep>
{/*--------------------------------------------------Step 4-----------------------------------------------------------*/}
<FormikStep label="Question  4" validationSchema={object({
              question4: Yup.number()
              .required('Questions must be answered with a value from 1 to 6')
              .positive('It must be a positive number')
              .min(1, "You must have minimum 1"),
              comment4: Yup.string()
              .required('Please give a comment to this rating'),
          })}>
            <Box  className="Question Margin">
              <label>
                Is the company on track to deliver on it's milestones?
                Do the company as a whole have the necessary drive and traction in the market, 
                customer traction in form of early orders, paid pilots, etc.?
              </label>
            </Box>
              <Box className="Rating Margin">
                <Field fullWidth name="question4" type="number" component={TextField} label="Rate from 1-6"/>
              </Box>
              <Box className="Comment Margin">
                <Field fullWidth name="comment4" component={TextField} label="Comment"/>
              </Box>
            </FormikStep>
{/*--------------------------------------------------Step 5-----------------------------------------------------------*/}
<FormikStep label="Question 5" validationSchema={object({
              question5: Yup.number()
              .required('Questions must be answered with a value from 1 to 6')
              .positive('It must be a positive number')
              .min(1, "You must have minimum 1"),
              comment5: Yup.string()
              .required('Please give a comment to this rating'),
          })}>
            <Box className="Question Margin">
              <label>
                Do the company have the vision and drive to capture the full potential of it's offering and it's opportunity?
                Do the company have the ability to be on time with it's work and manage it's daily work the correct way?
              </label>
            </Box>
              <Box className="Rating Margin">
                <Field fullWidth name="question5" type="number" component={TextField} label="Rate from 1-6"/>
              </Box>
              <Box className="Comment Margin">
                <Field fullWidth name="comment5" component={TextField} label="Comment"/>
              </Box>
            </FormikStep>

{/*--------------------------------------------------Step 6-----------------------------------------------------------*/}
<FormikStep label="Question 6" validationSchema={object({
              question6: Yup.number()
              .required('Questions must be answered with a value from 1 to 6')
              .positive('It must be a positive number')
              .min(1, "You must have minimum 1"),
              comment6: Yup.string()
              .required('Please give a comment to this rating'),
          })}>
            <Box className="Question Margin">
              <label>
                Is it sufficient tech know-how in the company to be able to execute the product vision?
                Is the company able to put drawing on a paper into coding?
              </label>
            </Box>
              <Box className="Rating Margin">
                <Field fullWidth name="question6" type="number" component={TextField} label="Rate from 1-6"/>
              </Box>
              <Box className="Comment Margin">
                <Field fullWidth name="comment6" component={TextField} label="Comment"/>
              </Box>
            </FormikStep>
{/*--------------------------------------------------Step 7-----------------------------------------------------------*/}
<FormikStep label="Question 7" validationSchema={object({
              question7: Yup.number()
              .required('Questions must be answered with a value from 1 to 6')
              .positive('It must be a positive number')
              .min(1, "You must have minimum 1"),
              comment7: Yup.string()
              .required('Please give a comment to this rating'),
          })}>
            <Box className="Question Margin">
              <label>
                Do the company have an overview and understanding of it's market?
                Is the company capuring feedback from the market? (references not only positive)
              </label>
            </Box>
              <Box className="Rating Margin">
                <Field fullWidth name="question7" type="number" component={TextField} label="Rate from 1-6"/>
              </Box>
              <Box className="Comment Margin">
                <Field fullWidth name="comment7" component={TextField} label="Comment"/>
              </Box>
            </FormikStep>
{/*--------------------------------------------------Step 8-----------------------------------------------------------*/}
<FormikStep label="Question 8" validationSchema={object({
              question8: Yup.number()
              .required('Questions must be answered with a value from 1 to 6')
              .positive('It must be a positive number')
              .min(1, "You must have minimum 1"),
              comment8: Yup.string()
              .required('Please give a comment to this rating'),
          })}>
            <Box className="Question Margin">
              <label>
                Is the company performing on sales growth metrics?
                Below 20% growth Y/Y is a score = 1. 
              </label>
            </Box>
              <Box className="Rating Margin">
                <Field fullWidth name="question8" type="number" component={TextField} label="Rate from 1-6"/>
              </Box>
              <Box className="Comment Margin">
                <Field fullWidth name="comment8" component={TextField} label="Comment"/>
              </Box>
            </FormikStep>
{/*--------------------------------------------------Step 9-----------------------------------------------------------*/}
<FormikStep label="Question 9" validationSchema={object({
              question9: Yup.number()
              .required('Questions must be answered with a value from 1 to 6')
              .positive('It must be a positive number')
              .min(1, "You must have minimum 1"),
              comment9: Yup.string()
              .required('Please give a comment to this rating'),
          })}>
            <Box className="Question Margin">
              <label>
                Is the timing right for introducing the offering or is the company too late to the party?
                How is the competitive picture and has this been done before? 
              </label>
            </Box>
              <Box className="Rating Margin">
                <Field fullWidth name="question9" type="number" component={TextField} label="Rate from 1-6"/>
              </Box>
              <Box className="Comment Margin">
                <Field fullWidth name="comment9" component={TextField} label="Comment"/>
              </Box>
            </FormikStep>
{/*--------------------------------------------------Step 10-----------------------------------------------------------*/}
<FormikStep label="Question 10" validationSchema={object({
              question10: Yup.number()
              .required('Questions must be answered with a value from 1 to 6')
              .positive('It must be a positive number')
              .min(1, "You must have minimum 1"),
              comment10: Yup.string()
              .required('Please give a comment to this rating'),
          })}>
            <Box className="Question Margin">
              <label>
                Is the company contributing to solving global sustainability challenges? 
                How well is that captured in their strategy?
              </label>
            </Box>
              <Box className="Rating Margin">
                <Field fullWidth name="question10" type="number" component={TextField} label="Rate from 1-6"/>
              </Box>
              <Box className="Comment Margin">
                <Field fullWidth name="comment10" component={TextField} label="Comment"/>
              </Box>
            </FormikStep>
{/*--------------------------------------------------Step 11-----------------------------------------------------------*/}
<FormikStep label="Question 11" validationSchema={object({
              question11: Yup.number()
              .required('Questions must be answered with a value from 1 to 6')
              .positive('It must be a positive number')
              .min(1, "You must have minimum 1"),
              comment11: Yup.string()
              .required('Please give a comment to this rating'),
          })}>
            <Box className="Question Margin">
              <label>

              </label>
            </Box>
              <Box className="Rating Margin">
                <Field fullWidth name="question11" type="number" component={TextField} label="Rate from 1-6"/>
              </Box>
              <Box className="Comment Margin">
                <Field fullWidth name="comment11" component={TextField} label="Comment"/>
              </Box>
            </FormikStep>
            </FormikStepper>
        </CardContent>
      </Card>
      </StepFormWrapper>);
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
              
              <Button className="NextSubmitBtn" startIcon={isSubmitting ? <CircularProgress size="1rem"/> : null} disabled={isSubmitting} variant="contained" color="primary" type="submit">
                {isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}
              </Button>
            </Grid>
          </Grid>
        </Form>)}
    </Formik>);
}

export { PowerRanking };
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';

import { accountService, mentorService, alertService } from '@/_services';

// eslint-disable-next-line react/prop-types
function UpdateMentor({ history, match }) {


<<<<<<< HEAD

=======
>>>>>>> parent of 7627fcf (Update mentor works, not sure about create yet)
  const { id } = match.params;
    const isAddMode = !id;
    const user = accountService.userValue;

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
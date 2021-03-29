import { Card, CardContent, Typography } from '@material-ui/core';
import { Field, Form, Formik, FormikConfig, FormikValues } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-material-ui';
import React, { useState } from 'react';
import { mixed, number, object } from 'yup';

export default function Home() {
  return (
    <Card>
      <CardContent>
        <Formik>
           <Form>
               <Field name="firstName" component={TextField} label="First Name"/>
           </Form>    
        </Formik>
      </CardContent>
    </Card>
  );
}
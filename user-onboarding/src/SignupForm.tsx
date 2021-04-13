import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
 
// Shape of form values
interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  id: string;
  terms: boolean;
}

const SignupSchema: Yup.ObjectSchema<{}> = Yup.object().shape( {
  firstName: Yup.string()
    .min( 2, 'Too Short!' )
    .max( 50, 'Too Long!' )
    .required( 'Required' ),
  lastName: Yup.string()
    .min( 2, 'Too Short!' )
    .max( 50, 'Too Long!' )
    .required( 'Required' ),
  email: Yup.string().email( 'Invalid email' ).required( 'Required' ),
  password: Yup.string()
    .min( 8, 'Must have at least 8 characters' )
    .max( 16, 'No more than 16 characters allowed' )
    .required( 'Required' ),
  terms: Yup.boolean().required( 'Required' ),
} );

const SignupForm: React.FC<{}> = () => (
   <div>
     <h1>Signup</h1>
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        id: uuidv4(),
        terms: false,
      }}

      validationSchema={SignupSchema}
      
       onSubmit={(values: FormValues) => {
         axios.post( `https://reqres.in/api/users`, {
           firstName: values.firstName,
           lastName: values.lastName,
           email: values.email,
           password: values.password,
           id: values.id,
           terms: values.terms
         } ).then( res => {
           console.log( res );
         } );
       }}
    >
       {({ errors, touched, isValid, dirty, values }) => (
        <Form>
            <label >First Name: </label>
            <Field name="firstName" />
            {errors.firstName && touched.firstName ? (
              <div>{errors.firstName}</div>
          ) : null}
            <label>Last Name: </label>
            <Field name="lastName" />
            {errors.lastName && touched.lastName ? (
              <div>{errors.lastName}</div>
          ) : null}
            <label>Email: </label>
            <Field name="email" type="email" />
            {errors.email && touched.email ? (
            <div>{errors.email}</div>
          ) : null}
            <label>Password: </label>
            <Field name="password" type="password" />
            {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : null}
            <label>Terms of Service: </label>
            <Field name="terms" type="checkbox" id="terms"/>
            {errors.terms && touched.terms ? (
            <div>{errors.terms}</div>
          ) : null}
            <button type="submit" disabled={!(dirty && isValid && values.terms)} >Submit</button>
         </Form>
       )}
     </Formik>
   </div>
 );

export default SignupForm;
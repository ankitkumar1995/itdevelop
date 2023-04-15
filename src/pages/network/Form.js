import { Form, Formik } from 'formik';
import { Field, useField } from 'formik';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import * as Yup from 'yup';

const validation = Yup.object().shape({
  companyName: Yup.string()
    .matches(/^[a-zA-Z]+$/, 'Invalid Name')
    .required('Required'),
  name: Yup.string().matches(/^[a-zA-Z]+$/, 'Invalid Name'),
  email: Yup.string().email('Invalid Email').required('Required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Invalid Phone Number')
    .required('Required'),
});

const SubmitForm = ({}) => {
  let initialValues = {
    companyName: '',
    name: '',
    email: '',
    phone: '',
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validation}
      onSubmit={(values) => {}}
    >
      {({ values, errors, touched }) => (
        <Form>
          <div className="modal-form">
            <div className="single-form">
              <label for="#">Company Name*</label>
              <Field
                type="text"
                placeholder="Enter Company name"
                name="companyName"
              />
            </div>
            <div className="single-form">
              <label for="#">Full name *</label>
              <Field type="text" placeholder="Enter Name here" name="name" />
            </div>
            <div className="single-form">
              <label for="#">Email *</label>
              <Field type="Email" placeholder="Enter Email here" name="email" />
            </div>
            <div className="single-form">
              <label for="#">Mobile number *</label>
              <Field
                type="text"
                placeholder="Enter Mobile Number"
                name="phone"
              />
            </div>
            <div className="modal-contact-btn">
              <button
                type="submit"
                //   onClick={() => window.open(`mailto: ${email}`)}
              >
                Submit Request
                <i className="fas fa-arrow-right" />
              </button>
            </div>
            <div className="privicy-text">
              <p>
                By clicking on submit request you agree to our{' '}
                <a href="#">Terms &amp; Conditions </a>
                and accordance with our <a href="#">Privacy Policy</a>
              </p>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SubmitForm;

import React from 'react';
import { Formik, Form } from 'formik';
import FormInput from '../formInputs/FormInputs';
import { passwordSchema } from '../schema/FormSchema';
import { Col, Row } from 'reactstrap';

const EditPasswordForm = ({ initialValues, onFormSubmit }) => {
  return (
    <div className="profile-form-container">
      <Formik
        initialValues={initialValues}
        onSubmit={onFormSubmit}
        validationSchema={passwordSchema}
      >
        {({ errors, touched }) => (
          <Form>
            <Row>
              <Col sm={12} md={6}>
                <FormInput
                  type={'password'}
                  id={'currentPassword'}
                  placeholder={'Enter text here'}
                  label={'Current Password'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6}>
                <FormInput
                  type={'password'}
                  id={'newPassword'}
                  placeholder={'Enter text here'}
                  label={'Current Password'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'password'}
                  id={'reenterNewPassword'}
                  placeholder={'Enter text here'}
                  label={'Repeat new password'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
            </Row>
            <div className="edit-profile-form-submit">
              <button type="submit">Save</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditPasswordForm;

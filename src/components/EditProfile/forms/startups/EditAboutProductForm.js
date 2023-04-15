import React from 'react';
import { Formik, Form } from 'formik';
import FormInput from '../formInputs/FormInputs';
import { productSchema } from '../schema/FormSchema';
import { Col, Row } from 'reactstrap';

const EditAboutProductForm = ({ initialValues, onFormSubmit }) => {
  const handleSubmit = (values) => {
    const data = {};
    data['registeration.industryInfo.productOrServiceDescription'] =
      values.companyProduct;
    onFormSubmit({ ...data });
  };
  return (
    <div className="profile-form-container">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={productSchema}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Row>
              <Col sm={12} md={12}>
                <FormInput
                  type={'textarea'}
                  id={'companyProduct'}
                  placeholder={'Brief about your products/services'}
                  label={'Brief about your products/services'}
                  iserror={errors}
                  isTouched={touched}
                  wordLimit={251}
                  unlimitedWords={false}
                />
              </Col>
            </Row>
            <div className="edit-profile-form-submit">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Updating...' : 'Save'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditAboutProductForm;

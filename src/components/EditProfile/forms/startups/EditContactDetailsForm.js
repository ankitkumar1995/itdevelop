import React from 'react';
import { Formik, Form } from 'formik';
import FormInput from '../formInputs/FormInputs';
import { contactDetailsSchema } from '../schema/FormSchema';
import { Col, Row } from 'reactstrap';
import { districtData } from '../../helper/constants';

const EditContactDetailsForm = ({ initialValues, onFormSubmit }) => {
  const handleSubmit = (values) => {
    const data = {
      'registeration.companyFounderDetail.mobile': values.mobileNumber,
      'registeration.companyFounderDetail.companyEmail': values.email,
      'registeration.companyFounderDetail.fax': values.faxNumber,
      'registeration.companyFounderDetail.landLine': values.landLineNumber,
      'registeration.companyFounderDetail.registeredIncorporationAddress':
        values.address,
      'registeration.companyFounderDetail.city': values.city,
      'registeration.companyFounderDetail.district': values.district,
      'registeration.companyFounderDetail.pinCode': values.pincode,
      'registeration.companyFounderDetail.state': values.state,
    };
    onFormSubmit({ ...data });
  };
  return (
    <div className="profile-form-container">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={contactDetailsSchema}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <h4 className="modal-section-header">
              Company/Organization Contact Details
            </h4>
            <Row>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'mobileNumber'}
                  placeholder={'Enter mobile number'}
                  label={'mobile number'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'email'}
                  placeholder={'Enter email'}
                  label={'email'}
                  iserror={errors}
                  isTouched={touched}
                  wordLimit={251}
                  unlimitedWords={false}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'landLineNumber'}
                  placeholder={'Enter landline number'}
                  label={'landline number'}
                  iserror={errors}
                  isTouched={touched}
                  wordLimit={251}
                  unlimitedWords={false}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'faxNumber'}
                  placeholder={'Enter Fax number'}
                  label={'Fax number'}
                  iserror={errors}
                  isTouched={touched}
                  wordLimit={251}
                  unlimitedWords={false}
                />
              </Col>
            </Row>
            <h4 className="modal-section-header">Company Address</h4>
            <Row>
              <Col sm={12} md={12}>
                <FormInput
                  type={'textarea'}
                  id={'address'}
                  placeholder={'Enter address'}
                  label={'Registered address as per Incorporation Certificate'}
                  iserror={errors}
                  isTouched={touched}
                  wordLimit={251}
                  unlimitedWords={false}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'city'}
                  placeholder={'Enter city'}
                  label={'city/town'}
                  iserror={errors}
                  isTouched={touched}
                  wordLimit={251}
                  unlimitedWords={false}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'select'}
                  id={'district'}
                  placeholder={'District'}
                  label={'District'}
                  options={districtData.map((district) => ({
                    label: district,
                    item: district,
                  }))}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'pincode'}
                  placeholder={'Enter pincode'}
                  label={'pincode'}
                  iserror={errors}
                  isTouched={touched}
                  wordLimit={251}
                  unlimitedWords={false}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'select'}
                  id={'state'}
                  placeholder={'State'}
                  label={'State'}
                  options={[
                    {
                      label: 'Bengaluru',
                      value: 'Bengaluru',
                    },
                    { label: 'Gujarat', value: 'Gujarat' },
                  ]}
                  iserror={errors}
                  isTouched={touched}
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

export default EditContactDetailsForm;

import React from 'react';
import { Formik, Form } from 'formik';
import FormInput from '../formInputs/FormInputs';
import { investorContactDetailsSchema } from '../schema/FormSchema';
import { Col, Row } from 'reactstrap';

const EditInvestorContactDetailsForm = ({ initialValues, onFormSubmit }) => {
  const handleSubmit = (values) => {
    const data = {
      'registeration.investorIntro.contactNumber': values.mobileNumber,
      'registeration.investorIntro.email': values.email,
      'registeration.investorIntro.landLine': values.landLineNumber,
      'registeration.investorIntro.fax': values.faxNumber,
      'registeration.investorIntro.address': values.address,
      'registeration.investorIntro.cityTown': values.city,
      'registeration.investorIntro.district': values.district,
      'registeration.investorIntro.pinCode': values.pincode,
      'registeration.investorIntro.state': values.state,
      'registeration.investorIntro.country': values.country,
    };
    onFormSubmit({ ...data });
  };
  return (
    <div className="profile-form-container">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={investorContactDetailsSchema}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <h4 className="modal-section-header">
              Investor/Company Contact Details
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
            <h4 className="modal-section-header">Investor/Company Address</h4>
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
                  type={'text'}
                  id={'district'}
                  placeholder={'District'}
                  label={'District'}
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
                  type={'text'}
                  id={'state'}
                  placeholder={'State'}
                  label={'State'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6}>
                <FormInput
                  type={'select'}
                  id={'country'}
                  placeholder={'Country'}
                  label={'Country'}
                  options={[
                    {
                      label: 'America',
                      value: 'America',
                    },
                    { label: 'India', value: 'India' },
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

export default EditInvestorContactDetailsForm;

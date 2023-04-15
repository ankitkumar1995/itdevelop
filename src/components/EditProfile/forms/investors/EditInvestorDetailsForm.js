import React from 'react';
import { Formik, Form } from 'formik';
import FormInput from '../formInputs/FormInputs';
import { investorDetailsSchema } from '../schema/FormSchema';
import { Col, Row } from 'reactstrap';

const EditInvestorDetailsForm = ({ initialValues, onFormSubmit }) => {
  const handleSubmit = (values) => {
    const data = {
      'registeration.investorIntro.investorType': values.type,
      'registeration.investmentDetails.preferredInvestmentStage':
        values.stageToInvest,
      'registeration.investmentDetails.totalAmoutFunded': values.totalFunded,
      'registeration.investmentDetails.investmentRange': values.range,
      'registeration.investmentDetails.totalOrgFunded': values.startupsFunded,
      'registeration.investmentDetails.presentPortfolio': values.portfolio,
      'registeration.investmentDetails.preferredLocation': values.location,
    };
    onFormSubmit({ ...data });
  };
  return (
    <div className="profile-form-container">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={investorDetailsSchema}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Row>
              <Col sm={12} md={12}>
                <FormInput
                  type={'text'}
                  id={'type'}
                  placeholder={'investor type'}
                  label={'investor type'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'location'}
                  placeholder={'preferred location for investment'}
                  label={'preferred location for investment'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'stageToInvest'}
                  placeholder={'At what stage do you prefer to invest?'}
                  label={'At what stage do you prefer to invest?'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'range'}
                  placeholder={'investment range'}
                  label={'investment range'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'totalFunded'}
                  placeholder={'Total amount funded'}
                  label={'Total amount funded'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'startupsFunded'}
                  placeholder={'total number of organisations funded'}
                  label={'total number of organisations funded'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'portfolio'}
                  placeholder={'Portfolio (in USD)'}
                  label={'Portfolio (in USD)'}
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

export default EditInvestorDetailsForm;

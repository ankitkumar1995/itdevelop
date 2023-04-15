import React from 'react';
import { Formik, Form } from 'formik';
import FormInput from '../formInputs/FormInputs';
import { companyDetailsSchema } from '../schema/FormSchema';
import { Col, Row } from 'reactstrap';
import { industryData } from '../../helper/constants';

const EditCompanyDetailsForm = ({ initialValues, onFormSubmit }) => {
  const handleSubmit = (values) => {
    const data = {
      'registeration.industryInfo.industrySectorType': values.industry,
      'registeration.companyFounderDetail.district': values.district,
      'registeration.companyInfo.dateOfIncorporationEstablishment':
        values.commencementDate,
      'registeration.employeeInfo.permanantWorkers': values.employeeSize,
      'registeration.fundingInfo.currentlyFunded': values.currentlyFunded,
      'registeration.fundingInfo.bootstrapedFunded': values.currentlyBootstrap,
      'registeration.fundingInfo.fundingHelpRequirement': values.seekingFunding,
    };
    onFormSubmit({ ...data });
  };
  return (
    <div className="profile-form-container">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={companyDetailsSchema}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Row>
              <Col sm={12} md={6}>
                <FormInput
                  type={'select'}
                  id={'industry'}
                  placeholder={'Industry/Sector'}
                  label={'Industry/Sector'}
                  options={industryData.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'chip'}
                  id={'currentlyFunded'}
                  placeholder={'Are you currently funded?'}
                  label={'Are you currently funded?'}
                  chipData={[
                    { label: 'Yes', value: true },
                    { label: 'No', value: false },
                  ]}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
            </Row>
            <Row>
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
              <Col sm={12} md={6}>
                <FormInput
                  type={'chip'}
                  id={'currentlyBootstrap'}
                  placeholder={'Are you currently bootstrapped?'}
                  label={'Are you currently bootstrapped?'}
                  chipData={[
                    { label: 'Yes', value: true },
                    { label: 'No', value: false },
                  ]}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6}>
                <FormInput
                  type={'date'}
                  id={'commencementDate'}
                  placeholder={'commencement of commercial operations'}
                  label={'commencement of commercial operations'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'chip'}
                  id={'seekingFunding'}
                  placeholder={'Are you seeking funding?'}
                  label={'Are you seeking funding?'}
                  chipData={[
                    { label: 'Yes', value: true },
                    { label: 'No', value: false },
                  ]}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'employeeSize'}
                  placeholder={'Employee size'}
                  label={'Employee size'}
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

export default EditCompanyDetailsForm;

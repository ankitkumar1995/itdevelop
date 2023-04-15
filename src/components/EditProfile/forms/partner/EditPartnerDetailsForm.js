import React from 'react';
import { Formik, Form } from 'formik';
import FormInput from '../formInputs/FormInputs';
import { partnerDetailsSchema } from '../schema/FormSchema';
import { Col, Row } from 'reactstrap';

const EditPartnerDetailsForm = ({ initialValues, onFormSubmit }) => {
  const handleSubmit = (values) => {
    const data = {
      'registration.partnerContactInfo.spocNumber': values.linkedInUrl,
      'registration.partnerContactInfo.spocEmail': values.websiteUrl,
      'registration.partnerContactInfo.registeredPartnerAddress':
        values.address,
      'registration.partnerContactInfo.cityTown': values.city,
      'registration.partnerContactInfo.district': values.district,
      'registration.partnerContactInfo.pinCode': values.pincode,
      'registration.partnerContactInfo.state': values.state,
      'registration.partnerContactInfo.country': values.country,
      'registration.partnerInfo.partneringType': values.partneringType,
      'registration.partnerContactInfo.spocName': values.contactPersonName,
      'registration.partnerContactInfo.contactPersoneDesignation':
        values.contactPersonDesignation,
    };
    onFormSubmit({ ...data });
  };
  return (
    <div className="profile-form-container">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={partnerDetailsSchema}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Row>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'partneringType'}
                  placeholder={'partnering type'}
                  label={'partnering type'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'partneringSubType'}
                  placeholder={'partnering sub type'}
                  label={'partnering sub type'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'contactPersonName'}
                  placeholder={'contact person name'}
                  label={'contact person name'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'contactPersonDesignation'}
                  placeholder={'contact person designation'}
                  label={'contact person designation'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
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

export default EditPartnerDetailsForm;

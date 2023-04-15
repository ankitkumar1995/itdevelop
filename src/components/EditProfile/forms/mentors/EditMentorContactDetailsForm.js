import React from 'react';
import { Formik, Form } from 'formik';
import FormInput from '../formInputs/FormInputs';
import { mentorContactDetailsSchema } from '../schema/FormSchema';
import { Col, Row } from 'reactstrap';

const EditMentorContactDetailsForm = ({ initialValues, onFormSubmit }) => {
  const handleSubmit = (values) => {
    const data = {
      'registeration.intro.number': values.mobileNumber,
      'registeration.intro.email': values.email,
      'registeration.intro.address': values.address,
      'registeration.intro.city': values.city,
      'registeration.intro.district': values.district,
      'registeration.intro.pinCode': values.pincode,
      'registeration.intro.state': values.state,
      'registeration.intro.country': values.country,
      'registeration.intro.landLineNumber': values.landLineNumber,
      'registeration.intro.faxNumber': values.faxNumber,
    };
    onFormSubmit({ ...data });
  };
  return (
    <div className="profile-form-container">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={mentorContactDetailsSchema}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
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
            <Row>
              <Col sm={12} md={12}>
                <FormInput
                  type={'textarea'}
                  id={'address'}
                  placeholder={'Enter address'}
                  label={'Your address'}
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

export default EditMentorContactDetailsForm;

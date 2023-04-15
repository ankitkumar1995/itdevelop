import React from 'react';
import { Formik, Form } from 'formik';
import FormInput from '../formInputs/FormInputs';
import { mentorAvailabilitySchema } from '../schema/FormSchema';
import { Col, Row } from 'reactstrap';

const EditAvailabilityForm = ({ initialValues, onFormSubmit }) => {
  const handleSubmit = (values) => {
    const data = {
      'registeration.availability.daysInWeek': values.selectDays,
      'registeration.availability.timeRange': values.timeRange,
      'registeration.availability.preferredWorkMode': values.preferredWorkMode,
      'registeration.availability.preferedMentorStage':
        values.stageWantToBeMentor,
      'registeration.availability.feeStructure': values.feePerMonth,
      'registeration.availability.preferedContactMode': values.modeOfContact,
      'registeration.availability.preferMentorDuration': values.mentorDuration,
    };
    onFormSubmit({ ...data });
  };
  return (
    <div className="profile-form-container">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={mentorAvailabilitySchema}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Row>
              <Col sm={12} md={12}>
                <FormInput
                  type={'multiChip'}
                  id={'selectDays'}
                  placeholder={'Select days'}
                  label={'Select days'}
                  chipData={[
                    'Sunday',
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                  ]}
                  iserror={errors}
                  isTouched={touched}
                  chipBtnClass={'mb-2'}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'timeRange'}
                  placeholder={'select time range'}
                  label={'select time range'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'preferredWorkMode'}
                  placeholder={'Preferred work mode'}
                  label={'Preferred work mode'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'stageWantToBeMentor'}
                  placeholder={'At what stage do you prefer to mentor?'}
                  label={'At what stage do you prefer to mentor?'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'mentorDuration'}
                  placeholder={'Preferred mentor duration'}
                  label={'Preferred mentor duration'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'feePerMonth'}
                  placeholder={'Your fee per month (in USD)'}
                  label={'Your fee per month (in USD)'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'modeOfContact'}
                  placeholder={'Preferred mode of contact'}
                  label={'Preferred mode of contact'}
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

export default EditAvailabilityForm;

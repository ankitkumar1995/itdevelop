import React from 'react';
import { Formik, Form } from 'formik';
import FormInput from '../formInputs/FormInputs';
import { incubatorDetailsSchema } from '../schema/FormSchema';
import { Col, Row } from 'reactstrap';

const EditIncubatorDetailsForm = ({ initialValues, onFormSubmit }) => {
  const handleSubmit = (values) => {
    const data = {
      'registeration.amenitiesOrEvents.totalSeats': values.totalSeats,
      'registeration.amenitiesOrEvents.totalPhysicalIncubationSeats':
        values.allotedSeatsForPhysical,
      'registeration.amenitiesOrEvents.totalVirtualIncubationSeats':
        values.allotedSeatsForVirtual,
      'registeration.amenitiesOrEvents.totalOccupiedSeats':
        values.occupiedSeats,
      'registeration.amenitiesOrEvents.totalAvailableSeats':
        values.availableSeats,
      'registeration.amenitiesOrEvents.totalMeetingRooms': values.meetingRooms,
      'registeration.amenitiesOrEvents.totalConferenceRooms':
        values.conferenceRooms,
      features: values?.features,
    };
    onFormSubmit({ ...data });
  };
  return (
    <div className="profile-form-container">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={incubatorDetailsSchema}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Row>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'totalSeats'}
                  placeholder={'Total No. of seats in incubator'}
                  label={'Total No. of seats in incubator'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'allotedSeats'}
                  placeholder={'seats alloted for incubator staff'}
                  label={'seats alloted for incubator staff'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'allotedSeatsForPhysical'}
                  placeholder={'Seats alloted for physical incubation'}
                  label={'Seats alloted for physical incubation'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'allotedSeatsForVirtual'}
                  placeholder={'Seats alloted for virtual incubation'}
                  label={'Seats alloted for virtual incubation'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'occupiedSeats'}
                  placeholder={'No. of occupied seats'}
                  label={'No. of occupied seats'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'availableSeats'}
                  placeholder={'No. of availabile seats'}
                  label={'No. of availabile seats'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'meetingRooms'}
                  placeholder={'No. of meeting room(s)'}
                  label={'No. of meeting room(s)'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'conferenceRooms'}
                  placeholder={'No. of conference room(s)'}
                  label={'No. of conference room(s)'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={12}>
                <FormInput
                  type={'multiChipWithUserType'}
                  id={'features'}
                  placeholder={'features'}
                  label={'features'}
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

export default EditIncubatorDetailsForm;

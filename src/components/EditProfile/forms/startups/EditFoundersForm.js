import React from 'react';
import { Formik, Form, FieldArray } from 'formik';
import FormInput from '../formInputs/FormInputs';
import { foundersAdvisorySchema } from '../schema/FormSchema';
import { Col, Row } from 'reactstrap';
import { Plus } from 'react-feather';

const EditFoundersForm = ({ initialValues, onFormSubmit }) => {
  const fieldName = 'founders';
  const handleSubmit = (values) => {
    const data = {
      'registeration.companyFounderDetail.founderDetails': values[fieldName],
    };
    onFormSubmit({ ...data });
  };
  return (
    <div className="profile-form-container">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={foundersAdvisorySchema}
      >
        {({ errors, touched, values, isSubmitting }) => (
          <Form>
            <Row>
              <Col sm={12} md={12}>
                <FieldArray
                  name={fieldName}
                  render={(arrayHelpers) => (
                    <>
                      {values[fieldName].map((item, index) => (
                        <>
                          <h2 className="modal-section-header">
                            Person {index + 1}
                          </h2>
                          <Row>
                            <Col sm={12} md={6}>
                              <FormInput
                                key={`${fieldName}_${index}`}
                                type={'text'}
                                id={`${fieldName}[${index}].fullName`}
                                iserror={errors}
                                isTouched={touched}
                                label={'Full name'}
                                errorMessage={`${
                                  errors?.[fieldName]?.[index]?.fullName &&
                                  touched?.[fieldName]?.[index]?.fullName
                                    ? errors?.[fieldName]?.[index]?.fullName ||
                                      ''
                                    : ''
                                }`}
                              />
                            </Col>
                            <Col sm={12} md={6}>
                              <FormInput
                                key={`${fieldName}_${index}`}
                                type={'text'}
                                id={`${fieldName}[${index}].designation`}
                                iserror={errors}
                                isTouched={touched}
                                label={'Designation'}
                                errorMessage={`${
                                  errors?.[fieldName]?.[index]?.designation &&
                                  touched?.[fieldName]?.[index]?.designation
                                    ? errors?.[fieldName]?.[index]
                                        ?.designation || ''
                                    : ''
                                }`}
                              />
                            </Col>
                            <Col sm={12} md={6}>
                              <FormInput
                                key={`${fieldName}_${index}`}
                                type={'text'}
                                id={`${fieldName}[${index}].linkedInUrl`}
                                iserror={errors}
                                isTouched={touched}
                                label={'Linkedin profile url'}
                                errorMessage={`${
                                  errors?.[fieldName]?.[index]?.linkedInUrl &&
                                  touched?.[fieldName]?.[index]?.linkedInUrl
                                    ? errors?.[fieldName]?.[index]
                                        ?.linkedInUrl || ''
                                    : ''
                                }`}
                              />
                            </Col>
                            <Col sm={12} md={6}>
                              <FormInput
                                key={`${fieldName}_${index}`}
                                type={'text'}
                                id={`${fieldName}[${index}].twitterUrl`}
                                iserror={errors}
                                isTouched={touched}
                                label={'Twitter link'}
                                errorMessage={`${
                                  errors?.[fieldName]?.[index]?.twitterUrl &&
                                  touched?.[fieldName]?.[index]?.twitterUrl
                                    ? errors?.[fieldName]?.[index]
                                        ?.twitterUrl || ''
                                    : ''
                                }`}
                              />
                            </Col>
                            <Col sm={12} md={12}>
                              <FormInput
                                type={'file'}
                                id={`${fieldName}[${index}].profilePic`}
                                placeholder={'upload company logo *'}
                                label={'upload company logo *'}
                                acceptedFiles={['.png', '.jpg', '.jpeg']}
                                acceptedFilesExtensionsText={
                                  '600 x 600 px JPG or PNG, smaller than 1 MB'
                                }
                                filesLimit={1}
                                maxFileSize={3000000}
                                iserror={errors}
                                isTouched={touched}
                                showPreviewsInDropzone={false}
                                showAlerts={['error']}
                                errorMessage={`${
                                  errors?.[fieldName]?.[index]?.profilePic &&
                                  touched?.[fieldName]?.[index]?.profilePic
                                    ? errors?.[fieldName]?.[index]
                                        ?.profilePic || ''
                                    : ''
                                }`}
                              />
                            </Col>
                          </Row>
                        </>
                      ))}
                    </>
                  )}
                />
              </Col>
            </Row>
            {/* <div className="edit-profile-form-submit">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Updating...' : 'Save'}
              </button>
            </div> */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditFoundersForm;

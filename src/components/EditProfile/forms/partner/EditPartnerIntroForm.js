import React from 'react';
import { Formik, Form } from 'formik';
import FormInput from '../formInputs/FormInputs';
import { partnerIntroSchema } from '../schema/FormSchema';
import { Col, Row } from 'reactstrap';

const EditPartnerIntroForm = ({ initialValues, onFormSubmit }) => {
  const handleSubmit = (values) => {
    const data = {
      name: values.fullName,
      'registration.partnerInfo.tagLine': values.tagline,
      'registration.partnerInfo.companyYoutubeUrl': values.introductionUrl,
      'registration.partnerInfo.comapnyLinkedInUrl': values.linkedInUrl,
      'registration.partnerInfo.companyWebsite': values.websiteUrl,
      'registration.partnerInfo.comapnyTwitterUrl': values.twitterUrl,
      'registration.partnerInfo.companyFacebookUrl': values.facebookUrl,
      'registration.partnerInfo.comapnyLogo': values.profilePic,
    };
    onFormSubmit({ ...data });
  };
  return (
    <div className="profile-form-container">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={partnerIntroSchema}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Row>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'fullName'}
                  placeholder={'Full Name'}
                  label={'Full Name'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'tagline'}
                  placeholder={'Tagline'}
                  label={'Tagline'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={12}>
                <FormInput
                  type={'text'}
                  id={'introductionUrl'}
                  placeholder={'60 seconds introduction (youtube url)'}
                  label={'60 seconds introduction (youtube url)'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'linkedInUrl'}
                  placeholder={'linkedin url'}
                  label={'linkedin url'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'websiteUrl'}
                  placeholder={'Website Url'}
                  label={'Website Url'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'twitterUrl'}
                  placeholder={'twitter url'}
                  label={'twitter url'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'facebookUrl'}
                  placeholder={'Facebook Url'}
                  label={'Facebook Url'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={12}>
                <FormInput
                  type={'file'}
                  id={'profilePic'}
                  placeholder={'upload a profile picture'}
                  label={'upload a profile picture'}
                  acceptedFiles={['.png', '.jpg', '.jpeg']}
                  acceptedFilesExtensionsText={
                    'PNG or JPG or JPEG, smaller than 3 MB'
                  }
                  filesLimit={1}
                  maxFileSize={3000000}
                  iserror={errors}
                  isTouched={touched}
                  showPreviewsInDropzone={false}
                  showAlerts={['error']}
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

export default EditPartnerIntroForm;

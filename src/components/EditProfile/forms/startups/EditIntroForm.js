import React from 'react';
import { Formik, Form } from 'formik';
import FormInput from '../formInputs/FormInputs';
import { introSchema } from '../schema/FormSchema';
import { Col, Row } from 'reactstrap';

const EditIntroForm = ({ initialValues, onFormSubmit }) => {
  const handleSubmit = (values) => {
    const data = {
      'registeration.nameAndIntro.incorporatedCompanyName': values.companyName,
      'registeration.nameAndIntro.companyTagLine': values.companyTagLine,
      'registeration.nameAndIntro.youtubeUrl': values.elevatePitch,
      'registeration.nameAndIntro.linkedInUrl': values.linkedInUrl,
      'registeration.nameAndIntro.companyWebsiteUrl': values.websiteUrl,
      'registeration.nameAndIntro.twitterUrl': values.twitterUrl,
      'registeration.nameAndIntro.facebookUrl': values.facebookUrl,
      'registeration.fundingInfo.kitsChalleneWinning':
        values.wonKitsChallengeBefore,
      'registeration.fundingInfo.kitsChallegeName': values.kitsChallenge,
      'registeration.nameAndIntro.companyLogo': values.companyLogo,
    };
    onFormSubmit({ ...data });
  };
  return (
    <div className="profile-form-container">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={introSchema}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Row>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'companyName'}
                  placeholder={'Comapny Name'}
                  label={'Company Name'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'companyTagLine'}
                  placeholder={'Comapny Tag Line'}
                  label={'Company Tag Line'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={12}>
                <FormInput
                  type={'text'}
                  id={'elevatePitch'}
                  placeholder={'60 seconds elevator pitch (youtube url)'}
                  label={'60 seconds elevator pitch (youtube url)'}
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
                  placeholder={'company linkedin url'}
                  label={'company linkedin url'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'websiteUrl'}
                  placeholder={'Comapny Website Url'}
                  label={'Company Website Url'}
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
                  placeholder={'company twitter url'}
                  label={'company twitter url'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'facebookUrl'}
                  placeholder={'Comapny Facebook Url'}
                  label={'Company Facebook Url'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6}>
                <FormInput
                  type={'chip'}
                  id={'wonKitsChallengeBefore'}
                  placeholder={'have you won any kits challenge before?'}
                  label={'have you won any kits challenge before?'}
                  chipData={[
                    { label: 'Yes', value: true },
                    { label: 'No', value: false },
                  ]}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'select'}
                  id={'kitsChallenge'}
                  placeholder={'select the kits challenge you had won'}
                  label={'select the kits challenge you had won'}
                  options={[
                    { label: 'Elevate 100', value: 'Elevate 100' },
                    { label: 'Elevate 200', value: 'Elevate 200' },
                  ]}
                  iserror={errors}
                  isTouched={touched}
                  conditionalRender={true}
                  condition={{
                    baseFieldId: 'wonKitsChallengeBefore',
                    valueShouldBe: true,
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={12}>
                <FormInput
                  type={'file'}
                  id={'companyLogo'}
                  placeholder={'upload company logo *'}
                  label={'upload company logo *'}
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

export default EditIntroForm;

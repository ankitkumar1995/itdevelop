import React from 'react';
import { Formik, Form } from 'formik';
import FormInput from '../formInputs/FormInputs';
import { incubatorGallerySchema } from '../schema/FormSchema';
import { Col, Row } from 'reactstrap';

const EditGalleryForm = ({ initialValues, onFormSubmit }) => {
  const handleSubmit = (values) => {
    const data = {
      'registeration.intro.photos': values.photos,
    };
    onFormSubmit({ ...data });
  };
  return (
    <div className="profile-form-container">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={incubatorGallerySchema}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Row>
              <Col sm={12} md={12}>
                <FormInput
                  type={'file'}
                  id={'photos'}
                  placeholder={'upload your incubator photo(s)'}
                  label={'upload your incubator photo(s)'}
                  acceptedFiles={['.png', '.jpg', '.jpeg']}
                  acceptedFilesExtensionsText={
                    'PNG or JPG or JPEG, smaller than 3 MB'
                  }
                  filesLimit={10}
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

export default EditGalleryForm;

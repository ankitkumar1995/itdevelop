import React from 'react';
import { Formik, Form } from 'formik';
import FormInput from '../formInputs/FormInputs';
import { mentorIndustryPreferenceSchema } from '../schema/FormSchema';
import { Col, Row } from 'reactstrap';
import { industryData, TechData } from '../../helper/constants';

const EditIndustryPreferenceForm = ({ initialValues, onFormSubmit }) => {
  const handleSubmit = (values) => {
    const data = {
      'registeration.experience.overallExperience': values.overallExperience,
      'registeration.experience.industry': values.preferredIndustries,
      'registeration.experience.specialization': values.preferredTechnology,
    };
    onFormSubmit({ ...data });
  };
  return (
    <div className="profile-form-container">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={mentorIndustryPreferenceSchema}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Row>
              <Col sm={12} md={12}>
                <FormInput
                  type={'textarea'}
                  id={'overallExperience'}
                  placeholder={
                    'Brief describe your overall industry experience'
                  }
                  label={'Brief describe your overall industry experience'}
                  iserror={errors}
                  isTouched={touched}
                  wordLimit={251}
                  unlimitedWords={false}
                />
              </Col>
              <Col sm={12} md={12}>
                <FormInput
                  type={'multiSelect'}
                  id={'preferredIndustries'}
                  placeholder={'preferred industries/sectors for mentoring *'}
                  label={'preferred industries/sectors for mentoring *'}
                  options={industryData.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={12}>
                <FormInput
                  type={'multiSelect'}
                  id={'preferredTechnology'}
                  placeholder={'preferred technologies for mentoring *'}
                  label={'preferred technologies for mentoring *'}
                  options={TechData.map((item) => ({
                    label: item,
                    value: item,
                  }))}
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

export default EditIndustryPreferenceForm;

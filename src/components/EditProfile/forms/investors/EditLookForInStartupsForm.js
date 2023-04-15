import React from 'react';
import { Formik, Form } from 'formik';
import FormInput from '../formInputs/FormInputs';
import { investorLookForInStartupsSchema } from '../schema/FormSchema';
import { Col, Row } from 'reactstrap';
import { industryData, TechData } from '../../helper/constants';

const EditLookForInStartupsForm = ({ initialValues, onFormSubmit }) => {
  const handleSubmit = (values) => {
    const data = {
      'registeration.investmentDetails.preferredIndustrySector':
        values.preferredIndustries,
      'registeration.investmentDetails.preferredTechnology':
        values.preferredTechnology,
      'registeration.investmentDetails.startupCriteria': values.startup,
    };
    onFormSubmit({ ...data });
  };
  return (
    <div className="profile-form-container">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={investorLookForInStartupsSchema}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Row>
              <Col sm={12} md={12}>
                <FormInput
                  type={'textarea'}
                  id={'startup'}
                  placeholder={'Brief describe what you look for in startups'}
                  label={'Brief describe what you look for in startups'}
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
                  placeholder={'preferred industries/sectors for investment *'}
                  label={'preferred industries/sectors for investment *'}
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
                  placeholder={'preferred technologies for investment *'}
                  label={'preferred technologies for investment *'}
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

export default EditLookForInStartupsForm;

import React from 'react';
import { Formik, Form } from 'formik';
import FormInput from '../formInputs/FormInputs';
import { mentorExperienceSchema } from '../schema/FormSchema';
import { Col, Row } from 'reactstrap';
import { industryData, TechData } from '../../helper/constants';

const EditExperienceForm = ({ initialValues, onFormSubmit }) => {
  const handleSubmit = (values) => {
    const data = {
      'registeration.experience.qualification': values.qualification,
      'registeration.experience.currentAssociatedCompany':
        values.currentAssociatedCompany,
      'registeration.experience.mentorBefore': values.haveMentorBefore,
      'registeration.experience.totalWorkExp': values.totalWorkExperience,
      'registeration.experience.industry': values.industries,
      'registeration.experience.specialization': values.specializations,
      'registeration.experience.vertical': values.vertical,
      'registeration.experience.skills': values.skills,
      'registeration.experience.companiesMentor':
        values.karnatakaStartupsMentoring,
    };
    onFormSubmit({ ...data });
  };
  return (
    <div className="profile-form-container">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={mentorExperienceSchema}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Row>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'qualification'}
                  placeholder={'Qualification'}
                  label={'Qualification'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'currentAssociatedCompany'}
                  placeholder={'Current Associated company'}
                  label={'Current Associated company'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'chip'}
                  id={'haveMentorBefore'}
                  placeholder={'have you been a mentor before?'}
                  label={'have you been a mentor before?'}
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
                  type={'text'}
                  id={'totalWorkExperience'}
                  placeholder={'Total work experience'}
                  label={'Total work experience'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'totalCompaniesMentored'}
                  placeholder={'Total companies mentored till date'}
                  label={'Total companies mentored till date'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={6}>
                <FormInput
                  type={'text'}
                  id={'companyCurrentlyMentoring'}
                  placeholder={
                    'companies currently mentoring (leave blank if none)'
                  }
                  label={'companies currently mentoring (leave blank if none)'}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={12}>
                <FormInput
                  type={'multiSelect'}
                  id={'industries'}
                  placeholder={'Your current industries/sectors'}
                  label={'Your current industries/sectors'}
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
                  type={'multiChipWithUserType'}
                  id={'specializations'}
                  placeholder={'specializations'}
                  label={'specializations '}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={12}>
                <FormInput
                  type={'multiSelect'}
                  id={'vertical'}
                  placeholder={'vertical'}
                  label={'vertical '}
                  options={TechData.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={12}>
                <FormInput
                  type={'multiChipWithUserType'}
                  id={'skills'}
                  placeholder={'skills'}
                  label={'skills '}
                  iserror={errors}
                  isTouched={touched}
                />
              </Col>
              <Col sm={12} md={12}>
                <FormInput
                  type={'multiChipWithUserType'}
                  id={'karnatakaStartupsMentoring'}
                  placeholder={`list of Karnataka Startups i'm mentoring`}
                  label={`list of Karnataka Startups i'm mentoring`}
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

export default EditExperienceForm;

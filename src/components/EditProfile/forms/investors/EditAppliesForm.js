import React from 'react';
import { Formik, Form, FieldArray } from 'formik';
import FormInput from '../formInputs/FormInputs';
import { investorAppliesSchema } from '../schema/FormSchema';
import { Col, Row } from 'reactstrap';
import { Plus } from 'react-feather';

const EditAppliesForm = ({ initialValues, onFormSubmit }) => {
  const fieldName = 'applies';
  const handleSubmit = (values) => {
    const data = {
      howToApply: values[fieldName],
    };
    onFormSubmit({ ...data });
  };
  return (
    <div className="profile-form-container">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={investorAppliesSchema}
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
                        <FormInput
                          key={`${fieldName}_${index}`}
                          type={'text'}
                          id={`${fieldName}[${index}]`}
                          iserror={errors}
                          isTouched={touched}
                          label={`Apply No ${index + 1}`}
                          errorMessage={`${
                            errors?.[fieldName]?.[index] &&
                            touched?.[fieldName]?.[index]
                              ? errors?.[fieldName]?.[index] || ''
                              : ''
                          }`}
                          withRemoveBtn={values[fieldName]?.length > 1}
                          onRemoveClick={() => arrayHelpers.remove(index)}
                        />
                      ))}
                      <button
                        type="button"
                        onClick={() => arrayHelpers.push('')}
                        className="sk-form-add-button"
                      >
                        <span className="sk-form-add-button-icon">
                          <Plus size={20} />
                        </span>
                        Add more
                      </button>
                    </>
                  )}
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

export default EditAppliesForm;

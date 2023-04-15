import React from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useField, useFormikContext } from 'formik';
const DependentSelectFormik = ({ name, value }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const getRegions = (country) => {
    return new Promise((resolve, reject) => {
      switch (country) {
        case 'United States':
          resolve([
            { value: 'Washington', label: 'Washington' },
            { value: 'California', label: 'California' },
          ]);
          break;
        case 'Canada':
          resolve([
            { value: 'Alberta', label: 'Alberta' },
            { value: 'NovaScotia', label: 'Nova Scotia' },
          ]);
          break;
        default:
          resolve([]);
      }
    });
  };
  return (
    <div className="app">
      <label htmlFor="country">Country</label>
      <Field
        name={name}
        as="select"
        value={value}
        onChange={async (e) => {
          const { value } = e.target;
          setFieldValue(name, field.value);
        }}
      >
        <option value="None">Select country</option>
        <option value="United States">United States</option>
        <option value="Canada">Canada</option>
      </Field>
      <label htmlFor="region">Region</label>
      <Field
        value={values.region}
        id="region"
        name="region"
        as="select"
        onChange={handleChange}
      >
        <option value="None">Select region</option>
        {values.regions &&
          values.regions.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
      </Field>
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </div>
  );
};
export default DependentSelectFormik;

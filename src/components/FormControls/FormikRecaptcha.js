import React, { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useFormikContext, useField } from 'formik';

const SITE_KEY = '6LdZooobAAAAAEkoUUusHSPV-HnuLD5_QlN7siPX';

const FormikRecaptcha = (props) => {
  const {
    label,
    name,
    value,
    placeHolder,
    className,
    endAdornment,
    ...others
  } = props;
  const [field, meta] = useField(name);
  const ErrorText = meta.error && meta.touched ? meta.error : '';
  const { setFieldValue, setSubmitting } = useFormikContext();

  const ref = useRef();

  return (
    <ReCAPTCHA
      ref={ref}
      sitekey={SITE_KEY}
      onChange={async (value) => {
        await setFieldValue(name, value);
        setSubmitting(false);
      }}
    />
  );
};

export default FormikRecaptcha;

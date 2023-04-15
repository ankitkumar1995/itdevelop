import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const RecaptchaAdd = ({ setCaptchaVerify }) => {
  const handleChange = (value) => {
    if (value) {
      setCaptchaVerify(true);
    }
  };
  const handleExpire = () => {
    setCaptchaVerify(false);
  };
  return (
    <ReCAPTCHA
      sitekey="6LdRzAcfAAAAAIbZQl3MWfZfnXdB-zJZ1Rbi-5XP"
      onChange={handleChange}
      onExpired={handleExpire}
    />
  );
};
export default RecaptchaAdd;

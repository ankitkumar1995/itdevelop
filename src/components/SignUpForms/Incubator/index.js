import FormikStepper, { FormikStep } from '../../FormikStepper';
import IncubatorDetails from './IncubatorDetails';
import PersonalDetails from '../Startup/PersonalDetails';
import * as yup from 'yup';
import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../pages/api/url';
import CryptoJS from 'crypto-js';
const phoneRegExp = '[1-9]{1}[0-9]{9}';
const websiteRegex =
  /^((http|https):\/\/)?(www.|WWW.)?(?!.*(http|https|www.|WWW.))([a-zA-Z0-9_-]+)+(\.[a-zA-Z]+)+((\/)[\w#?-]{0,})*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;
const characterRegex = /^[a-zA-Z ]*$/;
const Incubator = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [show, setShow] = useState(false);
  const [errorData, setErrorData] = useState(null);
  const [checkValue, setCheckValue] = useState(false);
  const [captchaVerify, setCaptchaVerify] = useState(false);
  const getAgree = (value) => {
    setCheckValue(value);
  };
  return (
    <FormikStepper
      modalData={modalData}
      showModal={showModal}
      setShowModal={setShowModal}
      setErrorData={setErrorData}
      errorData={errorData}
      captchaVerify={captchaVerify}
      landingPageUrl={'/sign-up'}
      checkValue={checkValue}
      initialValues={{
        incubatorType: '',
        fullName: '',
        websiteUrl: '',
        name: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        status: 1,
        loginType: 'Incubator',
      }}
      validateOnChange
      onSubmit={async (values) => {
        const { confirmPassword, ...data } = values;
        const res = await axios
          .post(`${BASE_URL}/api/v1/auth/signup`, {
            ...data,
            password: CryptoJS.AES.encrypt(
              data.password,
              CryptoJS.enc.Utf8.parse('OYLDiFEJD3lwIjxw'),
              {
                iv: CryptoJS.enc.Utf8.parse('3dSRYdd9LpP1LUrjXcmJf67NEP'),
              }
            ).toString(),
            status: 1,
            loginType: 'Incubator',
          })
          .then(async (res, err) => {
            if (res) {
              await setShow(true);
              await setShowModal(true);
              await setModalData(res);
              return res;
            } else {
              await setModalData(res);
            }
          })
          .catch(async function (err) {
            await setErrorData(err.response.data);
          });
      }}
    >
      <FormikStep
        label="Incubator Details"
        validationSchema={yup.object({
          incubatorType: yup.string().required('Please select incubator type'),
          fullName: yup
            .string()
            .matches(
              /^[ A-Za-z0-9_@./#&$()+-]*$/,
              'Incubator name contain alphanumeric and special characters'
            )
            .required('Please enter incubator or org name'),
          websiteUrl: yup
            .string()
            .matches(websiteRegex, 'Please enter a valid url'),
        })}
      >
        <IncubatorDetails />
      </FormikStep>
      <FormikStep
        label="Personal Details"
        validationSchema={yup.object({
          name: yup
            .string()
            .matches(characterRegex, 'Full name contains only character')
            .min(2, 'Name atleast 2 characters')
            .max(100, 'Name not be more than 100 characters')
            .required('Please enter you full name'),
          phone: yup
            .string()
            .matches(phoneRegExp, 'Phone number is not valid')
            .length(10, 'Phone number must be exactly 10 digits')
            .required('Please Enter your Phone number'),
          email: yup
            .string()
            .email('Invalid email')
            .required('Please enter your email'),
          password: yup
            .string()
            .matches(
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
            )
            .required('Please Enter your password'),
          confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Re-type your paswword'),
        })}
      >
        <PersonalDetails
          requireCheckBox
          getAgree={getAgree}
          setCaptchaVerify={setCaptchaVerify}
        />
      </FormikStep>
    </FormikStepper>
  );
};

export default Incubator;

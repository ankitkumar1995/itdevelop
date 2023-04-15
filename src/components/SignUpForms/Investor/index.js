import FormikStepper, { FormikStep } from '../../FormikStepper';
import InvestorDetails from './InvestorDetails';
import PersonalDetails from '../Startup/PersonalDetails';
import * as yup from 'yup';
import axios from 'axios';
import { BASE_URL } from '../../../pages/api/url';
import { useState } from 'react';
import CryptoJS from 'crypto-js';
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const linkedinUrlRegex =
  /^((https?:\/\/)?((www|\w\w)\.)?linkedin\.com\/)((([\w]{2,3})?)|([^\/]+\/(([\w|\d-&#?=])+\/?){1,}))$/;
const websiteRegex =
  /^((http|https):\/\/)?(www.|WWW.)?(?!.*(http|https|www.|WWW.))([a-zA-Z0-9_-]+)+(\.[a-zA-Z]+)+((\/)[\w#?-]{0,})*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

const Investor = () => {
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
      landingPageUrl={'/sign-up'}
      captchaVerify={captchaVerify}
      checkValue={checkValue}
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        companyName: '',
        url: '',
        dateOfIncorporation: '',
        status: 1,
        linkedInProfile: '',
        investoryType: '',
        phone: '',
        loginType: 'Investor',
      }}
      validateOnChange
      onSubmit={async (values, helpers) => {
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
        label="Investor Details"
        validationSchema={yup.object({
          investoryType: yup.string().required('Please select investor type'),
          companyName: yup
            .string()
            .matches(
              /^[ A-Za-z0-9_@./#&$()+-]*$/,
              'Investor/org name contain alphanumeric and special characters'
            )
            .min(2, 'Name atleast 2 characters')
            .max(100, 'Name not be more than 100 characters')
            .required('Please enter you full name'),
          url: yup.string().matches(websiteRegex, 'Please enter a valid url'),
          linkedInProfile: yup
            .string()
            .matches(linkedinUrlRegex, 'Please enter valid linkedInUrl'),
          dateOfIncorporation: yup
            .string()
            .max(new Date(), 'Future date not allowed'),
        })}
      >
        <InvestorDetails />
      </FormikStep>
      <FormikStep
        label="Personal Details"
        validationSchema={yup.object({
          name: yup
            .string()
            .matches(/^[a-zA-Z ]*$/, 'Full name can contain only alphabets')
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

export default Investor;

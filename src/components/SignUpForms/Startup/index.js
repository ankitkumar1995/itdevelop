import FormikStepper, { FormikStep } from '../../FormikStepper';
import CompanyDetails from './CompanyDetails';
import PersonalDetails from './PersonalDetails';
import SelfCertification from './SelfCertification';
import * as yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { BASE_URL } from '../../../pages/api/url';
import CryptoJS from 'crypto-js';
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const websiteRegex =
  /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]{0,})*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;
const Startup = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [show, setShow] = useState(false);
  const [errorData, setErrorData] = useState(null);
  const [checkValue, setCheckValue] = useState(false);
  const [submitDisable, setSubmitDisable] = useState(false);
  const [captchaVerify, setCaptchaVerify] = useState(false);
  const getAgree = (value) => {
    setCheckValue(value);
  };
  return (
    <FormikStepper
      captchaVerify={captchaVerify}
      submitDisable={submitDisable}
      checkValue={checkValue}
      modalData={modalData}
      showModal={showModal}
      setShowModal={setShowModal}
      setErrorData={setErrorData}
      errorData={errorData}
      landingPageUrl={'/sign-up'}
      initialValues={{
        email: '',
        password: '',
        name: '',
        displayName: 'ak',
        companyName: '',
        incorporationNumber: '',
        status: 1,
        phone: '',
        confirmPassword: '',
        dateOfIncorporation: '',
        url: '',
        fullName: '',
        karnatakaRegistered: '',
        halfWrokforceKarnataka: '',
        revenueUnder100Cr: '',
        dormatAccount: 'yes',
        loginType: 'Startup',
      }}
      validateOnChange
      onSubmit={async (values) => {
        setSubmitDisable(true);
        const { confirmPassword, ...data } = values;
        const res = await axios
          .post(`${BASE_URL}/api/v1/auth/signup#St@rtup`, {
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
              setSubmitDisable(false);
              await setShow(true);
              await setShowModal(true);
              await setModalData(res);
              return res;
            } else {
              await setModalData(res);
            }
          })
          .catch(async function (err) {
            setSubmitDisable(false);
            await setErrorData(err.response.data);
          });
      }}
    >
      <FormikStep
        label="Company Details"
        validationSchema={yup.object({
          companyName: yup
            .string()
            .min(2, 'Enter atleast 2 character')
            .max(100, 'max 100 character are allowed')
            .required('Please enter your company name'),
          dateOfIncorporation: yup
            .date()
            .max(new Date(), 'Future date not allowed')
            .typeError('Please enter date of incorporation')
            .required('Please enter date of incorporation'),

          incorporationNumber: yup
            .string()
            .min(1, 'please enter atleast 1 character')
            .max(50, 'only 50 characters are allowed')
            .required('Please enter your registered incorporation number'),
          url: yup.string().matches(websiteRegex, 'Please enter a valid url'),
        })}
      >
        <CompanyDetails />
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
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
            )
            .required('Please Enter your password'),
          confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Re-type your paswword'),
        })}
      >
        <PersonalDetails />
      </FormikStep>
      <FormikStep
        label="Self Certification"
        validationSchema={yup.object({
          karnatakaRegistered: yup
            .string()
            .required("Please select 'yes' or 'no'"),
          halfWrokforceKarnataka: yup
            .string()
            .required("Please select 'yes' or 'no'"),
          revenueUnder100Cr: yup
            .string()
            .required("Please select 'yes' or 'no'"),
        })}
      >
        <SelfCertification
          getAgree={getAgree}
          setCaptchaVerify={setCaptchaVerify}
        />
      </FormikStep>
    </FormikStepper>
  );
};

export default Startup;

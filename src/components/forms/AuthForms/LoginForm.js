import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Typography,
} from '@material-ui/core';
import Input from '../../FormControls/input';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import CryptoJS from 'crypto-js';
import RecaptchaAdd from '../../RecaptchaAdd';
const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    padding: '19px',
    width: '100%',
    marginLeft: '0',
    color: 'white',
    background: 'linear-gradient(to right, #ef6e56 0%, #f52b06 100%)',
  },
  lineSeperater: {
    backgroundColor: '#f52e0a',
    height: '2px',
    width: '78%',
    margin: 'auto',
  },
}));
export const pageLoadingVal = { val: false };
const LoginForm = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isNotVerified, setIsNotVerified] = useState(false);
  const [captchaVerify, setCaptchaVerify] = useState(false);
  const [pageLoader, setPageLoader] = useState(pageLoadingVal.val);
  useEffect(() => {
    router.prefetch('/');
  }, []);
  const [passwordShown, setPasswordShown] = useState(true);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown == true ? false : true);
  };
  const difToast = () => {
    toast.success('Login Successful.!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };
  const custHandleChange = (custArg) => {
    custArg();
    setMessage('');
  };
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Invalid email')
            .required('Please enter your email'),
          password: Yup.string()
            .min(5, 'Enter minimum 5 characters Password')
            .max(20, 'Enter the password within 20 characters')
            .required('Please enter your password'),
        })}
        validateOnBlur
        onSubmit={async (values, helpers) => {
          setMessage('');
          setLoading(true);
          const result = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: CryptoJS.AES.encrypt(
              values.password,
              CryptoJS.enc.Utf8.parse('OYLDiFEJD3lwIjxw'),
              {
                iv: CryptoJS.enc.Utf8.parse('3dSRYdd9LpP1LUrjXcmJf67NEP'),
              }
            ).toString(),
          });
          if (!result.error) {
            pageLoadingVal.val = true;
            setLoading(false);
            setIsNotVerified(false);
            difToast();
            router.push(props.prevUrl ? `${props.prevUrl}` : '/');
            localStorage.setItem('msk-user', JSON.stringify(result));
            Cookies.set('token', result.data.data.Authorization);
          } else if (result.error.includes('400')) {
            pageLoadingVal.val = false;
            setLoading(false);
            router.push('/login');
            setIsNotVerified(false);
            setMessage('Invalid email id or password');
          } else if (result.error.includes('401')) {
            pageLoadingVal.val = false;
            setLoading(false);
            router.push('/login');
            setIsNotVerified(true);
            setMessage('Invalid email id or password');
          } else {
            pageLoadingVal.val = false;
            setLoading(false);
            router.push('/login');
            setIsNotVerified(false);
            setMessage('Invalid email id or password');
          }
        }}
      >
        {({ formik, values, handleChange }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Input
                  onCopy={(e) => e.preventDefault()}
                  onPaste={(e) => e.preventDefault()}
                  onCut={(e) => e.preventDefault()}
                  required
                  name="email"
                  label="Email"
                  placeholder="Enter Email"
                  onChange={(e) => {
                    handleChange(e);
                    setMessage('');
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  onCopy={(e) => e.preventDefault()}
                  onPaste={(e) => e.preventDefault()}
                  onCut={(e) => e.preventDefault()}
                  required
                  type={passwordShown ? 'password' : 'text'}
                  autoComplete={passwordShown ? 'password' : 'off'}
                  placeholder="Enter password"
                  id="password"
                  name="password"
                  label="Password"
                  InputProps={{
                    //autoComplete: passwordShown ? 'password' : 'off',
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisiblity}
                          edge="end"
                        >
                          {passwordShown ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <RecaptchaAdd setCaptchaVerify={setCaptchaVerify} />
              </Grid>

              <div className="fogt_pswd">
                <Link href="/forgot-password">
                  <a>Forgot Password ?</a>
                </Link>
              </div>

              <Typography component="h5" variant="h6" align="center">
                <div className="log_err_msg">
                  {message !== '' && message}
                  {isNotVerified && (
                    <Link href={'/email-activation'}>
                      <a style={{ textDecoration: 'underline' }}>
                        &nbsp;Resend Email Activation
                      </a>
                    </Link>
                  )}
                </div>
              </Typography>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  disabled={captchaVerify === false ? true : loading}
                  className={classes.button}
                >
                  Sign In
                </Button>

                <ToastContainer />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;

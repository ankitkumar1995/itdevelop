import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid } from '@material-ui/core';
import Input from '../../FormControls/input';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import { resetPassword } from '../../../pages/api/auth';
import SuccessModal from '../../SuccessModal';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import CryptoJS from 'crypto-js';
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

const ResetPasswordFrom = (props) => {
  const classes = useStyles();
  const { query } = useRouter();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(true);
  const [cpasswordShown, setCPasswordShown] = useState(true);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown == true ? false : true);
  };
  const ctogglePasswordVisiblity = () => {
    setCPasswordShown(cpasswordShown == true ? false : true);
  };
  return (
    <>
      <Formik
        initialValues={{
          password: '',
          confirmPassword: '',
        }}
        validationSchema={Yup.object({
          password: Yup.string()
            .matches(
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
            )
            .required('Please Enter your password'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Re-type your paswword'),
        })}
        validateOnBlur
        onSubmit={async (values, helpers) => {
          setLoading(true);
          const result = await resetPassword({
            email: query.email,
            token: query.token,
            password: CryptoJS.AES.encrypt(
              values.password,
              CryptoJS.enc.Utf8.parse('OYLDiFEJD3lwIjxw'),
              {
                iv: CryptoJS.enc.Utf8.parse('3dSRYdd9LpP1LUrjXcmJf67NEP'),
              }
            ).toString(),
          })
            .then(async (res, err) => {
              if (res) {
                await setLoading(false);
                await setShow(true);
              }
            })
            .catch(async (res, err) => {
              await setLoading(false);
            });
        }}
      >
        {({ formik, values }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Input
                  required
                  type={passwordShown ? 'password' : 'text'}
                  placeholder="Enter password"
                  id="password"
                  name="password"
                  label="Password"
                  InputProps={{
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
                <Input
                  required
                  type={cpasswordShown ? 'password' : 'text'}
                  id="confirmPassword"
                  placeholder="Re-type password"
                  name="confirmPassword"
                  label="Confirm Password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={ctogglePasswordVisiblity}
                          edge="end"
                        >
                          {cpasswordShown ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  className={classes.button}
                  disabled={loading}
                >
                  Submit
                </Button>
              </Grid>
              <SuccessModal
                successAll
                reset
                show={show}
                successMessage="Reset password successful.Please Login"
                onClose={() => setShow(false)}
              />
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ResetPasswordFrom;

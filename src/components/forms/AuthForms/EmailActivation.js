import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid } from '@material-ui/core';
import Input from '../../FormControls/input';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import { EmailActivate } from '../../../pages/api/auth';
import { SettingsPhoneTwoTone } from '@material-ui/icons';
import SuccessModal from '../../SuccessModal';
import Link from 'next/link';
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

const EmailActivateForm = () => {
  const [forgetErrorClass, setForgetErrorClass] = useState(
    'user_dont_exist_hide'
  );
  const [forgetError, setForgetError] = useState(false);
  const classes = useStyles();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);
  return (
    <>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Please enter a valid email ID')
            .required('Email is required'),
        })}
        validateOnBlur
        onSubmit={async (values, onSubmitProps) => {
          setLoading(true);
          const result = await EmailActivate({
            email: values.email,
          })
            .then(async (res, err) => {
              if (res) {
                await setLoading(false);

                await setShow(true);
              } else {
              }
            })
            .catch(async function (err) {
              await setLoading(false);
              await setForgetError(true);
              await setForgetErrorClass('user_dont_exist');
            });
          //onSubmitProps.setSubmitting(false);
          onSubmitProps.resetForm();
        }}
      >
        {({ formik, values }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Input
                  required
                  name="email"
                  label="Email"
                  placeholder="Enter Email"
                  onClick={() => setForgetErrorClass('user_dont_exist_hide')}
                />
              </Grid>
              {/* {forgetError && (
                <div className={forgetErrorClass}>
                  User or email not found. Please enter registered Mail ID
                </div>
              )} */}
              <div style={{ marginLeft: '5px' }}>
                Email Activation link send?
                <Link href="/login">
                  <a
                    style={{
                      color: ' #f52b06',
                      textDecoration: 'underline',
                      marginLeft: '3px',
                    }}
                  >
                    Login Here
                  </a>
                </Link>
              </div>
              <Grid item xs={12}>
                <Button
                  disabled={loading}
                  type="submit"
                  className={classes.button}
                >
                  Submit
                </Button>
                <SuccessModal
                  successAll
                  show={show}
                  successMessage={'Email activation link is sent.'}
                  onClose={() => {
                    setShow(false);
                  }}
                />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EmailActivateForm;

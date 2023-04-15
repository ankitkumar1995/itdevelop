import React from 'react';
import { useField } from 'formik';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  inputFieldBorder: {
    '& .MuiInputLabel-filled.MuiInputLabel-shrink': {
      fontFamily: 'Manrope',
      color: '#000 !important',
      fontSize: '15px',
      textTransform: 'uppercase',
      fontWeight: '550',
      letterSpacing: '0.5px',
      lineHeight: '17px',
      padding: '5px 10px',
    },
    '& .MuiFilledInput-inputMultiline': {
      padding: '50px 8px 0',
    },
    '& .MuiFilledInput-root': {
      background: '#F8F8FC',
      borderRadius: '10px',
      padding: '8px',
    },
    '& :before': {
      borderBottom: 'none',
    },
    '& :after': {
      borderBottom: 'none',
    },
    '& :hover:before': {
      borderBottom: 'none',
    },
  },
}));

const FormikTextArea = (props) => {
  const { label, name, placeHolder, required, className, ...others } = props;
  const [field, meta] = useField(name);
  const ErrorText = meta.error && meta.touched ? meta.error : '';
  const classes = useStyles();

  return (
    <TextField
      label={
        <div>
          {label}
          {required && (
            <span
              className="important_sym"
              style={{ color: '#f4433', marginTop: '5px' }}
            >
              &nbsp;*
            </span>
          )}
        </div>
      }
      autoComplete="off"
      helperText={ErrorText}
      error={!!ErrorText}
      variant="filled"
      name={name}
      multiline
      rowsMax={10}
      fullWidth
      className={`${className} ${classes.inputFieldBorder}`}
      InputLabelProps={{ shrink: true }}
      {...field}
      {...others}
    />
  );
};

export default FormikTextArea;

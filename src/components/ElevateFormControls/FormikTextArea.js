import React from 'react';
import { useFormikContext, useField } from 'formik';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  inputFieldBorder: {
    '& .MuiFormHelperText-root.Mui-error': {
      position: 'relative',
      top: '20px',
    },
    '& .MuiInputLabel-filled.MuiInputLabel-shrink': {
      //
      marginBottom: '30px',
      color: '#1D293F !important',
      fontFamily: 'Manrope',
      fontSize: '15px',
      textTransform: 'uppercase !important',
      fontWeight: '600',
      letterSpacing: '0.5px',
      lineHeight: '17px',
      padding: '30px 8px',
      width: '129%',
    },
    '& .MuiFilledInput-inputMultiline': {
      padding: '10px',
      marginTop: '65px',
      display: 'flex',
      flexFlow: 'column-reverse wrap',
      color: '#1D293F !important',
      fontWeight: '600',
    },
    '& .MuiFilledInput-root': {
      background: '#F8F8FC !important',
      position: 'relative',
      top: '20px',
      borderRadius: '10px',
      padding: '8px',
      fontWeight: '600',
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
    '&.Mui-focused': { color: '#9896ae !important' },
  },
}));

const FormikTextArea = (props) => {
  const { label, name, labelKN, placeHolder, required, className, ...others } =
    props;
  const [field, meta] = useField(name);
  const ErrorText = meta.error && meta.touched ? meta.error : '';
  const classes = useStyles();
  const { setFieldValue, values } = useFormikContext();
  return (
    <TextField
      label={
        <div style={{ marginLeft: '6px', lineHeight: '17px' }}>
          {label}
          {required && (
            <span
              className="important_sym"
              style={{ color: '#f4433', marginTop: '5px' }}
            >
              &nbsp;*
            </span>
          )}
          <br />
          {labelKN}
        </div>
      }
      autoComplete="off"
      helperText={ErrorText}
      error={!!ErrorText}
      variant="filled"
      name={name}
      value={field.value}
      multiline
      rowsMax={10}
      fullWidth
      className={className}
      // className={`{"text__area"} ${className} ${classes.inputFieldBorder} ${props.textAreaClassFor}`}
      InputLabelProps={{ shrink: true }}
      {...field}
      onChange={(event) => {
        if (props.name === 'companyDescription.nameOfMentors') {
          setFieldValue(name, event.target.value.split(/[;,]+/));
        } else {
          setFieldValue(name, event.target.value);
        }
        props.handler;
      }}
      {...others}
    />
  );
};

export default FormikTextArea;

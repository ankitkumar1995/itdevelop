import React from 'react';
import { useFormikContext, useField } from 'formik';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Height } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  inputFieldBorder: {
    '& .MuiInputLabel-filled.MuiInputLabel-shrink': {
      padding: '5px 0',
      marginLeft: '8px',
      fontSize: '12px',
      textTransform: 'uppercase',
      width: '103%',
      lineHeight: '1.2',
      [theme.breakpoints.down(1024)]: {
        lineHeight: '20px',
      },
      [theme.breakpoints.down(450)]: {
        lineHeight: '23px',
        padding: '0px',
        fontSize: '14px !important',
        lineHeight: '18px',
      },
    },
    '& .MuiFilledInput-root': {
      background: '#F8F8FC',
      borderRadius: '10px',
      padding: '15px 8px 0',
      [theme.breakpoints.down(1024)]: {
        paddingTop: '23px',
        paddingLeft: '10px',
      },
      [theme.breakpoints.down(450)]: {
        paddingTop: '20px',
        fontSize: '12px',
      },
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

const Input = (props) => {
  const {
    label,
    name,
    value,
    placeHolder,
    className,
    maxLength,
    required,
    endAdornment,
    ...others
  } = props;
  const [field, meta] = useField(name);
  const ErrorText = meta.error && meta.touched ? meta.error : '';
  const classes = useStyles();

  return (
    <TextField
      label={
        <div>
          {label}
          {required && (
            <span className="important_sym" style={{ color: '#f4433' }}>
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
      inputProps={{ maxLength: maxLength }}
      endAdornment={endAdornment}
      fullWidth
      className={`${className} ${classes.inputFieldBorder}`}
      InputLabelProps={{ shrink: true, className: 'test-label' }}
      {...field}
      {...others}
    />
  );
};

export default Input;

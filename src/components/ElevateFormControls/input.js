import React, { useEffect } from 'react';
import { useFormikContext, useField, getIn } from 'formik';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Height } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  inputField: {
    fontWeight: '550',
    // color: '#444',
    letterSpacing: '0.5px',
    lineheight: '17px',
  },
  cssLabel: {
    '&.Mui-focused': {
      color: '#9896ae !important',
    },
  },
  inputFieldBorder: {
    '& .MuiInputLabel-filled.MuiInputLabel-shrink': {
      padding: '4px 6px',
      fontSize: '12px',
      textTransform: 'uppercase',
      lineHeight: '1.16',
      width: '120% !important',
      '&.foucsed': { color: '#9896ae' },
      [theme.breakpoints.down(1024)]: {
        lineHeight: '1.13',
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
      fontWeight: '540',
      padding: '29px 0px 4px 6px',
      [theme.breakpoints.down(1024)]: {
        padding: '40px 8px 8px 8px',
        paddingLeft: '10px',
      },
      [theme.breakpoints.down(450)]: {
        padding: '40px 0 8px 0',
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
    labelKN,
    value,
    placeHolder,
    className,
    maxLength,
    endAdornment,
    inputTypeClass,
    inputClassName,
    required,
    shouldUppercase,
    ...others
  } = props;
  const [field, meta] = useField(name);
  const ErrorText = meta.error && meta.touched ? meta.error : '';
  const classes = useStyles();

  const { setFieldValue, values } = useFormikContext();
  useEffect(() => {
    if (field.value === '' && props.checkStatus === 'grievance') {
      props?.setShow(false);
    }
  }, [props.checkStatus === 'grievance' && field.value]);
  return (
    <TextField
      label={
        <div className={classes.inputField}>
          {label}
          {required && (
            <span className="important_sym" style={{ color: '#f4433' }}>
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
      // onChange={(event) =>
      //   event.target.value < 0 ? (event.target.value = 0) : event.target.value
      // }
      endAdornment={endAdornment}
      fullWidth
      inputProps={{ maxLength: maxLength, className: inputClassName }}
      className={`${className} ${classes.inputFieldBorder} ${inputTypeClass}`}
      InputLabelProps={{
        shrink: true,
        className: 'test-label',
        classes: {
          root: classes.cssLabel,
          focused: classes.cssFocused,
        },
      }}
      onChange={(event) => {
        props?.setShow(false);

        setFieldValue(
          name,
          shouldUppercase
            ? event.target.value.toUpperCase()
            : event.target.value
        );

        props.handler(setFieldValue, values);
      }}
      {...field}
      value={shouldUppercase ? field.value.toUpperCase() : field.value}
      {...others}
    />
  );
};

export default Input;

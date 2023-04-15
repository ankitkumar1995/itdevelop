import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { FormLabel } from '@material-ui/core';
import { useFormikContext, useField } from 'formik';

const useStyles = makeStyles((theme) => ({
  tgBackground: {
    padding: '15px 30px',
    backgroundColor: '#f8f8fc',
    marginBottom: '21px',
  },
  tgLabel: {
    marginBottom: '20px',
    color: '#1D293F',
    fontFamily: 'Manrope',
    fontSize: '12px',
    textTransform: 'uppercase',
    fontWeight: '500',
    letterSpacing: '0.5px',
    lineHeight: '17px',
  },
  toggleButton: {
    marginRight: '30px',
    borderRadius: '25px !important',
    width: '85px',
    height: '30px',
    color: '#9896AE',
    fontFamily: 'Manrope',
    fontSize: '14px',
    fontWeight: '600',
    letterSpacing: '0.5px',
    lineHeight: '19px',
    textAlign: 'center',
    border: '1px solid #9896AE !important',
  },
  toggleButtonGroup: {
    '& .MuiToggleButton-root': {
      backgroundColor: 'white',
      padding: '10px 35px',
    },
    '& .MuiToggleButton-root:hover': {
      backgroundColor: '#1f3c88',
    },
    '& .Mui-selected': {
      backgroundColor: '#1f3c88',
      color: 'white',
    },
  },
}));

const CustomToggleButton = (props) => {
  const { label, name, placeHolder, required, className, ...others } = props;
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const ErrorText = meta.error && meta.touched ? meta.error : '';
  const classes = useStyles();

  // handler for ToggleButtonGroup
  const handleRoleChange = (event, value) => {
    if (value !== null) {
      setFieldValue(field.name, value);
    }
  };
  return (
    <>
      <div className={classes.tgBackground}>
        <FormLabel
          component="legend"
          className={classes.tgLabel}
          required={required}
        >
          {label}{' '}
          {/* {required && (
          <span className="important_sym" style={{ color: '#f4433' }}>
            &nbsp;*
          </span>
        )} */}
        </FormLabel>
        <ToggleButtonGroup
          value={field.value}
          exclusive
          helperText={ErrorText}
          error={!!ErrorText}
          onChange={handleRoleChange}
          className={classes.toggleButtonGroup}
          aria-label="text alignment"
        >
          <ToggleButton
            value={true}
            helperText={ErrorText}
            error={!!ErrorText}
            aria-label="left aligned"
            className={classes.toggleButton}
          >
            Yes
          </ToggleButton>
          {'  '}
          <ToggleButton
            value={false}
            helperText={ErrorText}
            error={!!ErrorText}
            aria-label="centered"
            className={classes.toggleButton}
          >
            No
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="toggle_err">
        <p class="toggle_butn_err_text">{name && ErrorText}</p>
      </div>
    </>
  );
};

export default CustomToggleButton;

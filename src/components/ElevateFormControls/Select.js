import Select from '@material-ui/core/Select';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import { Field, Formik, useField } from 'formik';
import { FormHelperText, Input } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { ErrorMessage } from 'formik';
import { FormControl } from '@material-ui/core';
import ElevateForm from '../ElevateForms/ApplicationInformation/Elevate2021Form';
import ElevateUnnatiForm from '../ElevateForms/ApplicationInformation/ElevateUnnatiForm';
import ElevateKalyanaForm from '../ElevateForms/ApplicationInformation/ElevateKalyanaForm';

import Amrit from '../AmritEventForm/Amrit';
import KalyanaAmritOBC from '../ElevateForms/ApplicationInformation/KalyanaAmritOBC';
const useStyles = makeStyles((theme) => ({
  placeholder: {
    color: '#aaa',
  },
  formControl: {
    minWidth: '100%',
    background: '#F8F8FC',
    borderRadius: '10px',
    padding: '18px 8px',
    marginTop: '0px',
    color: '#000',
    '& .MuiInput-underline:before': {
      border: 'none',
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  label: {
    padding: '13px 16px',
    '&.Mui-focused': {
      color: '#000 !important',
    },
    fontWeight: '550',
    textTransform: 'uppercase',
    lineHeight: '17px',
    letterSpacing: '0.5px',
  },
  select: {
    '& .MuiSelect-select.MuiSelect-select': {
      margin: '6px 6px 5px 8px',
      fontWeight: '540',
    },
  },
}));
const MaterialUISelect = ({
  initialValues,
  images,
  label,
  children,
  labelKN,
  name,
  errorString,
  value,
  onChange,
  onBlur,
  required,
  disabled,
}) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <FormControl className={classes.formControl} required={required}>
        <InputLabel
          shrink={true}
          className={classes.label}
          htmlFor="name-multiple"
        >
          {
            <div className="label_required">
              <div style={{ display: 'flex' }}>{label}</div>
              <div>{labelKN}</div>
            </div>
          }
        </InputLabel>
        <Select
          name={name}
          onChange={onChange}
          displayEmpty
          placeholder="Select Options"
          onBlur={onBlur}
          value={value}
          className={classes.select}
          disabled={disabled ? disabled : false}
          fullWidth
        >
          {children}
        </Select>
      </FormControl>

      <FormHelperText style={{ color: 'red', marginLeft: '18px' }}>
        {errorString}
      </FormHelperText>
      {value == 'GENERAL ELEVATE' &&
        name == 'companyInformation.programName' && (
          <ElevateForm initialValues={initialValues} images={images} />
        )}
      {value == 'ELEVATE KALYANA KARNATAKA' &&
        name == 'companyInformation.programName' && (
          <ElevateKalyanaForm images={images} value={value} />
        )}
      {value == 'ELEVATE UNNATI for (SC/ST ENTREPRENEURS)' &&
        name == 'companyInformation.programName' && (
          <ElevateUnnatiForm images={images} value={value} />
        )}
      {value == 'AMRIT for (OBC ENTREPRENEURS)' &&
        name == 'companyInformation.programName' && (
          <ElevateKalyanaForm images={images} value={value} />
        )}
      {value == 'AMRIT for (OBC & MINORITIES INNOVATIVE STARTUPS)' &&
        name == 'companyInformation.programName' && (
          <Amrit images={images} value={value} />
        )}
    </React.Fragment>
  );
};

const FormikSelect = (props) => {
  const { label, name, labelKN, items, required, eventSelect } = props;
  const classes = useStyles();
  return (
    <>
      <Field
        images={props.images}
        initialValues={props.initialValues}
        name={name}
        label={
          <div style={{ marginLeft: '6px' }}>
            {label}
            {required && <span style={{ color: '#f4433' }}>*</span>}
            <br />
            {labelKN}
          </div>
        }
        as={MaterialUISelect}
        displayEmpty
        errorString={<ErrorMessage name={name} />}
        required={required}
        className={props.selectClass}
      >
        {/* {
          <MenuItem value={''} className={classes.placeholder}>
            Select
          </MenuItem>
        } */}
        {items?.map((item, index) => {
          if (index == 0 && item.value === 'none') {
            return (
              <MenuItem key={index} className={classes.placeholder}>
                {item.label}
              </MenuItem>
            );
          } else {
            return (
              <MenuItem key={item.value} value={item.value}>
                {eventSelect ? item.label.toUpperCase() : item.label}
              </MenuItem>
            );
          }
        })}
      </Field>
      {/* {items[0].value == 'elevate' && props.name == 'programOrScheme' && (
        <ElevateForm />
      )}
      {items[1].value == 'elevateUnnati' && props.name == 'programOrScheme' && (
        <ElevateUnnatiForm />
      )} */}
    </>
  );
};

export default FormikSelect;

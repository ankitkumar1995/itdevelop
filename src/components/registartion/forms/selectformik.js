import Select from '@material-ui/core/Select';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import { Field } from 'formik';
import { FormHelperText } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { ErrorMessage } from 'formik';
import { FormControl } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  placeholder: {
    color: '#aaa',
  },
  formControl: {
    minWidth: '100%',
    background: '#F8F8FC',
    borderRadius: '10px',
    padding: '14px 8px',
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
    fontWeight: '700',
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
  children,
  name,
  errorString,
  label,
  labelKN,
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
        <div
          style={{
            fontSize: '13px',
            fontWeight: '600',
            textTransform: 'uppercase',
            marginTop: '-9px',
          }}
          className="label_required"
        >
          <div style={{ display: 'flex' }}>{label}</div>
          <div style={{ marginTop: '-9px' }}>{labelKN}</div>
        </div>

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
      {value == 'ELEVATE 2021' && name == 'companyInformation.programName' && (
        <ElevateForm initialValues={initialValues} images={images} />
      )}
      {value == 'ELEVATE UNNATI 2021 (FOR SC/ST Enterpreneurs)' &&
        name == 'companyInformation.programName' && (
          <ElevateUnnatiForm images={images} />
        )}
    </React.Fragment>
  );
};

const SelectFormik = (props) => {
  const {
    label,
    name,
    labelKN,
    placeHolder,
    className,
    labelClass,
    items,
    required,
    disabled,
  } = props;
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
        disabled={disabled ? disabled : false}
        className={props.selectClass}
      >
        <MenuItem className={classes.placeholder} value="">
          Select
        </MenuItem>
        {items.map((item, index) => {
          if (index == 0 && item.value === 'none') {
            return (
              <MenuItem key={index} className={classes.placeholder}>
                {item.label}
              </MenuItem>
            );
          } else {
            return (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            );
          }
        })}
      </Field>
    </>
  );
};

export default SelectFormik;

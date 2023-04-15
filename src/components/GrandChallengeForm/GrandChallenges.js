import Select from '@material-ui/core/Select';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import { Field, useField } from 'formik';
import { FormHelperText } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { ErrorMessage } from 'formik';
import { FormControl } from '@material-ui/core';
//import Input from 'react-select/src/components/input';
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
      margin: '6px 4px 0 4px',
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
  valueProb,
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
          fullWidth
        >
          {children}
        </Select>
      </FormControl>

      <FormHelperText style={{ color: 'red' }}>{errorString}</FormHelperText>
    </React.Fragment>
  );
};

const GrandChalengeSelect = (props) => {
  const {
    label,
    name,
    labelKN,
    placeHolder,
    className,
    labelClass,
    items,
    required,
  } = props;
  const classes = useStyles();
  return (
    <>
      <Field
        images={props.images}
        initialValues={props.initialValues}
        valueProb={props.valueProb}
        name={name}
        label={
          <div>
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
        defaultValue
      >
        <MenuItem value={''} className={classes.placeholder}>
          Select
        </MenuItem>
        {items.map((item, index) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
            <br />
            {item.labelKN}
          </MenuItem>
        ))}
      </Field>
    </>
  );
};

export default GrandChalengeSelect;

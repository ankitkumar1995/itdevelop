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
    padding: '12px 8px',
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
  label,
  children,
  name,
  errorString,
  value,
  onChange,
  onBlur,
  required,
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
          <div className="label_required">
            <div style={{ display: 'flex' }}>{label}</div>
          </div>
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

      <FormHelperText style={{ color: 'red', marginLeft: '18px' }}>
        {errorString}
      </FormHelperText>
    </React.Fragment>
  );
};

const FormikSelect = (props) => {
  const { label, name, placeHolder, className, items, required } = props;
  const classes = useStyles();
  return (
    <>
      <Field
        images={props.images}
        // initialValues={props.initialValues}
        name={name}
        label={
          <div style={{ marginLeft: '6px' }}>
            {label}
            {required && <span style={{ color: '#f4433' }}>*</span>}
          </div>
        }
        as={MaterialUISelect}
        displayEmpty
        errorString={<ErrorMessage name={name} />}
        required={required}
      >
        {items.map((item, index) => {
          if (index === 0 && item.value === 'none') {
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

export default FormikSelect;

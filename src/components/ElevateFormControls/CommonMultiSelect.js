import React, { useState } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import { makeStyles } from '@material-ui/core/styles';
import { useFormikContext, useField, ErrorMessage } from 'formik';
import { FormHelperText, Grid } from '@material-ui/core';
import { Input } from './input';
const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: '14px',
    fontWeight: '550',
    textTransform: 'uppercase',
    marginBottom: '0px',
  },
  required: {
    color: '#ee6f57 !important',
  },
  multiContainer: {
    background: '#f8f8fc',
    padding: '10px',
    borderRadius: '5px',
  },
}));
const CommonMultiSelect = (props) => {
  const [options] = useState(props.options);
  const classes = useStyles();
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props.name);
  const ErrorText = meta.error && meta.touched ? meta.error : '';
  const getSelectedValues = (selectedList, selectedItem) => {
    if (field.value !== undefined) {
      setFieldValue(props.name, [...field.value, selectedItem.label]);
    }
  };
  const getRemovedValues = (selectedList, removedItem) => {
    if (field.value !== undefined) {
      setFieldValue(
        props.name,
        field.value.filter((e) => e !== removedItem.label)
      );
    }
  };
  return (
    <>
      <div className="techno_cls">
        <h6 className={classes.text}>
          {props.label} <span className={classes.required}>*</span>
        </h6>
        <h6 className={classes.text}>{props.labelKN}</h6>
        <Multiselect
          name={props.name}
          options={options}
          selectedValues={
            field.value &&
            field.value.length > 0 &&
            field.value.map((s) => {
              return { id: s, label: s };
            })
          }
          displayValue="label"
          onSelect={getSelectedValues}
          selectionLimit={props.limit ? props.limit : 5}
          onRemove={getRemovedValues}
          errorString={<ErrorMessage name={props.name} />}
        />
      </div>
      <FormHelperText style={{ color: '#f52b06' }}>{ErrorText}</FormHelperText>
    </>
  );
};
export default CommonMultiSelect;

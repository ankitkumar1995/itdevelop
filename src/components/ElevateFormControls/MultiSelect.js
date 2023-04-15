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
const MultiSelect = (props) => {
  const [options] = useState(props.options);
  const classes = useStyles();
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props.name);
  const ErrorText = meta.error && meta.touched ? meta.error : '';
  const getSelectedValues = (selectedList, selectedItem) => {
    if (selectedItem.label === 'Others') {
      props.others(true);
    }
    if (field.value !== undefined) {
      setFieldValue(props.name, [...field.value, selectedItem.label]);
    }
  };
  const getRemovedValues = (selectedList, removedItem) => {
    props.others(false);
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
        <h6 className={classes.text} style={{ marginLeft: '8px' }}>
          Technology Vertical <span className={classes.required}>*</span>
        </h6>
        <h6 className={classes.text} style={{ marginLeft: '8px' }}>
          ತಾಂತ್ರಿಕತೆ ವರ್ಟಿಕಲ್ (ತಾಂತ್ರಿಕ ನಿರ್ದಿಷ್ಟತೆ)
        </h6>
        <Multiselect
          name={name}
          options={options}
          selectedValues={
            props.selectedValues &&
            props.selectedValues.length > 0 &&
            props.selectedValues.map((s) => {
              return { id: s, label: s };
            })
          }
          displayValue="label"
          onSelect={getSelectedValues}
          selectionLimit={5}
          onRemove={getRemovedValues}
          errorString={<ErrorMessage name={name} />}
        />
      </div>
      <FormHelperText style={{ color: '#f52b06' }}>{ErrorText}</FormHelperText>
    </>
  );
};
export default MultiSelect;

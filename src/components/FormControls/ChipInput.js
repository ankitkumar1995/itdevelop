import { FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useField, useFormikContext } from 'formik';
import ChipInput from 'material-ui-chip-input';
import { useState } from 'react';
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
const CommonChipInput = ({ name, placeholder, ...props }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const [values, setValues] = useState([]);
  const classes = useStyles();
  const ErrorText = meta.error && meta.touched ? meta.error : '';
  const handleAddChip = (chip) => {
    setFieldValue(name, [...field.value, chip]);
  };

  const handleDeleteChip = (chip, index) => {
    field.value.splice(index, 1);
    setFieldValue(name, [...field.value]);
  };
  return (
    <>
      <div className="chip_cls">
        <h6 className={classes.text}>
          {props.label}{' '}
          {props.required && <span className={classes.required}>*</span>}
        </h6>
        <h6 className={classes.text} style={{ marginBottom: '9px' }}>
          {props.labelKN}
        </h6>
        <ChipInput
          name={name}
          value={field.value}
          alwaysShowPlaceholder={true}
          placeholder={placeholder}
          disableUnderline={true}
          fullWidth={true}
          blurBehavior={'add'}
          onAdd={(chip) => handleAddChip(chip)}
          onDelete={(chip, index) => handleDeleteChip(chip, index)}
        />
      </div>
      <FormHelperText style={{ color: '#f52b06' }}>{ErrorText}</FormHelperText>
    </>
  );
};
export default CommonChipInput;

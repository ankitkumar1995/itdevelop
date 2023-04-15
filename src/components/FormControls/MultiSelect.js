import React, { useState } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import { TechData } from './ElevateFormData';
import { makeStyles } from '@material-ui/core/styles';
import { useFormikContext, useField, getIn } from 'formik';
import { TagAddtionalIndustrySector } from '../startupRegistrationForm/startupRegistrationFormData';

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: '14px',
    fontWeight: '550',
    textTransform: 'uppercase',
  },
  required: {
    color: '#ee6f57 !important',
  },
}));

const MultiSelect = (props) => {
  const { name } = props;
  const [options] = useState(TagAddtionalIndustrySector);
  //const [others, setOthers] = useState(false);
  const [field, meta] = useField(name);
  const classes = useStyles();

  const getSelectedValues = (selectedList, selectionLimit) => {
    if (selectedItem.label === 'others') {
      props.others(true);
    }
  };
  const getRemovedValues = (selectedList, removedItem) => {
    if (removedItem.label === 'Others') {
      props.others(false);
    }
  };
  return (
    <>
      <div>
        <h6 className={classes.text}>
          Technology Verticals <span className={classes.required}>*</span>
        </h6>
        <Multiselect
          name={name}
          options={options}
          displayValue="label"
          onSelect={getSelectedValues}
          selectionLimit={5}
          onRemove={getRemovedValues}
        />
      </div>
      {(field.value = 'Others') ? (
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="Enter founder name here"
            name="startUpDetails.founderName"
            label="Other technology"
            labelKN="ಸ್ಥಾಪಕರ/ ಸಹ-ಸ್ಥಾಪಕರ/ ನಿರ್ದೇಶಕರ/ ಪಾಲುದಾರರ ಹೆಸರು"
            required
            error={props.error}
          />
        </Grid>
      ) : (
        ''
      )}
    </>
  );
};

export default MultiSelect;

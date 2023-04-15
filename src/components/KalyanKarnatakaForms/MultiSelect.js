import React, { useState } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import { TechData } from './ElevateFormData';
import { makeStyles } from '@material-ui/core/styles';
import { useFormikContext, useField, getIn } from 'formik';

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
  const [options] = useState(TechData);
  const [others, setOthers] = useState(false);
  const [field, meta] = useField(name);
  const classes = useStyles();

  // const getSelectedValues = (selectedList, selectedItem) => {
  //   if (selectedList.length > 3) {
  //     if (selectedItem.label === 'Others') {
  //       props.others(true);
  //     }
  //   }
  //   };
  // props.others(true);
  // props.values(selectedList)
  // };

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
        <h6 className={classes.text}>
          ತಾಂತ್ರಿಕತೆ ವರ್ಟಿಕಲ್ (ತಾಂತ್ರಿಕ ನಿರ್ದಿಷ್ಟತೆ)
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

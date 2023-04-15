import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import FormikTextArea from '../ElevateFormControls/FormikTextArea';
import Input from '../ElevateFormControls/input';
import FormikSelect from '../ElevateFormControls/Select';
import MultiSelect from '../ElevateFormControls/MultiSelect';
import { TechData } from '../ElevateForms/ElevateFormData';
import { SectorData } from '../ElevateForms/ElevateFormData';
import { useField } from 'formik';
import GrandChalengeSelect from './GrandChallenges';
import ProblemStatement from './ProblemSelect';

const TechnologyDetails = (props) => {
  const [field, meta] = useField(props.name);
  const [others, setOthers] = useState(
    props.initialValues.technologyDetails.technology.includes('Others')
  );

  const setOthersValue = (val) => {
    setOthers(val);
  };
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} style={{ marginTop: '20px' }}>
          <GrandChalengeSelect
            items={props?.gckChallenge.map((item) => {
              return {
                value: item.name,
                label: item.name,
                labelKN: item.name_telgu,
              };
            })}
            name="technologyDetails.challengeName"
            label={'Please choose the Challenge Type you wish to apply'}
            labelKN="ದಯವಿಟ್ಟು ನೀವು ಅನ್ವಯಿಸಲು ಬಯಸುವ ಚಾಲೆಂಜ್ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ"
            required={true}
            valueProb={field?.value?.technologyDetails?.problemStatement}
          />
        </Grid>
        {props.gckChallenge.map(
          (item) =>
            field?.value?.technologyDetails?.challengeName?.includes(
              item.name
            ) && (
              <Grid item xs={12} style={{ marginTop: '0px' }}>
                <ProblemStatement
                  items={item?.problemStatement?.map((item) => {
                    return {
                      value: { val: item.name, valKN: item.name_telgu },
                      label: item.name,
                      labelKN: item.name_telgu,
                    };
                  })}
                  name="technologyDetails.problemStatement"
                  label={
                    'Please select the problem statement for which you want to develop solution'
                  }
                  labelKN="ನೀವು ಪರಿಹಾರವನ್ನು ಅಭಿವೃದ್ಧಿಪಡಿಸಲು ಬಯಸುವ ಸಮಸ್ಯೆಯ ಹೇಳಿಕೆಯನ್ನು ದಯವಿಟ್ಟು ಆಯ್ಕೆ ಮಾಡಿ"
                  required={true}
                />
              </Grid>
            )
        )}

        <Grid item xs={6}>
          <Input
            placeholder="Enter text here"
            name="technologyDetails.titleOfProject"
            label="Title of the Project"
            labelKN="ಕಾರ್ಯಯೋಜನೆಯ (ಪ್ರಾಜೆಕ್ಟ್) ಶೀರ್ಷಿಕೆ"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <FormikTextArea
            placeholder={'Enter text here (not to exceed 500 words)'}
            name="technologyDetails.descriptionOfProject"
            label={`Describe the Innovation (Technology/ Novelty)`}
            labelKN="ನಾವೀನ್ಯತೆ ಕುರಿತು ವಿವರಣೆ (ತಾಂತ್ರಿಕತೆ/ ವಿನೂತನತೆ)"
            rows={10}
            className="tech__text"
          />
        </Grid>
        <Grid item xs={12} style={{ marginTop: '20px' }}>
          <FormikSelect
            items={SectorData.map((item) => {
              return {
                value: item.value,
                label: item.label,
              };
            })}
            name="technologyDetails.sector"
            label={'SECTOR/INDUSTRY'}
            labelKN="ವಲಯ/ ಉದ್ದಿಮೆ"
            required={true}
          />
        </Grid>
        <Grid item xs={12}>
          {/* <MultiSelect
            names={TechData}
            label="TECHNOLOGY VERTICAL"
            labelKN="ತಾಂತ್ರಿಕತೆ ವರ್ಟಿಕಲ್ (ತಾಂತ್ರಿಕ ನಿರ್ದಿಷ್ಟತೆ)"
          /> */}
          <MultiSelect
            others={setOthersValue}
            selectedValues={props.selectedValues}
            name="technologyDetails.technology"
            label="TECHNOLOGY VERTICAL"
            labelKn="ತಾಂತ್ರಿಕತೆ ವರ್ಟಿಕಲ್ (ತಾಂತ್ರಿಕ ನಿರ್ದಿಷ್ಟತೆ)"
            options={TechData.map((i) => {
              return {
                id: i,
                label: i,
              };
            })}
            required
          />
        </Grid>
        {others && (
          <Grid item xs={12}>
            <Input
              placeholder="Enter text here"
              name="technologyDetails.otherTechnology"
              label="If others, specify"
              labelKN="ಮತ್ತೇನಾದರೂ ಇದ್ದರೆ, ಸೂಚಿಸಿ"
              required
            />
          </Grid>
        )}
        <Grid item xs={6}>
          <FormikSelect
            items={[
              { label: 'Select', value: '' },
              { label: 'Ideation', value: 'ideation' },
              { label: 'Validation', value: 'validation' },
              { label: 'Early Traction', value: 'earlyTraction' },
              { label: 'Scaling', value: 'scaling' },
              { label: 'Growth', value: 'growth' },
            ].map((item) => {
              return {
                value: item.value,
                label: item.label,
              };
            })}
            name="technologyDetails.stageOfStartup"
            label={'AT WHAT STAGE YOUR STARTUP IS IN'}
            labelKN="ನಿಮ್ಮ ನವೋದ್ಯಮವು ಯಾವ ಹಂತದಲ್ಲಿದೆ?"
            required={true}
          />
        </Grid>
        <Grid item xs={12}>
          <FormikTextArea
            placeholder={'Enter text here (not to exceed 250 words)'}
            name="technologyDetails.whatNeedsToBeDone"
            label={`What have you done till now with respect to the idea and what more needs to be done to commercialize the idea?. This section should describe the Technology Readiness Level and Resources needed to take the Technology further towards commercialization.`}
            labelKN={`ಪರಿಕಲ್ಪನೆಗೆ ಸಂಬಂಧಪಟ್ಟಂತೆ ಈವರೆಗೆ ನೀವು ಏನು ಮಾಡಿರುವಿರಿ? ಈ ಪರಿಕಲ್ಪನೆಯನ್ನು ವಾಣಿಜ್ಯ ಸ್ವರೂಪಕ್ಕೆ ಪರಿವರ್ತಿಸಲು ಇನ್ನೂ ಏನನ್ನು ಮಾಡಬೇಕು? (ಈ ವಿಭಾಗವು ವಾಣಿಜ್ಯ ಸ್ವರೂಪದ ಪರಿವರ್ತನೆಗೆ ಅಗತ್ಯವಾದ ತಾಂತ್ರಿಕ ಸಿದ್ಧತೆಯ ಮಟ್ಟ ಮತ್ತು ಸಂಪನ್ಮೂಲಗಳ ಬಗ್ಗೆ ವಿವರಣೆಯನ್ನು ಒಳಗೊಂಡಿರಬೇಕು)`}
            rows={10}
            className="tech_text_area"
            required
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default TechnologyDetails;

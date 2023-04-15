import {
  Divider,
  Button,
  TextField,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FieldArray, Form, Formik, getIn, useField } from 'formik';
import { amritCategoryData } from '../../AmritEventForm/AmritFormData';
import Input from '../../ElevateFormControls/input';
import FormikSelect from '../../ElevateFormControls/Select';
import { categoryData } from '../ElevateFormData';
import UploadFiles from '../UploadFiles';
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '1000px',
  },
  button: {
    margin: theme.spacing(1),
  },
  field: {
    margin: theme.spacing(1),
  },
  text: {
    fontSize: '12px',
    color: '#9896ae',
    textDecoration: 'uppercase',
  },
  circlePlus: {
    display: 'flex',
    marginLeft: '20px',
    marginTop: '30px',
    alignItems: 'center',
    gap: '20px',
    color: '#1f3c88',
    letterSpacing: '0.5px',
    fontWeight: '600',
    width: '1100px',
  },
  addButton: {
    border: 'none',
    background: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    color: '#1f3c88',
  },
  closeBtn: {
    // border: '1px solid #ccc',
    background: 'none',
    border: 'none',
    color: '#ee6f57',
  },
  flexBtn: {
    width: '1009px',
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  marginGap: {
    marginBottom: '20px',
  },
}));

const SCST = (props) => {
  const { name } = props;
  const classes = useStyles();
  const [field, meta] = useField(name);
  return (
    <div className={classes.container}>
      <FieldArray name={name}>
        {({ push, remove }) => (
          <div style={{ maxWidth: '1010px' }}>
            {field?.value?.map((p, index) => {
              const stakeHolderName = `companyInformation.scStDetails[${index}].stakeHolderName`;
              const rdNumber = `companyInformation.scStDetails[${index}].rdNumber`;
              const sharePercentage = `companyInformation.scStDetails[${index}].sharePercentage`;
              const category = `companyInformation.scStDetails[${index}].category`;
              const digitalCasteCerti = `companyInformation.scStDetails[${index}].digitalCasteCerti`;
              const moa = `companyInformation.scStDetails[${index}].moa`;

              return (
                <>
                  <Grid item xs={12} className={classes.marginGap}>
                    <Input
                      placeholder="Enter name of the stakeholder here"
                      name={stakeHolderName}
                      label="Name of the Stakeholder"
                      labelKN="ಮಧ್ಯಸ್ಥಗಾರರ ಹೆಸರು"
                      required
                    />
                  </Grid>
                  <Grid item xs={6} className={classes.marginGap}>
                    <Input
                      placeholder="Enter RD number of the stakeholder here"
                      name={rdNumber}
                      label="RD number of the stakeholder"
                      labelKN="ಸ್ಟೇಕ್‌ಹೋಲ್ಡರ್‌ನ ಆರ್ಡಿ ಸಂಖ್ಯೆ"
                      required
                    />
                  </Grid>
                  <Grid item xs={6} className={classes.marginGap}>
                    <Input
                      placeholder="Enter amount here"
                      name={sharePercentage}
                      label="Amount of share held (in percentage)"
                      labelKN="ಶೇಕಡಾವಾರು ಹೊಂದಿರುವ ಪಾಲಿನ ಮೊತ್ತ"
                      required
                      maxLength={3}
                    />
                  </Grid>
                  {props.amrit ? (
                    <Grid item xs={6}>
                      <FormikSelect
                        items={amritCategoryData.map((item) => {
                          return {
                            value: item.value,
                            label: item.label,
                          };
                        })}
                        name={category}
                        label="Category (OBC/Minorities)"
                        labelKN="ವರ್ಗ (ಒಬಿಸಿ/ಅಲ್ಪಸಂಖ್ಯಾತರು)"
                        required={true}
                      />
                    </Grid>
                  ) : (
                    <Grid item xs={6}>
                      <FormikSelect
                        items={categoryData.map((item) => {
                          return {
                            value: item.value,
                            label: item.label,
                          };
                        })}
                        name={category}
                        label="Category (SC/ST/Others)"
                        labelKN="ವರ್ಗ (ಎಸ್‌ಸಿ/ಎಸ್‌ಟಿ/ಇತರೆ)"
                        required={true}
                      />
                    </Grid>
                  )}
                  <UploadFiles
                    elevate
                    className={classes.text}
                    label="Please upload the Digital Caste Certificates of the Stakeholder issued from Revenue Department (Nadakacheri) Government of Karnataka"
                    labelKN="ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಕಂದಾಯ ಇಲಾಖೆ (ನಾಡಕಛೇರಿ)ಯಿಂದ ನೀಡಿರುವ ಹಿತಾಸಕ್ತರುಗಳ ಡಿಜಿಟಲ್‌ ಜಾತಿ ಪ್ರಮಾಣಪತ್ರಗಳನ್ನು ದಯವಿಟ್ಟು ಅಪ್ಲೋಡ್‌ ಮಾಡಿ"
                    name={digitalCasteCerti}
                    size="1"
                    fileSize="1048576"
                    filesLimit={3}
                    acceptedFiles={['.pdf']}
                    required
                  />
                  <UploadFiles
                    elevate
                    className={classes.text}
                    label="Upload the MoA"
                    labelKN="ಒಪ್ಪಂದದ ದಾಖಲೆಯನ್ನು ಅಪ್ಲೋಡ್‌ ಮಾಡಿ"
                    name={moa}
                    size="1"
                    fileSize="1048576"
                    filesLimit={3}
                    acceptedFiles={['.pdf']}
                    required
                  />
                  {index === 1 && (
                    <div className={classes.flexBtn}>
                      <button
                        className={classes.closeBtn}
                        type="button"
                        onClick={() => remove(index)}
                      >
                        <i class="fas fa-times-circle fa-2x"></i>
                      </button>
                    </div>
                  )}
                </>
              );
            })}
            <div className={classes.circlePlus}>
              <button
                type="button"
                className={classes.addButton}
                onClick={() =>
                  push({
                    stakeHolderName: '',
                    rdNumber: '',
                    sharePercentage: '',
                    category: '',
                    digitalCasteCerti: [],
                    moa: [],
                  })
                }
              >
                <i className="fas fa-plus-circle fa-3x"></i>
                <Typography
                  component="h1"
                  variant="h6"
                  style={{ color: '#1D293F' }}
                >
                  {props.addMoreText}
                </Typography>
                <Typography
                  component="h5"
                  variant="h6"
                  style={{ color: '#1D293F' }}
                >
                  (ಹೆಚ್ಚು ಎಸ್‌ಸಿ/ಎಸ್‌ಟಿ ಉದ್ಯಮಿಗಳನ್ನು ಸೇರಿಸಿ)
                </Typography>
              </button>
            </div>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default SCST;

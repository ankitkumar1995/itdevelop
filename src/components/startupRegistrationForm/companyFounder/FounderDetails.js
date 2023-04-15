import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FieldArray, useField } from 'formik';
import UploadFiles from '../../ElevateForms/UploadFiles';
import Input from '../../ElevateFormControls/input';
import CustomToggleButton from '../../ElevateFormControls/ToggleButton';
import { categoryData } from '../startupRegistrationFormData';
import FormikSelect from '../../ElevateFormControls/Select';

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
    display: 'flex',
    margin: '0 auto',
  },
  flexBtn: {
    width: '1009px',
    //display: 'flex',
    //flexDirection: 'row-reverse',
  },
  marginGap: {
    marginBottom: '20px',
  },
}));

const FounderDetails = (props) => {
  const { name } = props;
  const classes = useStyles();
  const [field, meta] = useField(name);
  return (
    <div className={classes.container}>
      <FieldArray name={name}>
        {({ push, remove }) => (
          <div style={{ maxWidth: '1010px' }}>
            {field.value.map((p, index) => {
              const founderName = `registeration.companyFounderDetail.founderDetails[${index}].founderName`;
              const founderDesignation = `registeration.companyFounderDetail.founderDetails[${index}].founderDesignation`;
              const founderEmail = `registeration.companyFounderDetail.founderDetails[${index}].founderEmail`;
              const founderNumber = `registeration.companyFounderDetail.founderDetails[${index}].founderNumber`;
              const founderLinkedIn = `registeration.companyFounderDetail.founderDetails[${index}].founderLinkedIn`;
              const founderTwitter = `registeration.companyFounderDetail.founderDetails[${index}].founderTwitter`;
              const founderProfileImage = `registeration.companyFounderDetail.founderDetails[${index}].founderProfileImage`;
              const isScSt = `registeration.companyFounderDetail.founderDetails[${index}].isScSt`;
              const category = `registeration.companyFounderDetail.founderDetails[${index}].category`;
              const scstCertificate = `registeration.companyFounderDetail.founderDetails[${index}].scstCertificate`;
              return (
                <Grid container spacing={3}>
                  {index > 0 && (
                    <>
                      <div className={classes.flexBtn}>
                        <button
                          className={classes.closeBtn}
                          type="button"
                          onClick={() => remove(index)}
                        >
                          <hr style={{ height: '2px', width: '532px' }} />
                          <i class="fas fa-times-circle fa-2x"></i>
                        </button>
                      </div>
                    </>
                  )}
                  <Grid item xs={12} sm={6}>
                    <Input
                      placeholder="Enter founder full name"
                      name={founderName}
                      label="Full Name "
                      labelKN="ಪೂರ್ಣ ಹೆಸರು"
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Input
                      placeholder="Enter designation"
                      name={founderDesignation}
                      label="Designation"
                      labelKN="ಪದನಾಮ"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input
                      placeholder="Enter founder email"
                      name={founderEmail}
                      label="email"
                      labelKN="ಇ-ಮೇಲ್"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input
                      placeholder="Enter mobile number"
                      name={founderNumber}
                      label="mobile number"
                      labelKN="ಮೊಬೈಲ್ ದೂರವಾಣಿ ಸಂಖ್ಯೆ"
                      maxLength={10}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input
                      placeholder="Enter linkedin url"
                      name={founderLinkedIn}
                      label="linkedin profile url"
                      labelKN="ಲಿಂಕ್ಡ್ಇನ್ ಲಕ್ಷಣ ವಿವರಗಳ ಯು.ಆರ್.ಎಲ್. ವಿಳಾಸ"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input
                      placeholder="Enter twitter link"
                      name={founderTwitter}
                      label="twitter link"
                      labelKN="ಟ್ವಿಟ್ಟರ್ ಕೊಂಡಿ"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <UploadFiles
                      imageTypeMsg
                      label="upload profile picture"
                      labelKN="ಭಾವಚಿತ್ರವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ"
                      name={founderProfileImage}
                      notRequiredArray={true}
                      size="4"
                      fileSize="4194304"
                      filesLimit={1}
                      acceptedFiles={['.jpg', '.jpeg', '.png']}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomToggleButton
                      label="do you belong to SC/ST/OBC/MINORITIES?"
                      labelKN="ನೀವು ಅನುಸೂಚಿತ ಜಾತಿ / ಅನುಸೂಚಿತ ಪಂಗಡದವರೇ"
                      name={isScSt}
                      test={true}
                      required
                    />
                  </Grid>
                  {(p.isScSt === 'true' || p.isScSt === true) && (
                    <>
                      <Grid item xs={6}>
                        <FormikSelect
                          items={categoryData.map((item) => {
                            return {
                              value: item.value,
                              label: item.label,
                            };
                          })}
                          name={category}
                          label="Category (SC/ST/OBC/Minorities)"
                          labelKN="ವರ್ಗ (ಎಸ್‌ಸಿ/ಎಸ್‌ಟಿ/ಒಬಿಸಿ/ಅಲ್ಪಸಂಖ್ಯಾತರು)"
                          required={true}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <UploadFiles
                          typeMsg=".pdf is accepted with size smaller than"
                          label="upload SC/ST/OBC/MINORITIES caste certificate"
                          labelKN="ಅನುಸೂಚಿತ ಜಾತಿ / ಅನುಸೂಚಿತ ಪಂಗಡ ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ ಅಪ್ಲೋಡ್ ಮಾಡಿ"
                          name={scstCertificate}
                          size="1"
                          fileSize="1048576"
                          notRequiredArray={true}
                          filesLimit={1}
                          acceptedFiles={['.pdf']}
                          required
                        />
                      </Grid>
                    </>
                  )}
                </Grid>
              );
            })}
            <div className={classes.circlePlus}>
              <button
                type="button"
                className={classes.addButton}
                onClick={() =>
                  push({
                    founderName: '',
                    founderDesignation: '',
                    founderEmail: '',
                    founderNumber: '',
                    founderLinkedIn: '',
                    founderTwitter: '',
                    founderProfileImage: [],
                    isScSt: false,
                    scstCertificate: [],
                  })
                }
              >
                <i className="fas fa-plus-circle fa-3x"></i>
                <Typography
                  component="h1"
                  variant="h6"
                  style={{ color: '#1D293F' }}
                >
                  Add more person
                </Typography>
                <Typography
                  component="h5"
                  variant="h6"
                  style={{ color: '#1D293F' }}
                ></Typography>
              </button>
            </div>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default FounderDetails;

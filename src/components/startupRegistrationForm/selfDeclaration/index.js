import { Grid } from '@material-ui/core';
import React from 'react';
import UploadFiles from '../../ElevateForms/UploadFiles';
import FormikSelect from '../../ElevateFormControls/Select';
import { infoFoundAboutKaratakaStartUp } from '../startupRegistrationFormData';
import Link from 'next/link';
import CheckBox from '../../ElevateFormControls/CheckBox';
const SelfDeclaration = (props) => {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <div className="reg__decl">
            <FormikSelect
              items={infoFoundAboutKaratakaStartUp.map((item) => {
                return {
                  value: item.value,
                  label: item.label,
                };
              })}
              placeHoleder="Select"
              name="registeration.selfDeclaration.infoFoundAboutKaratakaStartUpCell"
              label="How did you hear about the Karnataka Startup Cell?"
              labelKN="ಕರ್ನಾಟಕ ಸ್ಟಾರ್ಟ್‌ಅಪ್ ಸೆಲ್ ಬಗ್ಗೆ ನೀವು ಹೇಗೆ ಕೇಳಿದ್ದೀರಿ?"
              required
            />
          </div>
        </Grid>

        <div className="upload_doc_instxn">
          <div className="conatiner">
            <div>
              Please download the annexure below and upload a
              <span className="upload_doc_instxn_hltd">
                {' '}
                sealed & signed copy
              </span>{' '}
              of the same on the company letter head.
            </div>
            <div className="self_decla_annex">
              <Link href="/assets/Annexure_self_declaration.docx">
                <a>Self declaration annexure</a>
              </Link>
            </div>
          </div>
        </div>

        <Grid item xs={12}>
          <UploadFiles
            elevate
            label="Upload signed copy of self declaration annexure"
            labelKN="ಸ್ವಯಂ ಘೋಷಣೆಯ ಅನುಬಂಧದ ಸಹಿ ಮಾಡಿದ ಪ್ರತಿಯನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ"
            name="registeration.selfDeclaration.signedAnexure"
            size="1"
            fileSize="1048576"
            filesLimit={3}
            acceptedFiles={['.pdf']}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <CheckBox getValue={props.getValue} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default SelfDeclaration;

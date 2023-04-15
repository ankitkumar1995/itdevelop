import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CheckBox from '../ElevateFormControls/CheckBox';
import UploadFiles from './UploadFiles';

const useStyles = makeStyles((theme) => ({
  body: {
    background: '#f8f8fc',
  },
  label: {
    fontSize: '17px',
    color: '#1d293f',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
    textAlign: 'initial',
  },
  checkbox: {
    fontSize: '14px',
    fontWeight: '600',
    color: '1d293f',
    letterSpacing: '0.5px',
  },
  terms: {
    color: '#ee6f57',
  },
  pitchDownload: {
    fontSize: '16px',
    color: '#1d293f',
    letterSpacing: '0.5px',
    fontWeight: '600',
  },
  pitchDeck: {
    color: '#ee6f57',
  },
  required: {
    color: '#ee6f57',
  },
}));

const SupportingDocuments = (props) => {
  const [files, setFiles] = useState([]);
  const classes = useStyles();

  const onChange = () => {
    setFiles(files);
  };

  const getValue = (val) => {
    props.getValue(val);
  };
  return (
    <Grid container spacing={3}>
      <div className="pitch-container">
        <div className="pitch-deck">
          <div className="pitch-download">
            <h4 className={classes.pitchDownload}>
              Please download the sample{' '}
              <span className={classes.pitchDeck}>Pitch Deck</span> below for
              your reference and upload a Pitch Deck in similar format in the
              box provided below.
            </h4>
            <div className="header-btn eer eduClass registration">
              <a
                target="_blank"
                href={
                  props.pitchPdf ? props.pitchPdf : '/assets/Pitch-Deck.ppt'
                }
                className="theme-btn"
              >
                <i className="fas fa-cloud-download-alt"></i>
                Sample pitch deck
              </a>
            </div>
          </div>
        </div>
      </div>
      <UploadFiles
        suportingDocuments
        className={classes.text}
        label="UPLOAD PITCH DECK"
        labelKN="ಪಿಚ್ ಡೆಕ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ"
        name={'supportingDocs.pitchDeck'}
        size="5"
        fileSize="5242880"
        filesLimit={1}
        acceptedFiles={['.pptx, .pdf, .ppt']}
        initialValues={props.initialValues}
        required
      />
      <Grid item xs={12}>
        <CheckBox getValue={getValue} tAndCPdf={props.tAndCPdf} />
      </Grid>
    </Grid>
  );
};

export default SupportingDocuments;

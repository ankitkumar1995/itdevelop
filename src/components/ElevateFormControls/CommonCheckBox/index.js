import { Checkbox, FormControlLabel } from '@material-ui/core';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useField } from 'formik';

const useStyles = makeStyles((theme) => ({
  checkbox: {
    color: '#ee6f57 !important',
  },
  terms: {
    fontSize: '14px',
    letterSpacing: '0.5px',
    color: '#1d293f',
  },
}));
const CommonCheckBox = (props) => {
  //const [agree, setAgree] = useState(false);

  const getAgree = (val) => {
    props.getValue(!val);
  };
  const [field, meta] = useField(props.name);
  const classes = useStyles();
  return (
    <div className="declaration_stmt">
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            name={props.name}
            value={field.value}
            onChange={() => getAgree(props.checkbox)}
          />
        }
        label={
          props.notRequiredPrivacy ? (
            <div htmlFor="value">
              <span className={classes.terms}>{props.declarationContent}</span>{' '}
              <br />
              <span>{props.declarationContentKN}</span>
            </div>
          ) : (
            <div htmlFor="value">
              <span className={classes.terms}>{props.declarationContent}</span>{' '}
              <a
                style={{ color: '#ee6f57' }}
                target="_blank"
                href={
                  props.tAndCPdf ? props.tAndCPdf : '/assets/Idea2PocT&C.pdf'
                }
              >
                Terms & Conditions
              </a>
              <br />
              <span>
                {props.declarationContentKN}
                <a
                  style={{ color: '#ee6f57' }}
                  target="_blank"
                  href={
                    props.tAndCPdf ? props.tAndCPdf : 'assets/Idea2PocT&C.pdf'
                  }
                >
                  ಷರತ್ತು ಮತ್ತು ನಿಬಂಧನೆಗಳಿಗೆ
                </a>{' '}
                ಒಪ್ಪುತ್ತೇನೆ.
              </span>
            </div>
          )
        }
      />
    </div>
  );
};
export default CommonCheckBox;

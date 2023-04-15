import { Checkbox, FormControlLabel } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
export const checkBox = { val: false };
const CheckBox = (props) => {
  const [agree, setAgree] = useState(false);
  // useEffect(() => {
  //   getAgree(!checkBox.val);
  // }, [checkBox.val]);
  const getAgree = (val) => {
    setAgree(!val);
    props.getValue(!val);
  };
  checkBox.val = agree;
  const classes = useStyles();
  return (
    <div className="declaration_stmt">
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            name="accept"
            onChange={() => getAgree(agree)}
          />
        }
        label={
          <div htmlFor="value">
            <span className={classes.terms}>
              I here by declare that the details furnished above are true to my
              best of knowledge and I agree to the
            </span>{' '}
            <a
              style={{ color: '#ee6f57' }}
              target="_blank"
              href={props.tAndCPdf ? props.tAndCPdf : '/assets/Idea2PocT&C.pdf'}
            >
              Terms & Conditions
            </a>
            <br />
            <span>
              ಈ ಮೇಲೆ ಒದಗಿಸಿರುವ ವಿವರಗಳು ನನ್ನ ಸ್ಪಷ್ಟ ಅರಿವಿಗೆ ಸತ್ಯವಾಗಿವೆಯೆಂದು ಈ
              ಮೂಲಕ ಘೋಷಿಸುತ್ತೇನೆ ಹಾಗೂ{' '}
              <a
                style={{ color: '#ee6f57' }}
                target="_blank"
                href="assets/Idea2PocT&C.pdf"
              >
                ಷರತ್ತು ಮತ್ತು ನಿಬಂಧನೆಗಳಿಗೆ
              </a>{' '}
              ಒಪ್ಪುತ್ತೇನೆ.
            </span>
          </div>
        }
      />
    </div>
  );
};
export default CheckBox;

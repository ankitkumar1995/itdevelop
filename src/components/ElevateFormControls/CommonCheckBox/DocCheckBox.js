import { PortraitSharp } from '@material-ui/icons';
import { Field, useField, useFormikContext } from 'formik';
import { useEffect } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { useState } from 'react';
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

function DocCheckbox(props) {
  const classes = useStyles();
  const [field, meta] = useField(props.name);
  const { setFieldValue, values } = useFormikContext();
  return (
    <div className="declaration_stmt">
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            name={props.name}
            value={field.value}
            onChange={() => {
              props.getValue && props.getValue(!props.checkbox);
              setFieldValue(props.name, !props.checkbox);
            }}
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
    // <div className="doc-checkbox">
    //   <div>
    //     <Field
    //       name={props.name}
    //       type="checkbox"
    //       checked={field.value}
    //       // onChange={() => {
    //       //   props.getValue && props.getValue(!props.checkbox);
    //       //   setFieldValue(props.name, !props.checkbox);
    //       // }}
    //       onPress={() => {
    //         props.getValue && props.getValue(!props.checkbox);
    //         setFieldValue(props.name, !props.checkbox);
    //       }}
    //     >
    //       {/* <input
    //     {...field}
    //     type="checkbox"
    //     checked={field.value}
    //     onChange={() => {
    //       setFieldValue(props.name, !props.checkbox);
    //       props.handler(setFieldValue, values);
    //     }}
    //   />
    //   {props.label} */}
    //     </Field>
    //     <div htmlFor="value">
    //       <span>{props.declarationContent}</span> <br />
    //       <span>{props.declarationContentKN}</span>
    //     </div>
    //   </div>
    // </div>
  );
}

export default DocCheckbox;

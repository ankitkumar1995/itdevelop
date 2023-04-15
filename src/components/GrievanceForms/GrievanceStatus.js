import React, { useEffect, useState } from 'react';
import { Formik, Form, useField, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import Modal from '../Modal';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { getGrievance } from '../../pages/api/grievance';
import moment from 'moment';
import Input from '../ElevateFormControls/input';

const GrievanceReportWrapper = styled.ul`
  li {
    display: flex;
    justify-content: center;
    padding: 12px;
    div {
      margin: 0 10px;
      width: 50%;
      text-align: center;
    }
    &:nth-child(odd) {
      background: #f8f8fc;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    padding: '19px',
    width: '100%',
    marginLeft: '0',
    color: 'white',
    background: 'linear-gradient(to right, #ef6e56 0%, #f52b06 100%)',
  },
  lineSeperater: {
    backgroundColor: '#f52e0a',
    height: '2px',
    width: '78%',
    margin: 'auto',
  },
}));

const GrievanceStatus = () => {
  const classes = useStyles();
  const [name, setName] = useState('ticketNumber');
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [show, setShow] = useState(false);
  const handleClick = (showError) => {
    if (showError?.ticketNumber?.length < 1) {
      setShow(false);
    }
  };
  return (
    <>
      <Formik
        initialValues={{
          ticketNumber: '',
        }}
        validationSchema={Yup.object({
          ticketNumber: Yup.string().required('Ticket Number is required'),
        })}
        validateOnBlur
        onSubmit={async (values, { resetForm }) => {
          setShow(false);
          await getGrievance(values.ticketNumber)
            .then(async (res) => {
              setShow(false);
              setShowModal(true);
              await setModalData(res.data.data);
              resetForm();
            })
            .catch((e) => {
              setShowModal(false);
              setShow(true);
            });
        }}
      >
        {({ formik, values }) => (
          <Form>
            <Grid container>
              <Grid item xs={12}>
                <Input
                  required
                  name="ticketNumber"
                  label="Ticket Number"
                  placeholder="Enter ticket number here"
                  labelKN="ಚೀಟಿ ಸಂಖ್ಯೆ"
                  setShow={setShow}
                  checkStatus="grievance"
                />
                {show && (
                  <Grid item xs={12}>
                    <div
                      style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        margin: '11px 4px',
                        color: '#f52a04',
                      }}
                    >
                      Invalid Ticket Number. Please Enter a Valid Ticket Number.
                    </div>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Button type="submit" className={classes.button}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            {/* <pre>{JSON.stringify(formik, null, 2)}</pre> */}
          </Form>
        )}
      </Formik>
      <Modal onClose={() => setShowModal(false)} show={showModal}>
        <Grid container>
          <Grid item xs={12}>
            <Typography component="h1" variant="h4" align="center">
              Grievance Report
            </Typography>
            <div style={{ padding: '30px 0px' }}>
              <hr className={classes.lineSeperater} />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div>
              <GrievanceReportWrapper>
                <li>
                  <div>Ticket Number</div>
                  <div>{modalData?.ticketNumber}</div>
                </li>
                <li>
                  <div>Submit Date</div>
                  <div>{moment(modalData?.createdAt).format('DD/MM/YYYY')}</div>
                </li>
                <li>
                  <div>Status</div>
                  <div>{modalData?.status}</div>
                </li>
                <li>
                  <div>Remarks</div>
                  <div>{modalData?.remarks}</div>
                </li>
              </GrievanceReportWrapper>
            </div>
          </Grid>
          <ButtonWrapper>
            <button onClick={() => setShowModal(false)} className="theme-btn">
              OK
            </button>
          </ButtonWrapper>
        </Grid>
      </Modal>
    </>
  );
};

export default GrievanceStatus;

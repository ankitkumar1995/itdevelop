import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import GrievanceStatus from '../components/GrievanceForms/GrievanceStatus';
import Link from 'next/link';
import { getGrievance } from './api/grievance';
import { getSession } from 'next-auth/client';

const useStyles = makeStyles((theme) => ({
  rootBg: {
    background: '#F8F8FC',
  },
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },

  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [theme.breakpoints.up(992 + theme.spacing(2) * 2)]: {
      width: 850,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    boxShadow: 'none',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: '40px 100px 40px 100px',
    },
  },
  lineSeperater: {
    backgroundColor: '#f52e0a',
    height: '2px',
    width: '78%',
    margin: 'auto',
  },
  copyContent: {
    textAlign: 'center',
    linkColor: {
      color: 'red',
    },
  },
}));

const CheckGrievanceStatus = () => {
  const classes = useStyles();

  useEffect(() => {
    getGrievance('60e19c9eedb2651f44d016')
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return e;
      });
  }, []);

  return (
    <div className={classes.rootBg}>
      <Header
        headerClass="contact"
        headerMenu="contact_us"
        style={{ background: 'white' }}
      />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Check Grievance Status
          </Typography>
          <div style={{ padding: '30px 0px' }}>
            <hr className={classes.lineSeperater} />
          </div>
          <GrievanceStatus />
          <div style={{ padding: '30px 0px' }}>
            <hr className={classes.lineSeperater} />
          </div>
          <div className={classes.copyContent}>
            <p>
              Want to Raise a Grievance?{' '}
              <Link
                href="/raise-grievance"
                className={classes.copyContent.linkColor}
              >
                Click Here
              </Link>
            </p>
          </div>
        </Paper>
      </main>
      <Footer />
    </div>
  );
};

export default CheckGrievanceStatus;
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  return {
    props: { session },
  };
}

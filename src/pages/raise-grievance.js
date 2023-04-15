import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import RaiseGrievanceForm from '../components/GrievanceForms/RaiseGrievanceForm';
import Link from 'next/link';
import { getSession } from 'next-auth/client';
import { BASE_URL } from './api/url';
import { getGrievanceDetai } from '../lib/api';
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

const RaiseGrievance = ({ session, registerData, wpdata }) => {
  const classes = useStyles();
  const { bottomDescription, image, topDescription } =
    wpdata?.page?.raiseGrievance;
  return (
    <div className={classes.rootBg}>
      <Header
        headerClass="contact"
        headerMenu="contact_us"
        style={{ background: 'white' }}
      />
      <div
        style={{
          backgroundImage: `url(${image?.sourceUrl})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '287px',
        }}
      />
      <div
        dangerouslySetInnerHTML={{ __html: topDescription }}
        className="raise-grievance-top"
      />
      <div className="raise-grievance-faqs">
        <Link href={'/faqs'}>Click here for FAQs of grievance</Link>
      </div>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Raise a Grievance
          </Typography>
          <div style={{ padding: '30px 0px' }}>
            <hr className={classes.lineSeperater} />
          </div>
          <RaiseGrievanceForm
            user={session?.user}
            loginType={session?.loginType}
            session={session}
            registerData={registerData}
          />
          <div style={{ padding: '30px 0px' }}>
            <hr className={classes.lineSeperater} />
          </div>
          <div className={classes.copyContent}>
            <p>
              Already Raised a Grievance?{' '}
              <Link
                href="/check-grievance-status"
                className={classes.copyContent.linkColor}
              >
                <a style={{ color: '#EE6F57' }}>Track Here</a>
              </Link>
            </p>
          </div>
        </Paper>
      </main>

      <div
        dangerouslySetInnerHTML={{ __html: bottomDescription }}
        className="raise-grievance-bottom"
      />
      <Footer />
    </div>
  );
};

export default RaiseGrievance;
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  const wpdata = await getGrievanceDetai();
  const response = await fetch(`${BASE_URL}/api/v1/startup/${session?.id}`, {
    headers: { Authorization: 'Bearer ' + session?.accessToken },
  });

  const registerData = await response.json();
  return {
    props: { session, registerData, wpdata },
  };
}

import { getSession } from 'next-auth/client';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import ResetPasswordForm from '../components/forms/AuthForms/ResetPassword';
import { useRouter } from 'next/router';

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

const ResetPassword = (props) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let urlParams = new URLSearchParams(window.location.search);
      let params = Object.fromEntries(urlParams.entries());
    }
  }, []);
  const classes = useStyles();
  const { query } = useRouter();
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
            Reset your Password
          </Typography>
          <div style={{ padding: '30px 0px' }}>
            <hr className={classes.lineSeperater} />
          </div>
          <ResetPasswordForm query={query} />
          <div style={{ padding: '30px 0px' }}>
            <hr className={classes.lineSeperater} />
          </div>
        </Paper>
      </main>
      <Footer data={props.footerData} />
    </div>
  );
};
export default ResetPassword;
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

import { getSession } from 'next-auth/client';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Link from 'next/link';
import LoginForm from '../components/forms/AuthForms/LoginForm';
import { Button } from '@material-ui/core';
import { RingLoader } from 'react-spinners';
import { useRouter } from 'next/router';
import Loader from '../components/loader/loader';
import { pageLoadingVal } from '../components/forms/AuthForms/LoginForm';
const useStyles = makeStyles((theme) => ({
  stepperloader: {
    width: '100%',
    textAlign: 'center',
    left: '-2%',
    top: '40%',
    textAlign: 'center',
    position: 'absolute',
  },
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
  loginStartupIndiaWrap: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    marginTop: theme.spacing(6),
    marginLeft: theme.spacing(1),
    padding: '19px',
    width: '100%',
    marginLeft: '0',
    color: 'white',
    background: 'linear-gradient(to right, #ef6e56 0%, #f52b06 100%)',
  },
}));

const login = ({ session, prevUrl }) => {
  const classes = useStyles();
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(pageLoadingVal.val);
  useEffect(() => {
    const handleStart = () => {
      setPageLoading(pageLoadingVal.val);
    };
    const handleComplete = () => {
      setPageLoading(pageLoadingVal.val);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);
  // const [loader, setloader] = useState(false);
  // useEffect(() => {
  //   if (session) {
  //     setloader(true);
  //   } else {
  //     setloader(false);
  //   }
  // }, [session]);

  return (
    <>
      {pageLoading ? (
        <Loader text={'Loading...'} />
      ) : (
        <div className={classes.rootBg}>
          <Header
            headerClass="contact"
            headerMenu="contact_us"
            style={{ background: 'white' }}
          />
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Typography
                component="h1"
                variant="h4"
                align="center"
                className="sign-up-form-heading"
              >
                Login to Startup Karnataka
              </Typography>
              <div style={{ padding: '30px 0px' }}>
                <hr className={classes.lineSeperater} />
              </div>
              <LoginForm
                session={session}
                prevUrl={prevUrl}
                setPageLoading={setPageLoading}
              />
              <div style={{ padding: '30px 0px' }}>
                <hr className={classes.lineSeperater} />
              </div>
              <div className={classes.loginStartupIndiaWrap}>
                Or Login with
                <img src="/assets/img/startup-india.png" alt="startup-India" />
              </div>
              <Button className={'oauth-login ' + classes.button}>
                Login with Startup India
              </Button>
              <div style={{ padding: '30px 0px' }}>
                <hr className={classes.lineSeperater} />
              </div>
              <div className={classes.copyContent}>
                <p>
                  Want to Raise a Grievance?{' '}
                  <Link href="/" className={classes.copyContent.linkColor}>
                    Click Here
                  </Link>
                </p>
              </div>
            </Paper>
          </main>
          <Footer />
        </div>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  const prevUrl =
    context && context.req && context.req.headers && context.req.headers.referer
      ? context.req.headers.referer
      : null;
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
    props: {
      session,
      prevUrl,
    },
  };
}

export default login;

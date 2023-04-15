import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Header from '../../components/header/Header';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Footer from '../../components/footer/Footer';
import Startup from '../../components/SignUpForms/Startup';
import InvestorForm from '../../components/SignUpForms/Investor';
import IncubatorForm from '../../components/SignUpForms/Incubator';
import MentorForm from '../../components/SignUpForms/Mentor';
import PartnerSignUpForm from '../../components/SignUpForms/Partner';
import { getSession } from 'next-auth/client';
const useStyles = makeStyles((theme) => ({
  ///for tabs
  rootBg: {
    background: '#F8F8FC',
  },
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  activeTabss: {
    paddingLeft: '20px',
    '& .MuiTab-wrapper': {
      color: 'black',
      fontWeight: 600,
    },
    '&:active': {
      outline: 'none',
    },
    '& .Mui-selected': {
      outline: 'none',
      background: 'linear-gradient(to right, #ef6e56 0%, #f52b06 100%)',
      borderRadius: '25px',
      padding: '15px 0px',
      ['@media (max-width:465px)']: {
        padding: '0px 15px',
      },
    },
    '& .Mui-selected .MuiTab-wrapper': {
      color: 'white',
    },
  },

  tabsColor: {
    paddingTop: '50px',
    paddingBottom: '15px',
    backgroundColor: 'white',
    boxShadow: 'none',
  },
  ////

  appBar: {
    position: 'relative',
  },
  copyContent: {
    textAlign: 'center',
    linkColor: {
      color: 'red',
    },
  },
  lineSeperater: {
    backgroundColor: '#f52e0a',
    height: '2px',
    width: '78%',
    margin: 'auto',
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

  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  bgDark: {
    backgroundColor: 'black',
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const SignUp = () => {
  const classes = useStyles();
  const [tabValueStep, setTabValueStep] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTabValueStep(newValue);
  };

  return (
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
            Sign-up for Startup Karnataka
          </Typography>
          <div className={classes.root}>
            <AppBar
              position="static"
              color="default"
              className={classes.tabsColor}
            >
              <Tabs
                value={tabValueStep}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="on"
                indicatorColor="none"
                className={classes.activeTabss}
                textColor="primary"
                aria-label="scrollable force tabs example"
              >
                <Tab label="Startup" {...a11yProps(0)} />

                <Tab label="Investor" {...a11yProps(1)} />
                <Tab label="Incubator" {...a11yProps(2)} />
                <Tab label="Mentor" {...a11yProps(3)} />
                <Tab label="Partner" {...a11yProps(4)} />
              </Tabs>
            </AppBar>
            <div style={{ padding: '30px 0px' }}>
              <hr
                style={{
                  backgroundColor: '#f52e0a',
                  height: '2px',
                  width: '78%',
                  margin: 'auto',
                }}
              />
            </div>
            <TabPanel value={tabValueStep} index={0}>
              <Startup />
            </TabPanel>
            <TabPanel value={tabValueStep} index={1}>
              <InvestorForm />
            </TabPanel>
            <TabPanel value={tabValueStep} index={2}>
              <IncubatorForm />
            </TabPanel>
            <TabPanel value={tabValueStep} index={3}>
              <MentorForm />
            </TabPanel>
            <TabPanel value={tabValueStep} index={4}>
              <PartnerSignUpForm />
            </TabPanel>
          </div>
          <div style={{ padding: '30px 0px' }}>
            <hr className={classes.lineSeperater} />
          </div>
          <div className={classes.copyContent}>
            <p>
              <b>Already a member?</b>{' '}
              <a href="/login" className={classes.copyContent.linkColor}>
                <a style={{ color: '#ef6e56' }}>Sign in</a>
              </a>
            </p>
          </div>
        </Paper>
      </main>
      <Footer />
    </div>
  );
};

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

export default SignUp;

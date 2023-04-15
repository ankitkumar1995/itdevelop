import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { RingLoader } from 'react-spinners';
import { makeStyles } from '@material-ui/core/styles';
import { signIn, getSession } from 'next-auth/client';
import Cookies from 'js-cookie';
import { BASE_URL } from './api/url';

const useStyles = makeStyles((theme) => ({
  stepperloader: {
    width: '100%',
    textAlign: 'center',
    left: '-2%',
    top: '40%',
    textAlign: 'center',
    position: 'absolute',
  },
}));

const startupindia = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const [loader, setloader] = useState(false);

  const checkingdata = async () => {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var checkValue = url.searchParams.get('auth_token');
    const session = await getSession();
    // const testing = {status:"success",message:"Success",data:{_id:"61102c08def59e51e4aa6b5b",name:"BLECAN INNOVATIONS PRIVATE LIMITED",email:"rishabh@poispay.com",password:"",primaryRole:"user",roles:["user"],applicationId:"61102c09def59e51e4aa6b5c",status:1,Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQkxFQ0FOIElOTk9WQVRJT05TIFBSSVZBVEUgTElNSVRFRCIsInByaW1hcnlSb2xlIjoidXNlciIsInJvbGVzIjpbInVzZXIiXSwiX2lkIjoiNjExMDJjMDhkZWY1OWU1MWU0YWE2YjViIiwiZW1haWwiOiJyaXNoYWJoQHBvaXNwYXkuY29tIiwiaWF0IjoxNjMwMTc3NDUzLCJleHAiOjE2MzA1Mzc0NTN9.ys_MfQs8QP-lJBFKrqUfwmjYTRd9KnM_DGePUHylRl4"}}

    const fetchApivalue = await axios
      .get(`${BASE_URL}/api/v1/auth/startupindia`, {
        headers: { Authorization: 'Bearer ' + checkValue },
      })
      .then(async (response) => {
        // do stuff
        if (response.status === 200) {
          //setloader(false)
          Cookies.set('token', response.data.data.Authorization);

          const result = await signIn('credentials', {
            redirect: false,
            Authorization: response.data.data.Authorization,
            email: response.data.data.email,
            name: response.data.data.name,
            password: '',
            primaryRole: response.data.data.primaryRole,
            roles: response.data.data.roles,
            status: response.data.data.status,
            loginType: response.data.data.loginType,
            _id: response.data.data._id,
          });
          if (result) {
            router.push('/');
          }
        } else {
          setloader(false);
        }
      })
      .catch((err) => {
        setloader(false);
        //router.push('/login');
      });
  };

  useEffect(() => {
    setloader(true);
    checkingdata();
  }, []);

  return (
    <div>
      {loader ? (
        <div className="loader_center">
          <div className={classes.stepperloader}>
            <RingLoader loading={loader} size={60} color="#f43714" />
          </div>
          <h4
            style={{
              marginTop: '16%',
              marginLeft: 'auto',
              marginRight: 'auto',
              textAlign: 'center',
            }}
          >
            Please Wait,Loading...
          </h4>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default startupindia;

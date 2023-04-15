import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import { getContactus, getContactusKN } from '../lib/api';
import ContactusOffice from '../components/Cards/ContactusOffice';
import { useRouter } from 'next/router';
import { slugify } from '../utils/slugify';
import ContactusForm from '../components/ContactusForm';

const Contact = ({ wpdata, wpdataKN }) => {
  const [path, setPath] = useState('en');
  const [tdata, setTData] = useState(wpdata);
  const handleData = () => {
    if (router.asPath === '/contactus?en') {
      setTData(wpdataKN);
      setPath('kn');
    } else {
      setTData(wpdata);
      setPath('en');
    }
  };
  const router = useRouter();
  useEffect(() => {
    router.push(`${router.pathname}?${slugify(path)}`, undefined, {
      shallow: true,
    });
  }, [path]);
  // useEffect(() => {
  //   router.push(`localhost:3000/contactus?${path}`, undefined, {
  //     shallow: true,
  //   });
  // }, []);

  const { tollBar, officeLocations } = tdata;
  return (
    <div>
      <Header
        handleChange={handleData}
        path={path}
        headerClass="contact"
        headerMenu="contact_us"
      />

      <div
        className="toll-bar-area"
        style={{ backgroundImage: `url(assets/img/contact/t-bg.png)` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="toll-bar-fl">
                <div className="tol-bar-contacnt">
                  <h3>{tollBar.title}</h3>
                  <a href="#ourOffices" className="theme-btn">
                    {tollBar.subTitle}
                  </a>
                </div>
                <div className="toll-btn">
                  {tollBar.tollButton.map((item, index) => (
                    <a href="#">
                      <img src={item.image.sourceUrl} alt="" />
                      {item.contactNumber}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-area">
        <div className="container">
          <div className="contact-form">
            <div className="contact-title">
              <h3>Contact Form</h3>
            </div>
            <ContactusForm />
          </div>
        </div>
      </div>

      <div className="office-area k-startup-cell" id="ourOffices">
        <div className="container" style={{ maxWidth: '1140px' }}>
          <div className="row">
            <div className="col-lg-12">
              <div className="office-title">
                <span>{officeLocations.title}</span>
                <h3>{officeLocations.subTitle}</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="office-fl">
                <ContactusOffice data={officeLocations} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
export const getServerSideProps = async (context) => {
  const wpdata = await getContactus();
  const wpdataKN = await getContactusKN();
  return {
    props: {
      wpdata: wpdata.page.contactus,
      wpdataKN: wpdataKN.page.contactus,
    },
  };
};

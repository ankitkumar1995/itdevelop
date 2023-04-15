import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import PageMenu from './PageMenu';
import { signOut, useSession } from 'next-auth/client';
import { Link } from '@material-ui/core';
import MobileHeader from './MobileHeader';
import { ToastContainer } from 'react-toastify';
import { getAllCalls } from '../../pages/api/api';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { BASE_URL } from '../../pages/api/url';
import MobileSideBar from './MobileSideBar';
import WidgetHeader from './WidgetHeader';
import AppContext from '../../AppContext';

const Header = (props) => {
  const handleSignout = (e) => {
    e.preventDefault();
    signOut({ redirect: false });
  };
  const value = useContext(AppContext);
  const [session, loading] = useSession();
  console.log(session, 'header');
  const isUser = !!session?.user;
  const isStartupIndiaUSer = !!session?.data;
  const [layoutData, setLayoutData] = useState(value?.state?.headerData?.data);
  const [stickyClass, setStickyClass] = useState('d-flex align-items-center');
  const [sticky, setSticky] = useState(false);
  const [fullpageshow, setFullpageshow] = useState(false);
  const [fullpageMobileshow, setFullpageMobileshow] = useState(false);
  const [showclass, setShowclass] = useState('full_page_menu');
  const [showMobileclass, setShowMobileclass] = useState('full_page_menu');
  const [calls, setCalls] = useState(null);
  const [activeCall, setActiveCall] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [registerRes, setRegisterRes] = useState('');
  const [mobileSideBarOpen, setMobileSideBarOpen] = useState(false);
  const onMobileSideBarClose = () => {
    setMobileSideBarOpen(false);
  };
  const onMobileSideBarOpen = () => {
    setMobileSideBarOpen(true);
  };
  useEffect(() => {
    if (props.path === 'kn') {
      setLayoutData(value?.state?.headerDataKN?.data);
    } else if (props.path === 'en') {
      setLayoutData(value?.state?.headerData?.data);
    } else {
      setLayoutData(value?.state?.headerData?.data);
    }
  }, [props?.path]);
  useEffect(() => {
    if (session) {
      getRegisterData();
    }
  }, [session]);
  const getRegisterData = async () => {
    if (session?.loginType === 'Startup') {
      await axios
        .get(`${BASE_URL}/api/v1/startup/${session.id}`, {
          headers: { Authorization: 'Bearer ' + session.accessToken },
        })
        .then((res) => {
          const registerData = res.data;
          setRegisterRes(registerData);
        })
        .catch((error) => console.error('error', +{ error }));
    } else if (session?.loginType === 'Mentor') {
      await axios
        .get(`${BASE_URL}/api/v1/mentor/${session.id}`, {
          headers: { Authorization: 'Bearer ' + session.accessToken },
        })
        .then((res) => {
          const registerData = res.data;
          setRegisterRes(registerData);
        })
        .catch((error) => console.error('error', +{ error }));
    } else if (session?.loginType === 'Investor') {
      await axios
        .get(`${BASE_URL}/api/v1/investor/${session.id}`, {
          headers: { Authorization: 'Bearer ' + session.accessToken },
        })
        .then((res) => {
          const registerData = res.data;
          setRegisterRes(registerData);
        })
        .catch((error) => console.error('error', +{ error }));
    } else if (session?.loginType === 'Incubator') {
      await axios
        .get(`${BASE_URL}/api/v1/incubator/${session.id}`, {
          headers: { Authorization: 'Bearer ' + session.accessToken },
        })
        .then((res) => {
          const registerData = res.data;
          setRegisterRes(registerData);
        })
        .catch((error) => console.error('error', +{ error }));
    } else if (session?.loginType === 'Partner') {
      await axios
        .get(`${BASE_URL}/api/v1/partner/${session.id}`, {
          headers: { Authorization: 'Bearer ' + session.accessToken },
        })
        .then((res) => {
          const registerData = res.data;
          setRegisterRes(registerData);
        })
        .catch((error) => console.error('error', +{ error }));
    }
  };

  useEffect(async () => {
    if (window !== 'undefined') {
      const allCalls = await getAllCalls();
      const activeCallData = allCalls?.callsData?.filter(
        (call) => call.status === 'active'
      )?.[0];
      const remainingCallData = allCalls?.callsData?.filter(
        (call) => call.status === 'disabled'
      );
      setCalls(remainingCallData);
      setActiveCall(activeCallData);
    }
  }, [getAllCalls]);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        setStickyClass('d-flex align-items-center sticky');
        setSticky(true);
      } else {
        setStickyClass('d-flex align-items-center');
        setSticky(false);
      }
    });
  }, []);
  useEffect(() => {
    if (fullpageshow) {
      setShowclass('full_page_menu show');
    } else {
      setShowclass('full_page_menu');
    }
  }, [fullpageshow]);

  useEffect(() => {
    if (fullpageMobileshow) {
      setShowMobileclass('full_page_menu show');
    } else {
      setShowMobileclass('full_page_menu');
    }
  }, [fullpageMobileshow]);
  const { pageLogoAndPdf } = layoutData?.page;
  // const { menus } = layoutData;
  const { startupKit, fundingAndProgram, network, resources } =
    pageLogoAndPdf?.headerMenuImages;
  const { headerLogo, megaMenu, header } = pageLogoAndPdf;
  return (
    <div className={`header-area ${stickyClass} ${props.headerClass}`}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="header-fl">
              {sticky ||
              props.headerClass == 'contact' ||
              props.headerClass == 'contact elevate' ? (
                <div className="header-logo">
                  <div className="k-logo">
                    <a href="https://itbtst.karnataka.gov.in/" target="_blank">
                      <img src={headerLogo[2]?.logo?.sourceUrl} alt="" />
                    </a>
                  </div>
                  <div className="vl"></div>
                  <div className="s-logo">
                    <a href="/">
                      <img
                        src={headerLogo[3]?.logo?.sourceUrl}
                        alt=""
                        className="ms-5"
                      />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="header-logo">
                  <div className="k-logo">
                    <a href="https://itbtst.karnataka.gov.in/" target="_blank">
                      <img src={headerLogo[0]?.logo?.sourceUrl} alt="" />
                    </a>
                  </div>
                  <div className="vl"></div>
                  <div className="s-logo">
                    <a href="/">
                      <img
                        src={headerLogo[1]?.logo?.sourceUrl}
                        alt=""
                        className="ms-5"
                      />
                    </a>
                  </div>
                </div>
              )}

              <div className="header-bar ttry navbar-hamburger-wrapper">
                <div
                  className="lang-icon rectangle kanada-lang-icon"
                  onClick={props.handleChange}
                >
                  {props.path == 'kn' ? <a href="#">E</a> : <a href="#">ಕ</a>}
                </div>
                <div onClick={onMobileSideBarOpen} className="header-hamburger">
                  <a href="#">
                    <i className="fas fa-bars"></i>
                  </a>
                </div>
                <div className="navbar-hamburger-1">
                  <a href="#">
                    <img
                      src="/assets/img/bar.png"
                      alt=""
                      onClick={() => setFullpageshow(!fullpageshow)}
                    />
                  </a>
                </div>
              </div>
              <div className="header-bar ttry" style={{ display: 'none' }}>
                <a href="#">
                  <img
                    src="/assets/img/bar.png"
                    alt=""
                    onClick={() => setFullpageMobileshow(!fullpageMobileshow)}
                  />
                </a>
              </div>

              <MobileSideBar
                onClose={onMobileSideBarClose}
                isOpen={mobileSideBarOpen}
                calls={calls}
                showAll={showAll}
                onClickShowAll={() => setShowAll(!showAll)}
                isUser={isUser}
                session={session}
                handleSignout={handleSignout}
                activeCall={activeCall}
                handleChange={props.handleChange}
                path={props.path}
              />
              <div className={`header-menu ${props.headerMenu}`}>
                <ul className={props.path === 'kn' ? 'header-kn' : 'header-en'}>
                  <li>
                    <a href="#" className="nav-item-icon">
                      {header[0]?.label} <i className="fas fa-angle-down"></i>
                    </a>
                    <div className="submenu submenufirst">
                      <div className="subfx">
                        {
                          <WidgetHeader
                            label={header[0].label}
                            data={header[0].navItems}
                          />
                        }
                        <div className="sub-image-fx">
                          <div className="image-wp">
                            <div className="single-sub-img">
                              <img src={startupKit?.image?.sourceUrl} alt="" />
                            </div>
                            <div className="sub-content">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: startupKit?.text,
                                }}
                              />
                            </div>
                            <div className="sub-btn">
                              <a
                                href={
                                  startupKit?.downloadLink?.pdf?.mediaItemUrl
                                }
                                //href="assets/Startup_Policy_Karnataka.pdf"
                                target="_blank"
                                style={{
                                  color: '#fff',
                                }}
                              >
                                {startupKit?.downloadLink?.text}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="webi">
                        <p>
                          HELP +91-80-22231007{' '}
                          <i className="far fa-envelope fa-lg"></i>{' '}
                          startupcell@karnataka.gov.in
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <a href="#" className="nav-item-icon">
                      {header[1].label}
                      <i className="fas fa-angle-down"></i>
                    </a>
                    <div
                      className="submenu submenufirst"
                      tabIndex="0"
                      onMouseLeave={() => setShowAll(false)}
                    >
                      <div className="subfx">
                        {props.path === 'kn' ? (
                          <div className="sub-fx-menu">
                            <div className="single-sub">
                              <div className="su-ti">
                                <a
                                  href="/funding"
                                  style={{ cursor: 'pointer' }}
                                >
                                  <p>ಆರಂಭಿಕ ನಿಧಿ</p>
                                </a>
                              </div>
                              <div className="sub-list">
                                <ul>
                                  <li>
                                    <a href="/vriddhi-scheme">ವೃದ್ಧಿ ಯೋಜನೆ</a>
                                  </li>
                                  <li>
                                    <a href="/elevate-women">
                                      ಎಲಿವೇಟ್‌ ವಿಮೆನ್‌
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <div className="single-sub">
                              <div className="su-ti">
                                <p>ಸವಾಲುಗಳು</p>
                              </div>
                              <div className="sub-list">
                                <ul>
                                  <li>
                                    <a href="/grandchallenge">
                                      ಗ್ರ್ಯಾಂಡ್ ಚಾಲೆಂಜ್
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="/gck-previous-calls"
                                      style={{ cursor: 'pointer' }}
                                    >
                                      GCK Previous Calls
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="su-ti">
                                <p>ಇತರೆ ಸವಾಲುಗಳು</p>
                              </div>
                              <div className="sub-list">
                                <ul>
                                  <li>
                                    <a
                                      href={
                                        fundingAndProgram?.combatChallenge?.pdf
                                          ?.mediaItemUrl
                                      }
                                      target={'_blank'}
                                    >
                                      ಕೋವಿಡ್-19 ಸವಾಲನ್ನು ಎದುರಿಸಿ
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="su-ti">
                                <a
                                  href="/idea2Poc"
                                  style={{ cursor: 'pointer' }}
                                >
                                  <p>ಐಡಿಯಾ2ಪಿಓಸಿ(ಎಲಿವೇಟ್)</p>
                                </a>
                              </div>
                              <div className="sub-list">
                                <ul>
                                  {!calls ? (
                                    <li> Fetching Calls</li>
                                  ) : calls.length === 0 ? (
                                    <li> Calls Data not available</li>
                                  ) : (
                                    (showAll ? calls : calls.slice(0, 6)).map(
                                      (call) => {
                                        return (
                                          <li key={call?._id}>
                                            <a href={call?.route || '#'}>
                                              {call?.name}
                                            </a>
                                          </li>
                                        );
                                      }
                                    )
                                  )}

                                  <li onClick={() => setShowAll(!showAll)}>
                                    <a href="#" style={{ color: '#ef6950' }}>
                                      {!showAll ? 'More...' : 'Less...'}
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="sub-fx-menu">
                            <div className="single-sub">
                              <div className="su-ti">
                                <a
                                  href="/funding"
                                  style={{ cursor: 'pointer' }}
                                >
                                  <p>Startup Funding</p>
                                </a>
                              </div>
                              <div className="sub-list">
                                <ul>
                                  <li>
                                    <a href="/vriddhi-scheme">Vriddhi Scheme</a>
                                  </li>
                                  <li>
                                    <a href="/elevate-women">Elevate Women</a>
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <div className="single-sub">
                              <div className="su-ti">
                                <p>Challenges</p>
                              </div>
                              <div className="sub-list">
                                <ul>
                                  <li>
                                    <a href="/grandchallenge">
                                      Grand Challenge
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="/gck-previous-calls"
                                      style={{ cursor: 'pointer' }}
                                    >
                                      GCK Previous Calls
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="su-ti">
                                <p>Other Challenges</p>
                              </div>
                              <div className="sub-list">
                                <ul>
                                  <li>
                                    <a
                                      href={
                                        fundingAndProgram?.combatChallenge?.pdf
                                          ?.mediaItemUrl
                                      }
                                      target={'_blank'}
                                    >
                                      Combat covid-19 Challenge
                                    </a>
                                  </li>
                                </ul>
                              </div>

                              <div className="su-ti">
                                <a
                                  href="/idea2Poc"
                                  style={{ cursor: 'pointer' }}
                                >
                                  <p>Idea2PoC (ELEVATE)</p>
                                </a>
                              </div>
                              <div className="sub-list">
                                <ul>
                                  {!calls ? (
                                    <li> Fetching Calls</li>
                                  ) : calls.length === 0 ? (
                                    <li> Calls Data not available</li>
                                  ) : (
                                    (showAll ? calls : calls.slice(0, 6)).map(
                                      (call) => {
                                        return (
                                          <li key={call?._id}>
                                            <a href={call?.route || '#'}>
                                              {call?.name}
                                            </a>
                                          </li>
                                        );
                                      }
                                    )
                                  )}

                                  <li onClick={() => setShowAll(!showAll)}>
                                    <a href="#" style={{ color: '#ef6950' }}>
                                      {!showAll ? 'More...' : 'Less...'}
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="sub-image-fx program">
                          <div className="image-wp">
                            <div className="single-sub-img">
                              <img
                                src="/assets/img/header/programs.png"
                                alt=""
                              />
                            </div>
                            <div className="sub-content">
                              <h5>{activeCall?.name}</h5>
                            </div>
                            {activeCall ? (
                              <div className="sub-btn">
                                <Link href={activeCall?.route || '#'}>
                                  <a>Know More</a>
                                </Link>
                              </div>
                            ) : (
                              ''
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="webi">
                        <p>
                          HELP +91-80-22231007{' '}
                          <i className="far fa-envelope fa-lg"></i>{' '}
                          startupcell@karnataka.gov.in
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <a href="#" className="nav-item-icon">
                      {header[2].label}
                      <i className="fas fa-angle-down"></i>
                    </a>
                    <div className="submenu submenu_new network">
                      <div className="subfx">
                        {
                          <WidgetHeader
                            label={header[2].label}
                            data={header[2].navItems}
                          />
                        }
                        <div className="sub-image-fx">
                          <div className="image-wp">
                            <div className="single-sub-img">
                              <img src={network?.image?.sourceUrl} alt="" />
                            </div>
                            <div className="sub-content">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: network?.text,
                                }}
                              />
                            </div>
                            <div className="sub-btn">
                              <a href={network?.btnLink?.url}>
                                {network?.btnLink?.title}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="webi">
                        <p>
                          HELP +91-80-22231007,{' '}
                          <i className="far fa-envelope fa-lg"></i>{' '}
                          startupcell@karnataka.gov.in
                        </p>
                      </div>
                    </div>
                  </li>

                  <li>
                    <a href="#" className="nav-item-icon">
                      {header[3].label}
                      <i className="fas fa-angle-down"></i>
                    </a>
                    <div className="submenu">
                      <div className="subfx">
                        {
                          <WidgetHeader
                            label={header[3].label}
                            data={header[3].navItems}
                          />
                        }
                        <div className="sub-image-fx">
                          <div className="image-wp">
                            <div className="single-sub-img">
                              <img src={resources?.image?.sourceUrl} alt="" />
                            </div>
                            <div className="sub-content">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: resources?.text,
                                }}
                              />
                            </div>
                            <div className="sub-btn">
                              <a href={resources?.btnLink?.url}>
                                {resources?.btnLink?.title}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="webi">
                        <p>
                          HELP +91-80-22231007{' '}
                          <i className="far fa-envelope fa-lg"></i>{' '}
                          startupcell@karnataka.gov.in
                        </p>
                      </div>
                    </div>
                  </li>
                  {isUser && (
                    <li className="user_login_name">
                      <div className="header-btn">
                        <a href="#" className="theme-btn">
                          {session?.user?.name}{' '}
                          <i className="fas fa-angle-down"></i>
                        </a>
                      </div>
                      <div className="submenu submenulast">
                        <div className="subfx">
                          <div className="sub-fx-menu">
                            <div className="single-sub">
                              <div className="su-ti">
                                <div className="reg__email">
                                  <p className="My_Acco">My Accounts:</p>
                                  <p
                                    className="email"
                                    style={{ wordBreak: 'break-word' }}
                                  >
                                    {session?.user?.email}
                                  </p>
                                </div>
                              </div>
                              <div className="sub-list">
                                <ul>
                                  {registerRes?.data?.certificateStatus ===
                                    'Generated' && (
                                    <>
                                      <li>
                                        <a href="/profile/edit">
                                          View & edit my profile
                                        </a>
                                      </li>
                                    </>
                                  )}
                                  {session?.loginType === 'Startup' &&
                                    registerRes?.data?.certificateStatus ===
                                      'Generated' && (
                                      <>
                                        <li>
                                          <a href="/booster-kit">
                                            Apply for booster kit
                                          </a>
                                        </li>
                                        <li>
                                          <a href="/incentive">
                                            Apply for incentives & reimbursments
                                          </a>
                                        </li>
                                      </>
                                    )}
                                  <li>
                                    <span
                                      className="log_outf"
                                      onClick={handleSignout}
                                    >
                                      Logout
                                    </span>
                                  </li>
                                  <ToastContainer />
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="sub-image-fx">
                            <div
                              className="image-wp register"
                              style={{ marginBottom: '20px' }}
                            >
                              {registerRes?.data?.appStatus === 'Draft' && (
                                <>
                                  <div className="single-sub-img register">
                                    <img
                                      src="/assets/img/header/Group.svg"
                                      alt=""
                                    />
                                  </div>
                                  <div className="sub-content register">
                                    <h5>
                                      Complete your
                                      <br />
                                      registration{' '}
                                    </h5>
                                  </div>
                                  <>
                                    {session.loginType === 'Startup' && (
                                      <div className="sub-btn">
                                        <Link href="/startup-registration">
                                          <a>Register</a>
                                        </Link>
                                      </div>
                                    )}
                                    {session.loginType === 'Mentor' && (
                                      <div className="sub-btn">
                                        <Link href="/mentor-registration">
                                          <a>Register</a>
                                        </Link>
                                      </div>
                                    )}
                                    {session.loginType === 'Incubator' && (
                                      <div className="sub-btn">
                                        <Link href="/incubator-registration">
                                          <a>Register</a>
                                        </Link>
                                      </div>
                                    )}
                                    {session.loginType === 'Investor' && (
                                      <div className="sub-btn">
                                        <Link href="/investor-registration">
                                          <a>Register</a>
                                        </Link>
                                      </div>
                                    )}
                                    {session.loginType === 'Partner' && (
                                      <div className="sub-btn">
                                        <Link href="/partner-registration">
                                          <a>Register</a>
                                        </Link>
                                      </div>
                                    )}
                                  </>
                                </>
                              )}
                              {registerRes?.data?.appStatus === 'Missing' &&
                                registerRes?.data?.appReviewWith?.userId ===
                                  registerRes?.data?.userId && (
                                  <>
                                    <div className="single-sub-img register">
                                      <img
                                        src="/assets/img/header/Group.svg"
                                        alt=""
                                      />
                                    </div>
                                    <div className="sub-content register">
                                      <h5>
                                        You have some missing
                                        <br />
                                        Information in
                                        <br />
                                        Step{' '}
                                      </h5>
                                    </div>
                                    <>
                                      {session.loginType === 'Startup' && (
                                        <div className="sub-btn missing">
                                          <Link href="/startup-registration">
                                            <a>Continue</a>
                                          </Link>
                                        </div>
                                      )}
                                      {session.loginType === 'Mentor' && (
                                        <div className="sub-btn missing">
                                          <Link href="/mentor-registration">
                                            <a>Continue</a>
                                          </Link>
                                        </div>
                                      )}
                                      {session.loginType === 'Incubator' && (
                                        <div className="sub-btn missing">
                                          <Link href="/incubator-registration">
                                            <a>Continue</a>
                                          </Link>
                                        </div>
                                      )}
                                      {session.loginType === 'Investor' && (
                                        <div className="sub-btn missing">
                                          <Link href="/investor-registration">
                                            <a>Continue</a>
                                          </Link>
                                        </div>
                                      )}
                                      {session.loginType === 'Partner' && (
                                        <div className="sub-btn missing">
                                          <Link href="/partner-registration">
                                            <a>Continue</a>
                                          </Link>
                                        </div>
                                      )}
                                    </>
                                  </>
                                )}

                              {registerRes?.data?.certificateStatus ===
                                'Generated' && (
                                <>
                                  <div className="single-sub-img register">
                                    <img
                                      src="/assets/img/header/certificate.svg"
                                      alt=""
                                    />
                                  </div>
                                  <div className="sub-content register">
                                    <h5>
                                      Your registration
                                      <br />
                                      certificate{' '}
                                    </h5>
                                  </div>
                                </>
                              )}
                              {registerRes?.data?.certificateStatus ===
                                'Rejected' &&
                                registerRes?.data?.appStatus !== 'Missing' && (
                                  <>
                                    <div className="sub-content register">
                                      <h5>
                                        Your application has been Rejected.
                                        <br />
                                        Please contact
                                        <br />
                                        Startup cell{' '}
                                      </h5>
                                    </div>
                                  </>
                                )}
                              {registerRes?.data?.appStatus === 'Pending' &&
                                registerRes?.data?.appReviewWith?.userId !==
                                  registerRes?.data?.userId && (
                                  <>
                                    <div className="single-sub-img register">
                                      <img
                                        src="/assets/img/header/certificate.svg"
                                        alt=""
                                      />
                                    </div>
                                    <div className="sub-content register">
                                      <h5>
                                        We are reviewing
                                        <br />
                                        your application{' '}
                                      </h5>
                                    </div>
                                  </>
                                )}
                              {registerRes?.data?.certificateStatus ===
                                'Generated' && (
                                <div className="sub-btn">
                                  <Link
                                    href="/download/certificate"
                                    target={'_blank'}
                                  >
                                    <a>Download</a>
                                  </Link>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="webi">
                          <p>
                            HELP +91-80-22231007
                            <i className="far fa-envelope fa-lg"></i>{' '}
                            startupcell@karnataka.gov.in
                          </p>
                        </div>
                      </div>
                    </li>
                  )}
                </ul>

                {!isUser && (
                  <div className="header-btn">
                    <a href="/sign-up" className="theme-btn">
                      Register/Login
                    </a>
                  </div>
                )}
                <div
                  className="lang-icon rectangle"
                  onClick={props.handleChange}
                >
                  {props.path == 'kn' ? <a href="#">E</a> : <a href="#">ಕ</a>}
                </div>
                <div className="header-bar">
                  <a href="#">
                    <img
                      src="/assets/img/bar.png"
                      alt=""
                      onClick={() => setFullpageshow(!fullpageshow)}
                    />
                  </a>
                </div>
                <div className="header-bar" style={{ display: 'none' }}>
                  <a href="#">
                    <img
                      src="/assets/img/bar.png"
                      alt=""
                      onClick={() => setFullpageMobileshow(!fullpageMobileshow)}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PageMenu
        showclass={showclass}
        setFullPageMenu={() => setFullpageshow(!fullpageshow)}
        megaMenuData={megaMenu}
        siteLogo={headerLogo?.[1]?.logo?.sourceUrl}
      />
      {/* <MobileHeader
        showMobileclass={showMobileclass}
        setFullPageMobileMenu={() => setFullpageMobileshow(!fullpageMobileshow)}
      /> */}
    </div>
  );
};
export default React.memo(Header);

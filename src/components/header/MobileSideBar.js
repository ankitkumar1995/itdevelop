import {
  Accordion,
  AccordionDetails,
  Drawer,
  AccordionSummary,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { Button, Link } from '@material-ui/core';
const MobileSideBar = ({
  isOpen,
  onClose,
  calls,
  showAll,
  onClickShowAll,
  isUser,
  session,
  handleSignout,
  activeCall,
  handleChange,
  path,
}) => {
  const handleLogOut = (e) => {
    handleSignout(e);
    onClose();
  };
  return (
    <Drawer
      anchor={'left'}
      open={isOpen}
      onClose={onClose}
      PaperProps={{ className: 'mobile-sidebar-drawer' }}
    >
      <div className="mobile-sidebar-icon-wrapper">
        <div>
          <div className="s-logo">
            <a href="/">
              <img src="/assets/img/site-logo.png" alt="" />
            </a>
          </div>
        </div>
        <div>
          <button onClick={onClose}>
            <a href="#" className="close_btn">
              ×
            </a>
          </button>
        </div>
      </div>
      <div className="mobile-sidebar-body">
        <Accordion>
          <AccordionSummary
            expandIcon={<i class="fas fa-chevron-down icon-color"></i>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Startup kit</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <div>
                <div className="startup-policy-div">
                  <div>Karnataka startup policy 2025</div>
                  <button className="startup-policy-download">
                    <a
                      href="assets/Startup_Policy_Karnataka.pdf"
                      target="_blank"
                    >
                      Download
                    </a>
                  </button>
                </div>
                <div>
                  <ul>
                    <li className="mobile-sidebar-subHeading">
                      <a href="#">Startup kit </a>
                    </li>
                    <li>
                      <a href="/startup-guide">Startup guide</a>
                    </li>
                    <li>
                      <a href="#">Booster kit</a>
                    </li>
                    <li>
                      <a href="/karnataka-startup-cell">
                        Karnataka startup cell
                      </a>
                    </li>
                    <li>
                      <a href="/innovation-hub/k-tech-hub">K-tech hub</a>
                    </li>
                    <li>
                      <a href="#">IP Facilitation centre</a>
                    </li>
                    <li>
                      <a href="#">Browse startups</a>
                    </li>
                    <li>
                      <a href="/edu-institutes">Academia</a>
                    </li>
                    <li className="color-more-text">
                      <a href="/policies" style={{ color: 'rgb(245, 43, 6)' }}>
                        Schemes & policies...
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<i class="fas fa-chevron-down icon-color"></i>}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Funding & Programs</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <div>
                <div className="startup-policy-div">
                  <div>{activeCall?.name}</div>
                  <button className="startup-policy-download">
                    {activeCall ? (
                      <div>
                        <Link href={activeCall?.route || '#'}>
                          <a
                            style={{
                              color: 'rgba(245, 43, 6, 1)',
                              fontWeight: '800',
                              fontFamily: 'Manrope',
                              cursor: 'pointer',
                            }}
                          >
                            Know More
                          </a>
                        </Link>
                      </div>
                    ) : (
                      ''
                    )}
                  </button>
                </div>
                <div>
                  <ul>
                    <li className="mobile-sidebar-subHeading">
                      <a href="#">Idea2Poc (ELEVATE)</a>
                    </li>
                    {!calls ? (
                      <li> Fetching Calls</li>
                    ) : calls.length === 0 ? (
                      <li> Calls Data not available</li>
                    ) : (
                      calls?.map((call) => {
                        return (
                          <li key={call?._id}>
                            <a
                              className="mobile-sidebar-call-name"
                              href={call?.route || '#'}
                            >
                              {call?.name}
                            </a>
                          </li>
                        );
                      })
                    )}
                    {/* //{' '}
                    <li onClick={onClickShowAll}>
                      //{' '}
                      <a href="#" style={{ color: '#ef6950' }}>
                        // {!showAll ? 'More...' : 'Less...'}
                        //{' '}
                      </a>
                      //{' '}
                    </li> */}
                    {/* <li>Elevate 2021</li>
                    <li>chandan</li>
                    <li>Elevate 2022</li>
                    <li className="color-more-text mobile-sidebar-mgbottom">
                      More...
                    </li> */}
                  </ul>
                </div>
                <div>
                  <ul>
                    <li className="mobile-sidebar-subHeading">
                      <a href="">Challenges</a>
                    </li>
                    <li className="mobile-sidebar-mgbottom">
                      <a href="/grandchallenge">Grand Challenge</a>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li className="mobile-sidebar-subHeading">
                      <a href="#">Other Challenges</a>
                    </li>
                    <li className="mobile-sidebar-mgbottom">
                      <a href="#">Combat covid-19 Challenge</a>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li className="mobile-sidebar-subHeading">
                      <a href="#">Funding</a>
                    </li>
                    <li>
                      <a href="/funding">Startup funding</a>
                    </li>
                  </ul>
                </div>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<i class="fas fa-chevron-down icon-color"></i>}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Network</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <div>
                <div className="startup-policy-div">
                  <div>
                    <a href="#">International Partnerships & global access</a>
                  </div>
                  <button className="startup-policy-download">
                    <a href="#">Know More</a>
                  </button>
                </div>
                <div>
                  <ul>
                    <li className="mobile-sidebar-subHeading">
                      <a href="#">By Roles </a>
                    </li>
                    <li>
                      <a href="/network/mentor">
                        Connect with Mentors ( 1300+ )
                      </a>
                    </li>
                    <li>
                      <a href="/network/startup">
                        Connect with Startups ( 9000+ )
                      </a>
                    </li>
                    <li>
                      <a href="/network/incubator">
                        Connect with Incubators ( 9000+ )
                      </a>
                    </li>
                    <li>
                      <a href="/network/investor">
                        Connect with Investors ( 9000+ )
                      </a>
                    </li>
                    <li className="mobile-sidebar-mgbottom">
                      <a href="/international-partnerships">
                        International partnerships
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li className="mobile-sidebar-subHeading">
                      <a href="#">By Industry </a>
                    </li>
                    <li>
                      <a href="#">Agri - tech industry </a>
                    </li>
                    <li>
                      <a href="#">Edu - tech industry </a>
                    </li>
                    <li>
                      <a href="#">Fin - tech industry </a>
                    </li>
                    <li>
                      <a href="#">Energy - tech industry </a>
                    </li>
                    <li>
                      <a href="#">Insurance - tech industry </a>
                    </li>
                    <li>
                      <a href="#">Bio - tech industry </a>
                    </li>
                    <li>
                      <a href="#">Automobile - tech industry</a>
                    </li>
                    <li className="color-more-text mobile-sidebar-mgbottom">
                      <a href="#">More…</a>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li className="mobile-sidebar-subHeading">
                      <a href="#">By Cities</a>
                    </li>
                    <li>
                      <a href="#">Bengaluru</a>
                    </li>
                    <li>
                      <a href="#">Belgaum</a>
                    </li>
                    <li>
                      <a href="#">Mysore</a>
                    </li>
                    <li>
                      <a href="#">Hubli</a>
                    </li>
                    <li>
                      <a href="#">Mangalore</a>
                    </li>
                    <li>
                      <a href="#">Shimoga</a>
                    </li>
                    <li>
                      <a href="#">Tumkur</a>
                    </li>
                    <li className="color-more-text">
                      <a href="#" style={{ color: 'rgb(245, 43, 6)' }}>
                        More…
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<i class="fas fa-chevron-down icon-color"></i>}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Resources</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <div>
                <div className="startup-policy-div">
                  <div>Attend trainings & webinars, by experts</div>
                  <button className="startup-policy-download">
                    <a href=""> View webinars</a>
                  </button>
                </div>
                <div>
                  <ul>
                    <li className="mobile-sidebar-subHeading">
                      <a href="#">Resources</a>
                    </li>
                    <li>
                      <a href="/resources">Resources Page</a>
                    </li>
                    <li>
                      <a href="/karnataka-startup-cell">
                        Karnataka Startup cell
                      </a>
                    </li>
                    <li>
                      <a href="#">Women Entrepreneurs</a>
                    </li>
                    <li>
                      <a href="/department">Institutional Support - Dept.</a>
                    </li>
                    <li>
                      <a href="/policies">Schemes & Policies </a>
                    </li>
                    <li>
                      <a href="#">News/Events/Gallery</a>
                    </li>
                    <li>
                      <a href="#">FAQ</a>
                    </li>
                    <li className="color-more-text">
                      <a href="#">Contact us...</a>
                    </li>
                  </ul>
                </div>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
        {isUser && (
          <Accordion>
            <AccordionSummary
              expandIcon={<i class="fas fa-chevron-down icon-color"></i>}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography style={{ color: 'rgb(245, 43, 6)' }}>
                {session?.user?.name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div>
                  <div className="startup-policy-div">
                    <div>Complete your registration</div>
                    <button className="startup-policy-download">
                      {session.loginType === 'Startup' && (
                        <div>
                          <Link href="/startup-registration">
                            <a>Register</a>
                          </Link>
                        </div>
                      )}
                      {session.loginType === 'Mentor' && (
                        <div>
                          <Link href="/mentor-registration">
                            <a>Register</a>
                          </Link>
                        </div>
                      )}
                      {session.loginType === 'Incubator' && (
                        <div>
                          <Link href="/incubator-registration">
                            <a>Register</a>
                          </Link>
                        </div>
                      )}
                      {session.loginType === 'Investor' && (
                        <div>
                          <Link href="/investor-registration">
                            <a>Register</a>
                          </Link>
                        </div>
                      )}
                      {session.loginType === 'Partner' && (
                        <div>
                          <Link href="/partner-registration">
                            <a>Register</a>
                          </Link>
                        </div>
                      )}
                    </button>
                  </div>
                  <div>
                    <ul>
                      <li className="mobile-sidebar-subHeading">
                        <a href="#">
                          My Accounts : <br />
                          {session?.user?.email}
                        </a>
                      </li>
                      <li>
                        <a href="/profile/edit">View & edit my profile</a>
                      </li>
                      <li>
                        <a href="#">Apply for incentives & reimbursments</a>
                      </li>
                      <li>
                        <a href="#">Apply for booster kit</a>
                      </li>
                      <li>
                        <a href="#">
                          Connects with mentos, investors & incubatrs
                        </a>
                      </li>
                      <li>
                        <a href="#">Funding cell (get activated if eligible)</a>
                      </li>
                      <li onClick={(e) => handleLogOut(e)}>
                        <a href="#" style={{ color: 'rgba(245, 43, 6, 1)' }}>
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
        )}
        <div className="mobile-sidebar-register-btn">
          {!isUser && (
            <div className="header-btn">
              <a href="/sign-up" className="theme-btn">
                Register/Login
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="mobile-sidebar-contact-information">
        <div>HELP +91-80-22231007, 080-22632626,</div>
        <p>
          <i className="far fa-envelope fa-lg"></i> startupcell@karnataka.gov.in
        </p>
      </div>
    </Drawer>
  );
};

export default MobileSideBar;

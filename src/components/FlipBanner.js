import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as ga from '../lib/ga';
import { Modal, ModalBody } from 'reactstrap';
import moment from 'moment';
import { useSession } from 'next-auth/client';
import { Button } from '@material-ui/core';
import MediaModal from './MediaModal';

const FlipBannner = (props) => {
  const [session, loading] = useSession();
  const [applyForm, setApplyForm] = useState(false);
  const [modelOpen, setmodelOpen] = useState(false);
  const [elevateId, setelevateId] = useState('');
  const [rejected, setRejected] = useState(false);
  const router = useRouter();
  const [message, setMessage] = useState();
  const [btnDisable, setBtnDisable] = useState(false);
  const [playerModal, setPlayerModal] = useState(false);
  const handleBtnClick = () => {
    router.events.on('routeChangeError', (e) => setBtnDisable(false));
    router.events.on('routeChangeStart', (e) => setBtnDisable(true));
    router.events.on('routeChangeComplete', (e) => setBtnDisable(false));
    // setTimeout(() => {
    //   setBtnDisable(false);
    // }, 20000);
    return () => {
      router.events.off('routeChangeError', (e) => setBtnDisable(false));
      router.events.off('routeChangeStart', (e) => setBtnDisable(false));
      router.events.off('routeChangeComplete', (e) => setBtnDisable(true));
    };
  };

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };

    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  useEffect(() => {
    if (session && session.loginType === 'Startup') {
      statusFunc();
      elevatebtncheck();
    }
  }, [props.eventStatus]);

  const statusFunc = async () => {
    let stageINdex = Object.keys(
      props?.eventStatus?.stages ? props?.eventStatus?.stages : ''
    );
    let stageString = `${'stage'}${stageINdex.length}`;
    let stageStringwin = `${'stage'}${stageINdex.length + 1}`;

    let stageStatus = props.eventStatus?.stages
      ? props.eventStatus.stages[stageString]['status']
      : '';
    let eleveateId = props?.eventStatus ? props?.eventStatus?.elevateID : '';

    if (
      props.eventStatus
        ? props.eventStatus.appStatus === 'rejected' &&
          stageStatus === 'rejected'
        : ''
    ) {
      setMessage(
        <div>
          We regret to inform you that your Application with
          <span style={{ color: '#ee6f57', fontWeight: 'bold' }}>
            {' '}
            {eleveateId}{' '}
          </span>
          has not been shortlisted for the{' '}
          <span style={{ color: '#ee6f57', fontWeight: 'bold' }}>
            {stageStringwin}
          </span>{' '}
        </div>
      );
    } else if (
      props.eventStatus ? props.eventStatus.appStatus === 'rejected' : ''
    ) {
      setMessage(
        <div>
          We regret to inform you that your Application with{' '}
          <span> {eleveateId} </span> has not been shortlisted for the next
          stage
        </div>
      );
    } else if (
      props.eventStatus
        ? props.eventStatus.appStatus === 'inProcess' &&
          stageStatus === 'approved'
        : ''
    ) {
      setMessage(
        <div>
          {' '}
          <span style={{ fontWeight: 'bold' }}>Congratulations</span>. Your
          Application with{' '}
          <span style={{ color: '#ee6f57' }}>{eleveateId}</span> has been
          shortlisted for the{' '}
          <span style={{ color: '#ee6f57' }}>{stageStringwin}</span>{' '}
        </div>
      );
    } else if (
      props.eventStatus
        ? props.eventStatus.appStatus === 'inProcess' &&
          stageStatus === 'rejected'
        : ''
    ) {
      setMessage(
        <div>
          We regret to inform you that your Application with{' '}
          <span style={{ color: '#ee6f57' }}> {eleveateId} </span>has not been
          shortlisted for the{' '}
          <span style={{ color: '#ee6f57' }}>{stageStringwin}</span>{' '}
        </div>
      );
    } else if (
      props.eventStatus
        ? props.eventStatus.appStatus === 'pending' &&
          stageStatus === 'rejected'
        : ''
    ) {
      setMessage(
        <div>
          We regret to inform you that your Application with
          <span style={{ color: '#ee6f57' }}> {eleveateId} </span>has not been
          shortlisted for the{' '}
          <span style={{ color: '#ee6f57' }}>{stageStringwin}</span>{' '}
        </div>
      );
    } else if (
      props.eventStatus
        ? props.eventStatus.appStatus === 'pending' &&
          stageStatus === 'approved'
        : ''
    ) {
      setMessage(
        <div>
          {' '}
          <span style={{ fontWeight: 'bold' }}>Congratulations</span>. Your
          Application with{' '}
          <span style={{ color: '#ee6f57' }}>{eleveateId}</span> has been
          shortlisted for the{' '}
          <span style={{ color: '#ee6f57' }}>{stageStringwin}</span>{' '}
        </div>
      );
    } else if (
      props.eventStatus ? props.eventStatus.appStatus === 'pending' : ''
    ) {
      setMessage(
        <div>
          Your Application with{' '}
          <span style={{ color: '#ee6f57' }}> {eleveateId} </span> is
          Successfully Submitted on{' '}
          <span>
            {moment(props.eventStatus.createdAt).format('DD/MM/YYYY')}
          </span>{' '}
          and is currently under further{' '}
          <span style={{ color: '#ee6f57' }}> verification / processing</span>{' '}
        </div>
      );
    } else if (
      props.eventStatus ? props.eventStatus.appStatus === 'inProcess' : ''
    ) {
      setMessage(
        <div>
          Your Application with{' '}
          <span style={{ color: '#ee6f57' }}> {eleveateId} </span> is
          Successfully Submitted on{' '}
          <span>
            {moment(props.eventStatus.createdAt).format('DD/MM/YYYY')}
          </span>{' '}
          and is currently under further{' '}
          <span style={{ color: '#ee6f57' }}> verification / processing</span>{' '}
        </div>
      );
    } else if (props.eventStatus === 'no-data') {
      setMessage(
        <div>"You haven't applied for Elevate 2021 / Elevate Unnati 2021"</div>
      );
    } else if (props.eventStatus === 'no-amritha-data') {
      setMessage(<div>"You haven't applied for Amrita 2021"</div>);
    }
  };

  const elevatebtncheck = () => {
    if (props.btnText == 'Apply now') {
      ga.event({
        action: 'Apply Now',
        params: {
          search_term: props.btnText,
        },
      });
    }
  };

  const handleClose = () => {
    setmodelOpen(false);
  };

  const handleStatusModel = () => {
    setmodelOpen(true);
  };

  return (
    <div
      className={`flip-area ${props.pageClass}`}
      style={
        props.darkBg
          ? {
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${
                props.bgImage.sourceUrl || props.bgImage
              })`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }
          : {
              backgroundImage: `url(${
                props.bgImage.sourceUrl || props.bgImage
              })`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }
      }
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {props.menu && (
              <div className={`flip-menu ${props.flipMenuClass}`}>
                <ul>
                  {props.flipMenu.map((item, index) => (
                    <li key={index}>
                      <a href={item.key ? item.key : '#'}>
                        {item.label ? item.label : item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className={`flip-fx ${props.classflip} ${props.classFlip}`}>
              <div className="flip-wrap">
                {props.investorIndividual && (
                  <div className="flip-img mobile">
                    <img src={props.image} alt="" />
                  </div>
                )}
                <div className={`flip-content ${props.classContent}`}>
                  {props.aboutus ? (
                    <>
                      <span dangerouslySetInnerHTML={{ __html: props.title }} />
                      <h2>{props.subTitle}</h2>
                    </>
                  ) : props.network ? (
                    <>
                      <div className="net-badge-title">
                        <h2 dangerouslySetInnerHTML={{ __html: props.title }} />
                        {props.hiring || props.rating ? (
                          <div className="badge-wrap">
                            {props.rating ? (
                              <div className="box-sty">
                                <img src="/assets/img/badge.svg" />
                                <span className="pr-1">Top 100, 2018</span>
                              </div>
                            ) : null}
                            {props.hiring ? (
                              <div className="box-noti">
                                <span className="pr-1">Now Hiring</span>
                              </div>
                            ) : null}
                          </div>
                        ) : null}
                      </div>

                      <p
                        dangerouslySetInnerHTML={{ __html: props.sub_title }}
                      />
                      {props.Id && <span>{props.id}</span>}
                    </>
                  ) : (
                    <>
                      <h2 dangerouslySetInnerHTML={{ __html: props.title }} />
                      <p dangerouslySetInnerHTML={{ __html: props.subTitle }} />
                      {props.Id && <span>{props.id}</span>}
                    </>
                  )}
                  {props.downloadBtn && (
                    <div
                      style={{
                        display: 'flex',
                      }}
                    >
                      <div className={`upload-btn ${props.custPdfBtnClass}`}>
                        <div className="upload__pdf">
                          <Link href={props.pdfUrl ? props.pdfUrl : '#'}>
                            <a
                              target="_blank"
                              className={`theme-btn ${props.acustPdfBtnClass}`}
                            >
                              {props?.downBtnText
                                ? props.downBtnText
                                : 'Download Pdf'}
                              <i
                                className="fas fa-arrow-right"
                                style={{ marginLeft: '10px' }}
                              ></i>
                            </a>
                          </Link>
                        </div>
                      </div>
                      {props.singleApplyBtn && (
                        <div className={`upload-btn ${props.custLinkBtnClass}`}>
                          <div className="upload__pdf">
                            <Link
                              href={
                                props.singleApplyBtnUrl
                                  ? props.singleApplyBtnUrl
                                  : '#'
                              }
                            >
                              <a className="theme-btn">
                                {props.singleApplyBtn}
                                <i
                                  className="fas fa-arrow-right"
                                  style={{ marginLeft: '10px' }}
                                ></i>
                              </a>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {props.registerBtn && (
                    <div class={`registar-btn ${props.eventClass}`}>
                      <a
                        href="#"
                        type="button"
                        data-toggle="modal"
                        data-target="#exampleModalCenter"
                      >
                        Register now
                      </a>
                    </div>
                  )}
                  {props.siglBtn && (
                    <div className={`header-btn eer ${props.singleBtnClass}`}>
                      <a href={'#grantsAndfund'} className="theme-btn">
                        {props.btnText}

                        <i
                          className="fas fa-arrow-right"
                          style={{ marginRight: '15px' }}
                        ></i>
                      </a>
                    </div>
                  )}
                  {props.singleBtn && props.btnText !== null && (
                    <div
                      className={`header-btn eer ${
                        props.eduClassName || props.eduClass
                      }`}
                    >
                      <a
                        href={
                          props.applyUrl
                            ? props.applyUrl
                            : props.targetHtmlEle
                            ? props.targetHtmlEle
                            : '#'
                        }
                        className="theme-btn"
                        target={props.target ? props.target : '_self'}
                      >
                        <div
                          dangerouslySetInnerHTML={{ __html: props.btnText }}
                        />
                        <i
                          className="fas fa-arrow-right"
                          style={{ marginRight: '15px' }}
                        ></i>
                      </a>
                    </div>
                  )}
                  {props.network ? (
                    <div className="flip-btn-fx">
                      <div className="single-btn">
                        <a
                          href="#"
                          type="button"
                          onClick={() => props.setShow()}
                        >
                          Connect
                        </a>
                      </div>
                      {props.viewLocation ? (
                        <div className="video-btn">
                          <a href={props.location} target="_blank">
                            <i className="fa fa-map-marker pr-5"></i> View
                            Location
                          </a>
                        </div>
                      ) : null}
                      {props.watchVideo ? (
                        <div className="video-btn">
                          {props.uploadBtn ? (
                            <a href="#">
                              <img
                                src="assets/img/upload.png"
                                alt=""
                                style={{ marginRight: '15px' }}
                              />{' '}
                              Startup Policy
                            </a>
                          ) : (
                            <>
                              <a href="#" onClick={() => setPlayerModal(true)}>
                                <span></span> Watch Video
                              </a>
                              <MediaModal
                                show={playerModal}
                                playerModalClose={() =>
                                  setPlayerModal(!playerModal)
                                }
                              />
                            </>
                          )}
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                  {props.twoBtn && (
                    <div className="flip-btn-fx">
                      <div className="single-btn">
                        {props.startupguide ? (
                          <a
                            href="#"
                            type="button"
                            data-toggle="modal"
                            data-target="#exampleModalCenter"
                          >
                            Know more
                          </a>
                        ) : (
                          <a
                            href="#"
                            type="button"
                            data-toggle="modal"
                            data-target="#exampleModalCenter"
                          >
                            Connect
                          </a>
                        )}
                      </div>
                      <div className="video-btn">
                        <a href="#">
                          <span></span> Watch Video
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {props.uploadBtn && (
                <div className="upload-btn">
                  <div className="upload__pdf">
                    {props?.data?.map((item, index) => (
                      <div className={index == 1 && 'operational__pdf'}>
                        <Link href={item?.pdf?.mediaItemUrl}>
                          <a target="_blank" className="theme-btn">
                            <img
                              src={item.icon.sourceUrl}
                              className="upload__img"
                              style={{ marginRight: '10px' }}
                            />{' '}
                            {props.startupGuideKn
                              ? `${item.titleKn}`
                              : `${item.title}`}
                          </a>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {props.uploadPdf && (
                <>
                  <div className={`upload-btn ${props.elevate}`}>
                    <div className="upload__pdf">
                      {props.applyBtn && (
                        <>
                          {
                            props.eventStatus === 'submitted' ? '' : ''
                            // <div
                            //   className={`header-btn eer ${props.eduClassName}`}
                            //   onClick={elevatebtncheck}
                            // >
                            //   <Link href={props.formUrl}>
                            //     <a className="theme-btn">
                            //       {props.btnText}
                            //       <i
                            //         className="fas fa-arrow-right"
                            //         style={{ marginRight: '15px' }}
                            //       ></i>
                            //     </a>
                            //   </Link>
                            // </div>
                          }

                          {props.elevateBtn && props.userType === 'Startup' && (
                            <div
                              onClick={handleStatusModel}
                              className={`header-btn eer ${props.elevateClass} ${props.eduClass}`}
                            >
                              <a href="#" className="theme-btn">
                                {props.elevateBtntext}
                                <i
                                  className="fas fa-arrow-right"
                                  style={{ marginRight: '15px' }}
                                ></i>
                              </a>
                            </div>
                          )}
                        </>
                      )}

                      {props.amrit && (
                        <>
                          {props.comingSoonBtn ? (
                            <div
                              className={`header-btn eer ${props.eduClassName}`}
                              onClick={elevatebtncheck}
                            >
                              <div
                                className={
                                  btnDisable ? 'btn amrit-disable' : 'btn amrit'
                                }
                              >
                                <Button
                                  disabled={btnDisable}
                                  onClick={handleBtnClick}
                                  style={{ color: '#fff' }}
                                >
                                  <Link href={'#'}>
                                    <a className="theme-btn">
                                      {props.comingSoonBtn.title}
                                      <i
                                        className="fas fa-arrow-right"
                                        style={{
                                          marginRight: '15px',
                                          marginLeft: '5px',
                                        }}
                                      ></i>
                                    </a>
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <>
                              {props.AmritStatus === 'submitted' ? (
                                ''
                              ) : (
                                <>
                                  {session && props.formActive ? (
                                    <div
                                      className={`header-btn eer ${props.eduClassName}`}
                                      onClick={elevatebtncheck}
                                    >
                                      <div
                                        className={
                                          btnDisable
                                            ? 'btn amrit-disable'
                                            : 'btn amrit'
                                        }
                                      >
                                        <Button
                                          disabled={btnDisable}
                                          onClick={handleBtnClick}
                                          style={{ color: '#fff' }}
                                        >
                                          <Link
                                            href={
                                              session.loginType === 'Startup'
                                                ? props.formUrl
                                                : '#'
                                            }
                                            onClick={() =>
                                              session.loginType === 'Startup'
                                                ? setApplyForm(false)
                                                : setApplyForm(true)
                                            }
                                          >
                                            <a
                                              className="theme-btn"
                                              onClick={() =>
                                                session.loginType === 'Startup'
                                                  ? setApplyForm(false)
                                                  : setApplyForm(true)
                                              }
                                              href="#"
                                            >
                                              {props.btnText}
                                              <i
                                                className="fas fa-arrow-right"
                                                style={{
                                                  marginRight: '15px',
                                                  marginLeft: '5px',
                                                }}
                                              ></i>
                                            </a>
                                          </Link>
                                        </Button>
                                      </div>
                                    </div>
                                  ) : (
                                    <>
                                      {props.formActive && (
                                        <div
                                          className={`header-btn eer ${props.eduClassName}`}
                                          onClick={elevatebtncheck}
                                        >
                                          <div
                                            className={
                                              btnDisable
                                                ? 'btn amrit-disable'
                                                : 'btn amrit'
                                            }
                                          >
                                            <Button
                                              disabled={btnDisable}
                                              onClick={handleBtnClick}
                                              style={{ color: '#fff' }}
                                            >
                                              <Link
                                                href={
                                                  props?.btnText
                                                    ?.toLowerCase()
                                                    ?.includes('soon')
                                                    ? '#'
                                                    : 'login'
                                                }
                                              >
                                                <a
                                                  className="theme-btn"
                                                  href="#"
                                                >
                                                  {props.btnText}
                                                  <i
                                                    className="fas fa-arrow-right"
                                                    style={{
                                                      marginRight: '15px',
                                                      marginLeft: '5px',
                                                    }}
                                                  ></i>
                                                </a>
                                              </Link>
                                            </Button>
                                          </div>
                                        </div>
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </>
                          )}

                          {props.amritBtn && (
                            <div
                              onClick={handleStatusModel}
                              className={`header-btn eer ${props.elevateClass} ${props.eduClass}`}
                            >
                              <a
                                href={session ? '#' : '#'}
                                className="theme-btn"
                              >
                                {props.elevateBtntext}
                                <i
                                  className="fas fa-arrow-right"
                                  style={{ marginRight: '15px' }}
                                ></i>
                              </a>
                            </div>
                          )}
                        </>
                      )}

                      {props?.policyPdf && (
                        <div className={'policy__pdf'}>
                          <Link href={props.policyPdf.pdf?.mediaItemUrl}>
                            <a
                              target="_blank"
                              className={`theme-btn ${props.classPolicy}`}
                            >
                              <img
                                src={
                                  props.policyPdf.icon &&
                                  props.policyPdf.icon.sourceUrl
                                }
                                className="upload__img"
                                style={{ marginRight: '10px' }}
                              />{' '}
                              {props.policyPdf.title}
                            </a>
                          </Link>
                        </div>
                      )}
                      {props?.operationalPdf && (
                        <div className={'operational__pdf'}>
                          <Link
                            href={
                              props.operationalPdf?.pdf
                                ? props.operationalPdf?.pdf?.mediaItemUrl
                                : '#'
                            }
                          >
                            <a
                              target="_blank"
                              className={`theme-btn ${props.classPolicy}`}
                            >
                              <img
                                src={
                                  props.policyPdf.icon &&
                                  props.operationalPdf?.icon?.sourceUrl
                                }
                                className="upload__img"
                                style={{ marginRight: '10px' }}
                              />{' '}
                              {props.operationalPdf?.title}
                            </a>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* <span style={{"color":"#fff"}}>This Application Window opens on 1st September,9:00 AM</span> */}
                </>
              )}
              {props.img ? (
                <div className={`flip-img ${props.logoClass}`}>
                  <img src={props.image} alt="" />
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modelOpen}
        onRequestClose={handleClose}
        contentClassName="modal_checkstatus"
        size="lg"
        centered
      >
        <ModalBody>
          <div className="d-flex justify-content-center align-items-center">
            <h4 className="mt-3 status_heading" style={{ textAlign: 'center' }}>
              {props.statusTitle}
            </h4>
          </div>
          <div className="status_message">
            {props.eventStatus === undefined ||
            props.eventStatus === null ||
            props.eventStatus === ''
              ? 'please login to check status'
              : message}
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <button className="status_okay mb-4" onClick={handleClose}>
              Okay
            </button>
          </div>
        </ModalBody>
      </Modal>
      <Modal
        isOpen={applyForm}
        onRequestClose={() => setApplyForm(!applyForm)}
        contentClassName="modal_checkstatus"
      >
        <ModalBody>
          <h4 className="mt-3 status_heading" style={{ textAlign: 'center' }}>
            {props.eventName}
          </h4>
          <hr className="hr_line" />
          <div className="status_message">
            {session && `Only Startups Can Apply For ${props.eventName}`}
          </div>
          <button
            className="status_okay mb-4"
            onClick={() => setApplyForm(!applyForm)}
          >
            Okay
          </button>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default FlipBannner;

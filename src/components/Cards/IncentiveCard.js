import React, { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/client';
import CommonModalStrap from '../CommonModalStrap';
import { useRouter } from 'next/router';

const PolicyCard = ({ data, certificateStatus }) => {
  const pdf = data.pdf?.mediaItemUrl;
  const [session, loading] = useSession();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [redirect, setRedirect] = useState('#');
  const incetiveform = () => {
    if (!session) {
      setShow(true);
      setMessage('Login to apply for incentives');
      setRedirect('/login');
    } else if (
      session &&
      session?.loginType === 'Startup' &&
      certificateStatus === 'Generated'
    ) {
      setShow(false);
      router.push(data?.applyIncentive?.url);
      setRedirect('#');
    } else if (session && session?.loginType !== 'Startup') {
      setShow(true);
      setMessage('Only startup can apply for incetive');
      setRedirect('#');
    } else {
      setShow(true);
      setMessage('Your startup is not apllicable for apply incentive ');
      setRedirect('#');
    }
  };
  return (
    <>
      <div className="download-inner">
        <div className="download-inner-hdn">
          <span>{data.title1}</span>
          <Link href={`${pdf}`}>
            <a target="_blank">
              <i className="fas fa-download"></i>Download Guidelines
            </a>
          </Link>
        </div>
        <div className="download-text">
          <p>{data.desc1}</p>
        </div>
        <div className="downloas-list-wp">
          <h5>{data.title2}</h5>
          <div className="download-list">
            <ul>
              {data.list1?.map((item, index) => (
                <li>
                  <i className="fas fa-check" key={index}></i>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="download-text">
          <span>{data.title3}</span>
          <p>{data.desc3}</p>
        </div>
        <div className="download-text">
          <span>{data.title4}</span>
          <p>{data.desc4}</p>
        </div>
        <div className="download-text">
          <span>{data.title5}</span>
          <p>{data.desc5}</p>
        </div>
        <div className="downloas-list-wp">
          <h5>{data.title6}</h5>
          <div className="download-list">
            <ul>
              {data.list2?.map((item, index) => (
                <li>
                  <i className="fas fa-check" key={index}></i>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="download-text">
          <p>{data.desc6}</p>
        </div>
        <div className="download-desc">
          <p>{data.desc8}</p>
        </div>
        <div className="download-inner-hdn">
          <span>{data.title7}</span>
        </div>
        <div className="download-text">
          <p>{data.desc7}</p>
        </div>
        <div className="downloas-list-wp">
          <h5>{data.title8}</h5>
          <div className="download-list">
            <ul>
              {data.list3?.map((item, index) => (
                <li>
                  <i className="fas fa-check" key={index}></i>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="downloas-list-wp">
          <h5>{data.title9}</h5>
          <div className="download-list">
            <ul>
              {data.list4?.map((item, index) => (
                <li>
                  <i className="fas fa-check" key={index}></i>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="download-btn" onClick={() => incetiveform()}>
          <a href="#">
            {data?.applyIncentive?.title} <i className="fas fa-angle-right"></i>
          </a>
        </div>
      </div>
      <CommonModalStrap
        modalClass="service-partner"
        title="Incentive"
        show={show}
        servicePartner
        message={message}
        redirect={redirect}
        onClose={() => setShow(false)}
      />
    </>
  );
};

export default PolicyCard;

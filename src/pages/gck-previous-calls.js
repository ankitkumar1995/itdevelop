import Image from 'next/image';
import React from 'react';
import FlipBannner from '../components/FlipBanner';
import Layout from '../components/Layout';
import { getGckPreviousCalls } from '../lib/api';

const GCKPreviousCall = ({ wpgck }) => {
  const { title, image } = wpgck?.commonBanner;
  const { gckCalls } = wpgck?.gckPreviousCalls;
  return (
    <Layout>
      <FlipBannner title={title} bgImage={image} />
      <div className="faq-area funding" id="grantsAndfund">
        <div className="container">
          {gckCalls?.map((gck, index) => (
            <div className="row" key={index}>
              <div className="col-lg-12">
                <div className="startup__funding">
                  <div className={'card accordion-active'}>
                    <div className="clps-header funding gck">
                      <h5>
                        <button className="clps-link">
                          <div>
                            <span>{gck.callName} &nbsp;</span>
                            <Image
                              src="/assets/img/accord-logo.png"
                              width={40}
                              height={20}
                              layout="fixed"
                              alt="..."
                            />
                          </div>
                        </button>
                      </h5>
                    </div>
                    <div className="card-text">
                      <div className="startup__content">
                        <div className="row">
                          <div className="col-12">
                            <div className="accord__info">
                              <div>
                                <h3>Challenge Statement:</h3>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: `<p>${gck.challengeStatement}</p>`,
                                  }}
                                />
                              </div>
                              <div className="startup-gck">
                                <h3>No’ of Startups Selected for Phase-1:</h3>
                                <span>{gck.startupSelectedPahse1}</span>
                              </div>
                              <div className="startup-gck">
                                <h3>PoC’s developed:</h3>
                                <span>{gck.pocsDeveloped}</span>
                              </div>
                              <div>
                                <h3>
                                  Startups selected for Phase -2 (Scale up)
                                </h3>
                                {gck.startupSelectedPahse2?.map(
                                  (startup, index) => (
                                    <div key={index}>{startup.companyName}</div>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default GCKPreviousCall;
export const getServerSideProps = async (ctx) => {
  const wpgck = await getGckPreviousCalls();
  return {
    props: {
      wpgck: wpgck?.page,
    },
  };
};

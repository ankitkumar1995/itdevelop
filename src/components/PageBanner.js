import React, { useState } from 'react';
import BannerLink from './BannerLink';
const PageBanner = (props) => {
  return (
    <>
      <div
        className={props.className}
        style={{
          backgroundImage: `url(${props.bgImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="hero-containt">
                <div className="hero-top-text">
                  <h3>{props.title}</h3>
                  <p>{props.desc}</p>
                </div>
                {props.nav && (
                  <div className="hero-tab">
                    <ul className="nav nav-pills mb-3">
                      {props.nav.map((item, index) => (
                        <BannerLink
                          data={item}
                          key={index}
                          reports={props.reports}
                        />
                      ))}
                    </ul>
                  </div>
                )}
                {props.navTabs && (
                  <div className="hero-tab">
                    <ul
                      className="nav nav-pills mb-3"
                      id="myTab"
                      role="tablist"
                    >
                      {props.navTabs.map((item, index) => (
                        <li className="nav-item">
                          <a
                            className={
                              props.active === item.key
                                ? 'nav-link active'
                                : props.loading
                                ? 'disabled nav-link'
                                : 'nav-link'
                            }
                            id={item.key + '-tab'}
                            // onClick={() => props.setActive(item.key)}
                            data-toggle="tab"
                            href={item.href}
                            role="tab"
                            aria-controls={item.key}
                            aria-selected={
                              props.active === item.key ? 'true' : 'false'
                            }
                          >
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageBanner;

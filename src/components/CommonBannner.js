import React from 'react';
import Link from 'next/link';
import DependentSelect from './FormControls/DependenSelct';
const CommonBanner = (props) => {
  return (
    <div
      className={`looking-area ${props.pageClass}`}
      style={
        props.darkBg
          ? {
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${props?.image})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }
          : {
              backgroundImage: `url(${props?.image})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }
      }
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {props.boots ? (
              <div className="boots-hero-containt">
                <span>{props.title}</span>
                <h3 dangerouslySetInnerHTML={{ __html: props.subTitle }} />
                <Link href={props.pdfBtnUrl ? props.pdfBtnUrl : '#'}>
                  <a className="theme-btn" target={'_blank'}>
                    {props.pdfBtnTitle}
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </Link>
              </div>
            ) : (
              <div className="looking-wrap">
                <div className="looking-content">
                  <p>{props.title}</p>
                  <div className="home-drop-content">
                    <DependentSelect
                      dropDownData={props.dropDownData}
                      path={props.path}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default React.memo(CommonBanner);

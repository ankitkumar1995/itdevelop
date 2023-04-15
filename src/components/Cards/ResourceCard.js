import React from 'react';
import Link from 'next/link';

const ResourceCard = (props) => {
  return (
    <div className="resource-card">
      <div className="resource-wraper">
        <div className="resource-content">
          <h3>{props.title}</h3>
          <div dangerouslySetInnerHTML={{ __html: props.description }} />
          <div className="resource-button">
            {props?.pdf?.pdf && (
              <div className="downld">
                <Link href={props?.pdf?.pdf?.mediaItemUrl}>
                  <a target="_blank">
                    <i className="fas fa-download"></i>
                    <span className="mx-2">{props?.pdf?.title}</span>
                  </a>
                </Link>
              </div>
            )}
            {props.applyButton && (
              <div className="aply">
                <Link href={props?.applyButton?.url}>
                  <a target="_blank">
                    <i className="fas fa-external-link-alt"></i>
                    <span className="mx-2">{props?.applyButton?.title}</span>
                  </a>
                </Link>
              </div>
            )}
            {props.visitButton && (
              <div className="ext-link">
                <Link href={props?.visitButton?.url}>
                  <a target="_blank">
                    <i className="fas fa-external-link-alt"></i>
                    <span className="mx-2">{props?.visitButton?.title}</span>
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;

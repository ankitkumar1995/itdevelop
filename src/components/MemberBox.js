import React, { useState } from 'react';
import StartupCellMemberBox from './StartupCellMemberBox';

const MemberBox = ({ data, allData, contactDetails, tab }) => {
  return (
    <>
      {tab === 'startup-karnataka-cell' ? (
        <StartupCellMemberBox allData={allData} />
      ) : (
        <>
          {data.map((item, index) => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={index}>
              <div className="member_box">
                <div className="member_content">
                  <h5 className="title-text">{item.title}</h5>
                  <p className="desc-text">
                    <div
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </p>
                  {contactDetails && (
                    <div>
                      {item.contact.map((mail, index) => (
                        <div key={index}>
                          <i className="far fa-envelope"></i>
                          <span className="px-2">{mail.email}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};
export default MemberBox;

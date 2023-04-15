import React, { Fragment } from 'react';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  dividerColor: {
    color: 'red',
  },
}));

const StartupCellMemberBox = ({ allData }) => {
  const { content, content1 } = allData;
  return (
    <>
      {content.map((item, index) => (
        <Fragment>
          <div className="download-pdf">
            <a>{item.intro}</a>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8 col-xl-7">
              <div className="member_box">
                <div className="member_content">
                  <div className="member_content_right_flex text-center">
                    <h5 className="title-text">{item.title}</h5>
                    <p className="desc-text">
                      <div
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                    </p>
                    {item.contact.map((mail, index) => (
                      <div key={index}>
                        <span className="px-2">{mail?.email}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      ))}

      {content1.map((data, index) => (
        <Fragment>
          <div className="download-pdf">
            <a>{data.intro}</a>
          </div>
          {data.box.map((item, index) => (
            <>
              <div className="row mt-3" key={index}>
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <div className="member_boxs">
                    <div className="member_content">
                      <div className="member_content_flex">
                        <h5 className="title-text text-center">
                          {item.leftTitle}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-12 col-md-6 col-lg-6">
                  <div className="member_box">
                    {item.rightBox.map((elt, index) => (
                      <>
                        <div className="member_content" key={index}>
                          <div className="member_content_right_flex text-center">
                            <h5 className="title-text">{elt.title}</h5>
                            <p className="desc-text">{elt.desc}</p>
                            <div>
                              <span className="px-2">{elt?.email1}</span>
                            </div>
                            <div>
                              <span className="px-2">{elt?.email2}</span>
                            </div>
                          </div>
                        </div>
                        <Divider
                          variant="middle"
                          component="p"
                          style={{ width: '96%' }}
                        />
                      </>
                    ))}
                  </div>
                </div>
              </div>
              <Divider
                variant="middle"
                component="p"
                style={{ background: 'red', width: '97%', height: '0.5px' }}
                className="red-line"
              />
            </>
          ))}
        </Fragment>
      ))}
    </>
  );
};
export default StartupCellMemberBox;

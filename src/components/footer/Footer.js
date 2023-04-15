import { useContext, useEffect, useMemo, useState } from 'react';
import AppContext from '../../AppContext';
import WidgetBox from './WidgetBox';
import widgetData from './WidgetBoxData.json';
import React from 'react';
const Footer = (props) => {
  const value = useContext(AppContext);
  const { data } = useMemo(
    () => value.state.footerData,
    [value.state.footerData]
  );
  const [layoutData, setLayoutData] = useState(data);
  useEffect(() => {
    if (props.path === 'kn') {
      setLayoutData(value.state.footerDataKN.data);
    } else if (props.path === 'en') {
      setLayoutData(data);
    } else {
      setLayoutData(data);
    }
  }, [props?.path]);

  const { footer } = layoutData?.page?.pageLogoAndPdf;

  return (
    <div className="footer-area">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="footer-widget">
              <div className="footer-logo d-flex justify-content-between align-items-center">
                {layoutData.page.pageLogoAndPdf.footerLogo.map(
                  (item, index) => (
                    <a href={item?.link?.url} target={'_blank'}>
                      <img
                        src={item?.logo?.sourceUrl}
                        alt=""
                        className={
                          index === 0
                            ? 'footer-first-image'
                            : index === 1
                            ? 'pb-2 footer-middle-image'
                            : index === 2
                            ? 'footer-last-image'
                            : ''
                        }
                      />
                    </a>
                  )
                )}
              </div>
              <div className="footer-list-fx">
                <div className="single-list">
                  <div className="list-wp hhj">
                    <WidgetBox
                      label={footer[0].label}
                      data={footer[0].navItems}
                      startupKit
                    />
                  </div>
                  <div className="list-wp">
                    <WidgetBox
                      label={footer[1].label}
                      data={footer[1].navItems}
                      startupKit
                    />
                  </div>
                </div>
                <div className="single-list">
                  <div className="list-wp hhj">
                    <WidgetBox
                      label={footer[2].label}
                      data={footer[2].navItems}
                      startupKit
                    />
                  </div>
                  <div className="list-wp">
                    <WidgetBox
                      label={footer[3].label}
                      data={footer[3].navItems}
                      startupKit
                    />
                  </div>
                </div>

                <div className="single-list">
                  <div className="list-wp hhj">
                    <WidgetBox
                      label={footer[4].label}
                      data={footer[4].navItems}
                      startupKit
                    />
                  </div>
                  <div className="list-wp">
                    <WidgetBox
                      label={footer[5].label}
                      data={footer[5].navItems}
                      pagePdf={
                        layoutData?.page?.pageLogoAndPdf?.headerMenuImages
                          ?.fundingAndProgram?.combatChallenge?.pdf
                          ?.mediaItemUrl
                      }
                      startupKit
                    />
                  </div>
                </div>
                <div className="single-list">
                  <div className="list-wp hhj">
                    <WidgetBox
                      label={footer[6].label}
                      data={footer[6].navItems}
                      startupKit
                    />
                  </div>
                </div>
                <div className="single-list">
                  <div className="list-wp hhj">
                    <WidgetBox
                      label={footer[7].label}
                      data={footer[7].navItems}
                      startupKit
                    />
                  </div>
                  <div className="list-wp ggj">
                    <WidgetBox
                      label={footer[8].label}
                      data={footer[8].navItems}
                      email
                      startupKit
                    />
                  </div>
                  <div className="list-wp ggj">
                    <WidgetBox
                      label={footer[9].label}
                      data={footer[9].navItems}
                      startupKit
                    />
                  </div>
                  <div className="list-wp ggj">
                    <WidgetBox
                      label={footer[10].label}
                      data={footer[10].navItems}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="copy-right-wrap">
              <div className="copy-right-left">
                <div className="copy-right-text">
                  <p>© KITS 2022, All Rights Reserved</p>
                </div>
                <div className="copyright-menu">
                  <ul>
                    <li>
                      <a href="#">Terms & Conditions</a>
                    </li>
                    <li>
                      <a href="#">Privacy Policy</a>
                    </li>
                    <li>
                      <a href="#">
                        Total Views : <span>65,3461</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="copy-right-icon">
                <a href="#">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default React.memo(Footer);
export async function getServerSideProps() {
  const headerMenuRes = await headerMenu();
  return {
    props: {
      headerMenuRes: headerMenuRes,
    },
  };
}

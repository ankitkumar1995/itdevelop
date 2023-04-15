import { useState } from 'react';
import WidgetBox from '../footer/WidgetBox';
import Popup from '../Popup';
import ScreenReader from '../ScreenReader';
import Image from 'next/image';

const PageMenu = (props) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className={props.showclass}>
        <div className="container-fluid mb_20">
          <div className="align-items-center d-flex top_bar">
            <div className="logo">
              <img src={props?.siteLogo} imgclassName="img-fluid" />
            </div>
            <div className="text-right">
              <a
                href="#"
                className="recorder__button"
                onClick={() => setShowModal(true)}
              >
                <Image src={'/assets/img/reader.svg'} width={23} height={20} />
                <span>&nbsp; Screen Recorder</span>
              </a>

              <a
                href="#"
                className="close_btn"
                onClick={() => props.setFullPageMenu()}
              >
                ×
              </a>
            </div>
          </div>
          <div className="row page_menu">
            {props?.megaMenuData?.map((items, index) => (
              <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                <WidgetBox displayMegaMenu={true} data={items} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="reader_popup">
        <Popup
          show={showModal}
          onHide={() => setShowModal(false)}
          content={<ScreenReader handleClick={() => setShowModal(false)} />}
        />
      </div>
    </>
  );
};
export default PageMenu;

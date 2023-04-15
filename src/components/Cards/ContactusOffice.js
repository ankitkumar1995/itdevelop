import React from 'react';

const ContactusOffice = ({ data }) => {
  return (
    <>
      {data.location.map((item, index) => (
        <div className="single-offce k-startup-cell" key={index}>
          <div className="office-top-text">
            <h3>{item.title}</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: item.description,
              }}
            />
          </div>
          <div className="office-loca">
            <div className="office-loca-left">
              {item.contact.map((item, index) => (
                <a href="tel:+91-80-22231007" key={index}>
                  <img src={item.image.sourceUrl} alt="" />
                  {item.contactNumber}
                </a>
              ))}
            </div>
            {/* <div className="office-loca-ri">
              <a href="#">
                <i className={'fas fa-map-marker-alt'}></i>
                {item.googleMap.map.title}
              </a>
            </div> */}
          </div>
        </div>
      ))}
    </>
  );
};

export default ContactusOffice;

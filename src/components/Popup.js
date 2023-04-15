import React from 'react';

const Popup = (props) => {
  return (
    <>
      {props.show && (
        <div className="popup-box">
          <div className="box">
            <span className="close-icon" onClick={props.onHide}>
              x
            </span>
            {props.content}
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
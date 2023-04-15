import React from 'react';

const Loader = ({ text }) => {
  return (
    <div className="fallback-spinner vh-100">
      <div className="loading">
        <div className="effect-1 effects"></div>
        <div className="effect-2 effects"></div>
        <div className="effect-3 effects"></div>
      </div>
      {text && <p>{text}</p>}
    </div>
  );
};

export default Loader;

import { useState } from 'react';
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const CommonLoader = () => {
  return (
    <div className="loading-wait">
      <div className="loading-data">
        <div>
          <img src="/assets/img/Bitmap.png" />
        </div>
        <div className="loading-text">
          <div>Loading</div>
        </div>
      </div>
    </div>
  );
};

export default CommonLoader;

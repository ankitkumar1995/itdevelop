import React from 'react';
import CustomToggleButton from '../ElevateFormControls/ToggleButton';

const SelfCertification = (props) => {
  return (
    <React.Fragment>
      <CustomToggleButton
        label="1. Is your revenue under Rs. 100 Crore from the date of Incorporation ?"
        labelKN="ನಿಮ್ಮ ನವೋದ್ಯಮವು ಸಂಯೋಜನೆಗೊಂಡ ದಿನಾಂಕದಿಂದ ಅನ್ವಯವಾಗುವಂತೆ 100 ಕೋಟಿ ರೂಪಾಯಿಗಳಿಗಿಂತ ಕಡಿಮೆ ವರಮಾನ ಹೊಂದಿದೆಯೇ?"
        name="selfCertification.revUnder100CR"
        required
      />
      <CustomToggleButton
        label="2. Is your startup/ entity working towards innovation, development or improvement of products or processes or services, 
        or if it is a scalable business model with a high potential of employment generation or wealth creation ?"
        labelKN="ನಿಮ್ಮ ನವೋದ್ಯಮವು/ ಸಂಸ್ಥೆಯು ನಾವೀನ್ಯತೆ, ಉತ್ಪನ್ನಗಳ ಅಭಿವೃದ್ಧಿ ಅಥವಾ ಸುಧಾರಣೆಯಲ್ಲಿ ಅಥವಾ ಅಂತಹ ಪ್ರಕ್ರಿಯೆಗಳಲ್ಲಿ ತೊಡಗಿಸಿಕೊಂಡಿದೆಯೇ? ಅಥವಾ, ಉದ್ಯೋಗ ಸೃಷ್ಟಿಸುವ ಅಥವಾ ಸಂಪತ್ತು ಸೃಷ್ಟಿಸುವ ಹೆಚ್ಚಿನ ಸಾಮರ್ಥ್ಯ ಹೊಂದಿದೆಯೇ?"
        name="selfCertification.workingTowardInnovation"
        required
      />
      <CustomToggleButton
        label="3. Is your entity a Women Entrepreneur/s based Startup? (Director(s)/Partner(s) should hold substantial Share)"
        labelKN="ಮಹಿಳಾ ಉದ್ಯಮಿಯು ನಿಮ್ಮ ನವೋದ್ಯಮದ ಪ್ರವರ್ತಕರಾಗಿದ್ದಾರೆಯೇ?(ನಿರ್ದೇಶಕ (ರು)/ ಪಾಲುದಾರ (ರು) ಗಣನೀಯ ಪ್ರಮಾಣದ ಷೇರುಗಳನ್ನು ಹೊಂದಿರಬೇಕು)"
        name="selfCertification.womenStartup"
        required
      />
    </React.Fragment>
  );
};

export default SelfCertification;

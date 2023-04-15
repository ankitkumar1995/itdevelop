import React from 'react';
import { Edit } from 'react-feather';

const ProfileCardBody = ({ children }) => {
  return <div className="details-card-body">{children}</div>;
};

const ProfileCard = ({
  children,
  headerText,
  headerButtonIncluded,
  OnClickHeaderButton,
  buttonIcon,
}) => {
  return (
    <div className="profile-details-card">
      {headerText && (
        <div className="details-card-header">
          <h1>
            {headerText}
            {headerButtonIncluded && (
              <button onClick={OnClickHeaderButton}>
                {buttonIcon || <Edit />}
              </button>
            )}
          </h1>
        </div>
      )}
      {children}
    </div>
  );
};

export { ProfileCard, ProfileCardBody };

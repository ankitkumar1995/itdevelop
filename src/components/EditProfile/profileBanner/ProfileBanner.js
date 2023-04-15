import React from 'react';

const ProfileBanner = ({
  profileImage,
  onEditButtonClick,
  profileName,
  profileTagline,
  introContent,
  socialLinks,
}) => {
  return (
    <div className="profile-details">
      <div className="profile-avatar">
        <div className="avatar-image">
          <img src={profileImage} alt="Profile-avatar" />
        </div>
        <div className="profile-edit-button">
          <button onClick={onEditButtonClick}>Edit Profile</button>
        </div>
      </div>
      <div className="profile-information">
        <div className="profile-name-intro">
          <p className="profile-name">{profileName}</p>
          <p className="profile-intro">{profileTagline}</p>
        </div>
        <div className="profile-links">
          {introContent && (
            <a
              className="profile-elevate-links"
              href={
                introContent?.redirectUrl?.substr(0, 8) === 'https://' ||
                introContent?.redirectUrl?.substr(0, 7) === 'http://'
                  ? introContent.redirectUrl
                  : `https://${introContent.redirectUrl}`
              }
              target="_blank"
            >
              <div className="profile-single-link pitch-section">
                {introContent.icon}
                <p>{introContent.text}</p>
              </div>
            </a>
          )}
          <div className="profile-social-links">
            {socialLinks?.website && (
              <a
                className="profile-single-link"
                target={'_blank'}
                href={
                  socialLinks?.website?.substr(0, 8) === 'https://' ||
                  socialLinks?.website?.substr(0, 7) === 'http://'
                    ? socialLinks?.website
                    : `https://${socialLinks?.website}`
                }
              >
                <i className="fas fa-external-link-alt"></i>
              </a>
            )}
            {socialLinks?.linkedIn && (
              <a
                className="profile-single-link"
                target={'_blank'}
                href={
                  socialLinks?.linkedIn?.substr(0, 8) === 'https://' ||
                  socialLinks?.linkedIn?.substr(0, 7) === 'http://'
                    ? socialLinks?.linkedIn
                    : `https://${socialLinks?.linkedIn}`
                }
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            )}
            {socialLinks?.twitter && (
              <a
                className="profile-single-link"
                target={'_blank'}
                href={
                  socialLinks?.twitter?.substr(0, 8) === 'https://' ||
                  socialLinks?.twitter?.substr(0, 7) === 'http://'
                    ? socialLinks?.twitter
                    : `https://${socialLinks?.twitter}`
                }
              >
                <i className="fab fa-twitter"></i>
              </a>
            )}
            {socialLinks?.facebook && (
              <a
                className="profile-single-link fb-icon"
                target={'_blank'}
                href={
                  socialLinks?.facebook?.substr(0, 8) === 'https://' ||
                  socialLinks?.facebook?.substr(0, 7) === 'http://'
                    ? socialLinks?.facebook
                    : `https://${socialLinks?.facebook}`
                }
              >
                <i className="fab fa-facebook-f"></i>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBanner;

import { Link } from '@material-ui/core';
import Image from 'next/image';

const UserActivate = () => {
  // user activate
  return (
    <div className="user_activate_wrap">
      <div className="user_active_header">
        <Image src="/assets/img/site-logo-sticky.png" width="200" height="53" />
      </div>
      <div className="user__activate">
        <div className="sucs_icon">
          <div className="check_icon">
            <i className="fas fa-check"></i>
          </div>
        </div>
        <div className="sucs_text">Your email is succesfully verified</div>
        <div className="rect_t">
          <Link href="login">
            <a>
              <div className="rect_button">Login</div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default UserActivate;

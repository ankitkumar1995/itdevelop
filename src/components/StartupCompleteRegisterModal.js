import Link from 'next/link';
const StartupCompleteRegistrationModal = (props) => {
  return (
    <div className="recorder__wrap">
      <div className="container">
        <div>
          <div className="regist_sucs_modal_header">
            <h1>Welcome to Startup Karnataka!</h1>
            <p style={{ color: '#1D293F' }}>
              You will be eligible to access our services and avail benifits
              once your registration process is complete.
            </p>
          </div>
          <div className="register__instxn">
            <h3>Please keep the following ready</h3>
            <div className="prog__list">
              <ul>
                <li>
                  <i className="fas fa-check"></i>
                  <div>
                    Incorporation Certificate / Partnership Deed / Company
                    Registration Certificate
                  </div>
                </li>
                <li>
                  <i className="fas fa-check"></i>
                  <div>
                    Financial Statements / Nil Revenue Certificate with seal &
                    signed by CA on the CA letter head
                  </div>
                </li>
                <li>
                  <i className="fas fa-check"></i>
                  <div>
                    Self Declaration on the company letter head with seal & sign
                  </div>
                </li>
                <li>
                  <i className="fas fa-check"></i>
                  <div>
                    Must be <b>submitted on request</b> - Other Additional
                    documents may include ( Company PAN, Startup India
                    Certificate, GST etc.
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="register__cont__btn">
            <div onClick={props.handleClick}>
              <Link href="#">
                <a>
                  Continue to register <i className="fas fa-arrow-right"></i>
                </a>
              </Link>
            </div>
          </div>
          <div className="may__do__later">
            <Link href="/">
              <a>Maybe I’ll do later</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StartupCompleteRegistrationModal;

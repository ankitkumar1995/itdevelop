import Link from 'next/link';
const ScreenReader = ({handleClick}) => {
  return (
    <div className="recorder__wrap">
      <div className="container">
        <div className="recrd__content">
          <h1>Screen Readers</h1>
          <p>
            The website complies with World Wide Web Consortium (W3C) Web
            Content Accessibility Guidelines (WCAG) 2.0 level AA. This will
            enable people with visual impairments access the website using
            assistive technologies, such as screen readers.
          </p>
          <h5>Please check out the following Screen Readers</h5>
        </div>
        <div className="reader_card">
          <div className="reader-wrap">
            <div className="reader_card-content">
              <h3>Non Visual Desktop Access (NVDA)</h3>
              <p>License: Free</p>
              <div className="reader_pdf">
                <Link href="http://www.nvda-project.org/">
                  <a target="_blank">
                  <i className="fas fa-external-link-alt"></i>
                    <span>Visit Website</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="reader-wrap">
            <div className="reader_card-content">
              <h3>JAWS</h3>
              <p>License: Commercial</p>
              <div className="reader_pdf">
                <Link href="http://www.freedomscientific.com">
                  <a target="_blank">
                  <i className="fas fa-external-link-alt"></i>
                    <span>Visit Website</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="reader-wrap">
            <div className="reader_card-content">
              <h3>Window-Eyes </h3>
              <p>License: Commercial</p>
              <div className="reader_pdf">
                <Link href="http://www.gwmicro.com">
                  <a target="_blank">
                  <i className="fas fa-external-link-alt"></i>
                    <span>Visit Website</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="reader-wrap">
            <div className="reader_card-content">
              <h3>System Access To Go</h3>
              <p>License: Free</p>
              <div className="reader_pdf">
                <Link href="http://www.satogo.com/">
                  <a target="_blank">
                  <i className="fas fa-external-link-alt"></i>
                    <span>Visit Website</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="reader-wrap">
            <div className="reader_card-content">
              <h3>WebAnywhere</h3>
              <p>License: Free</p>
              <div className="reader_pdf">
                <Link href="http://webinsight.cs.washington.edu/">
                  <a target="_blank">
                  <i className="fas fa-external-link-alt"></i>
                    <span>Visit Website</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="reader__btn">
          <div onClick={handleClick}>
          <Link href="#">
            <a>Okay</a>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ScreenReader;
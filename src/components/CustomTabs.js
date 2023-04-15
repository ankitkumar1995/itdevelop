import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { slugify } from '../utils/slugify';
const CustomTabs = ({ children, className }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);
  const router = useRouter();
  const handleClick = (e, newActiveTab) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };
  useEffect(() => {
    router.push(`${router.pathname}?${slugify(activeTab)}`, undefined, {
      shallow: true,
    });
  }, [activeTab]);
  return (
    <>
      <div className={`general-area ${className}`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="general-menu">
                <nav>
                  <div className="tab-wd">
                    <div className="nav general-tabs">
                      {children.map((tab, index) => (
                        <a
                          className={
                            tab.props.label == activeTab
                              ? 'general-item general-link active'
                              : 'general-item general-link'
                          }
                          href="#"
                          onClick={(e) => handleClick(e, tab.props.label)}
                          key={index}
                        >
                          {tab.props.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      {children.map((tabContent, index) => {
        if (tabContent.props.label == activeTab)
          return <div key={index}>{tabContent.props.children}</div>;
      })}
    </>
  );
};

export default CustomTabs;

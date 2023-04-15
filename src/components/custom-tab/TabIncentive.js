import { useState, useEffect } from 'react';
import styles from './CustomTab.module.css';
import { useRouter } from 'next/router';
import { slugify } from '../../utils/slugify';
const TabIncentive = ({ children, setIncentivePath, path }) => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState(children[0]?.props?.label);

  const handleClick = (e, newActiveTab) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
    setIncentivePath(slugify(newActiveTab));
  };

  useEffect(() => {
    setActiveTab(
      children?.filter(
        (item) => slugify(item?.props?.label) === router.asPath?.split('?')[1]
      )[0]?.props?.label
    );
  }, []);
  useEffect(() => {
    setIncentivePath(slugify(activeTab));
    router.push(`${router.pathname}?${slugify(activeTab)}?${path}`, undefined, {
      shallow: true,
    });
  }, [activeTab]);
  return (
    <>
      <div className="download-tab-menu">
        <ul className="nav download-tabs">
          {children.map((tab) => (
            <li className="download-item bbv">
              <div
                className={
                  tab.props.label == activeTab
                    ? 'download-link active'
                    : 'download-link'
                }
                onClick={(e) => handleClick(e, tab.props.label)}
              >
                <a href="#">{tab.props.label}</a>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {children.map((tabContent) => {
        if (tabContent.props.label == activeTab)
          return (
            <div className={styles.content}>{tabContent.props.children}</div>
          );
      })}
    </>
  );
};
export default TabIncentive;

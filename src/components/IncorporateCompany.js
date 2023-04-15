import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const IncorporateCompany = ({ data }) => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  const tabData = [
    {
      title: 'Step 1',
    },
    {
      title: 'Step 2',
    },
    {
      title: 'Step 3',
    },
  ];
  return (
    <div className="fab-tab">
      <ul class="nav nav-pills mb-3">
        {tabData.map((item, index) => (
          <li className="nav-item">
            <a
              className={
                toggleState === index + 1 ? 'nav-link active' : 'nav-link'
              }
              onClick={() => toggleTab(index + 1)}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>

      <div className="tab-content">
        {data.map((item, index) => (
          <div
            className={
              toggleState === index + 1
                ? 'tab-pane fade show active'
                : 'tab-pane fade'
            }
          >
            <div className="fab-containt">
              <div className="containt">
                <h3>{item.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: item.description }} />
                <Link href={item.button.url}>
                  <a className="theme-btn" target="_blank">
                    {item.button.title}
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </Link>
              </div>
              <Image
                src={item.image.sourceUrl}
                width="360"
                height="320"
                alt="check availability"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncorporateCompany;

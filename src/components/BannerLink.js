import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const BannerLink = ({ data, reports }) => {
  const routerDetails = useRouter();
  const active = data.route === routerDetails.pathname;
  return (
    <>
      {reports ? (
        <li className="nav-item">
          <Link href={data?.title?.url ? data.title.url : '#'}>
            <a
              className={`${
                (
                  data.title.url.includes('incentives') === true
                    ? data.title.url.split('?')[0] ===
                      routerDetails?.asPath?.split('?')[0]
                    : data.title.url === routerDetails.pathname
                )
                  ? 'nav-link active'
                  : 'nav-link'
              }`}
            >
              {data.title.title}
            </a>
          </Link>
        </li>
      ) : (
        <li className="nav-item">
          <Link href={data?.route ? data.route : data?.url ? data.url : '#'}>
            <a className={`${active ? 'nav-link active' : 'nav-link'}`}>
              {data.title}
            </a>
          </Link>
        </li>
      )}
    </>
  );
};

export default BannerLink;

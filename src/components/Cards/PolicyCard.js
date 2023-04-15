import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const PolicyCard = ({ data }) => {
  const pdfLink = (data.policy || data.scheme || data.govtOrders).pdf
    ?.mediaItemUrl;
  return (
    <div className="polici-single-box">
      <div className="pdf-img">
        <Link href="#">
          <Image src="/assets/img/ave/pdf.png" alt="" width={23} height={30} />
        </Link>
      </div>
      <div className="polici-text">
        <p>{data.title}</p>
      </div>
      <div className="dot">
        <a
          href="#"
          id="navbarDropdownMenuLink"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i className="fas fa-ellipsis-v"></i>
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link className="dropdown-item" href={`${pdfLink}`} target="__blank">
            <a>
              <i className="far fa-folder"></i>Open in new tab
            </a>
          </Link>
          <Link className="dropdown-item" href={`${pdfLink}`}>
            <a>
              <i className="fas fa-download"></i>Download file
            </a>
          </Link>
          <Link
            className="dropdown-item"
            href="#"
            onClick={() => {
              navigator.clipboard.writeText(pdfLink);
            }}
          >
            <a>
              <i className="fas fa-link"></i>Copy link
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PolicyCard;

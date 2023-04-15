import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const StartNetworking = (props) => {
  return (
    <>
      {props.data.map((item, index) => (
        <div class="col-lg-4 col-md-6 mt-3" key={index}>
          <div class="net-single-box">
            <div class="net-icon">
              <Link href="#">
                <a>
                  <Image
                    src={item.image.sourceUrl}
                    width="68"
                    height="68"
                    alt="networking icon"
                  />
                </a>
              </Link>
            </div>
            <div class="net-containt">
              <h3>{item.title}</h3>
              <p style={{ textAlign: 'justify' }}>{item.description}</p>
              <Link href={item.button ? item.button.url : '#'}>
                <a className="mb-2">{item.button.title}</a>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default StartNetworking;

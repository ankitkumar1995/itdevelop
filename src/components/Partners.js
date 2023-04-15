import Link from 'next/link';
import Image from 'next/image';
const Partners = (props) => {
  return (
    <div className={`cool-area ${props.pageClass}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {props.grassroot ? (
              <div className={`single-cool ${props.class1}`}>
                {props.index == 1 ? (
                  <>
                    <div className="col-img">
                      <Image
                        src={props.image}
                        width={362}
                        height={340}
                        layout="intrinsic"
                        quality={90}
                      />
                    </div>
                    <div className="cool-text">
                      <h3>{props?.title}</h3>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: ` <p>${props.description} </p>`,
                        }}
                      />
                      <Link href="#">
                        <a className="partner_apply_btn">
                          {props?.button?.title}
                        </a>
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="cool-text">
                      <h3>{props?.title}</h3>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: ` <p>${props.description} </p>`,
                        }}
                      />
                      <Link href="#">
                        <a className="partner_apply_btn my-2">
                          {props?.button?.title}
                        </a>
                      </Link>
                    </div>
                    <div className="col-img">
                      <Image
                        src={props.image}
                        width={387}
                        height={336}
                        layout="intrinsic"
                      />
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className={`single-cool ${props.class1}`}>
                {props.index == 1 ? (
                  <>
                    <div className="col-img">
                      <Image
                        src={props.image}
                        width={366}
                        height={392}
                        layout="intrinsic"
                        quality={90}
                      />
                    </div>
                    <div className="cool-text">
                      <h3>{props?.title}</h3>
                      <p>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: props?.description,
                          }}
                        />
                      </p>
                      <Link href={props?.button?.url ? props.button.url : '#'}>
                        <a className="partner_apply_btn">
                          {props?.button?.title}
                          {props.btnIcon && (
                            <i
                              class="fas fa-arrow-right"
                              style={{ fontSize: '14px', marginLeft: '6px' }}
                            ></i>
                          )}
                        </a>
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    {props.index === props.partnerLength ? (
                      <>
                        <div className="cool-text">
                          <h3>{props?.title}</h3>
                          <p>
                            {' '}
                            <div
                              dangerouslySetInnerHTML={{
                                __html: props?.description,
                              }}
                            />
                          </p>
                          <Link
                            href={props?.button?.url ? props.button.url : '#'}
                          >
                            <a className="partner_apply_btn my-2">
                              {props?.button?.title}
                              {props.btnIcon && (
                                <i
                                  class="fas fa-arrow-right"
                                  style={{
                                    fontSize: '14px',
                                    marginLeft: '6px',
                                  }}
                                ></i>
                              )}
                            </a>
                          </Link>
                        </div>
                        <div className="col-img">
                          <Image
                            src={props.image}
                            width={384}
                            height={269}
                            layout="intrinsic"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="cool-text">
                          <h3>{props?.title}</h3>
                          <p>
                            {' '}
                            <div
                              dangerouslySetInnerHTML={{
                                __html: props?.description,
                              }}
                            />
                          </p>
                          <Link
                            href={props?.button?.url ? props.button.url : '#'}
                          >
                            <a className="partner_apply_btn my-2">
                              {props?.button?.title}
                              {props.btnIcon && (
                                <i
                                  class="fas fa-arrow-right"
                                  style={{
                                    fontSize: '14px',
                                    marginLeft: '6px',
                                  }}
                                ></i>
                              )}
                            </a>
                          </Link>
                        </div>
                        <div className="col-img">
                          <Image
                            src={props.image}
                            width={384}
                            height={397}
                            layout="intrinsic"
                          />
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Partners;

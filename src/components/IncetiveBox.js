import Link from 'next/link';

const IncentiveBox = ({ title, listData, incentiveName, formHref, image }) => {
  return (
    <div className="incentive-card">
      <div className="incentive-card-content">
        <div>
          <div className="incentive-card-image">
            <img src={image} />
          </div>
          <div className="incentive-btn">
            <h3>
              <div dangerouslySetInnerHTML={{ __html: title }} />
            </h3>
          </div>
        </div>
      </div>
      <div className="incentive-application-status">
        {listData !== null ? (
          <div
            style={{
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0 10px',
                paddingRight: '20px',
              }}
            >
              <div>
                <h2>Application</h2>
              </div>
              <div>
                <h2>Status</h2>
              </div>
            </div>
            <div className="application-name" style={{ paddingLeft: '10px' }}>
              {listData?.map((item, index) => (
                <>
                  {item.appStatus === 'Rejected' && (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <p>application {index + 1}</p>
                      </div>
                      <div className="application draft">
                        <p style={{ backgroundColor: 'red' }}>Rejected</p>
                      </div>
                    </div>
                  )}
                  {item.appStatus === 'Draft' && (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <p>application {index + 1}</p>
                      </div>
                      <div className="application draft">
                        <p style={{ backgroundColor: '#F6BE00' }}>
                          In-complete
                        </p>
                      </div>
                    </div>
                  )}
                  {item.appStatus === ('Pending' || 'Submitted') && (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <p>Application {index + 1}</p>
                      </div>
                      <div className="application draft">
                        <p style={{ backgroundColor: '#800020' }}>Submitted</p>
                      </div>
                    </div>
                  )}
                  {item.appStatus === ('Accepted' || 'Approved') && (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <p>Application {index + 1}</p>
                      </div>
                      <div className="application draft">
                        <p style={{ backgroundColor: ' #00FF00.' }}>
                          Submitted
                        </p>
                      </div>
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        ) : (
          <div
            style={{ textAlign: 'center', fontWeight: '600', marginTop: '12%' }}
          >
            <p>you haven't apply for {incentiveName} </p>
          </div>
        )}
        <div
          className={
            listData !== null ? 'incentive-btn mt-3' : 'incentive-btn-empty'
          }
        >
          {listData?.length > 0 ? (
            <>
              {listData[listData?.length - 1].appStatus === 'Draft' && (
                <Link href={formHref}>
                  <a className="theme-btn">Continue Applying</a>
                </Link>
              )}
              {(listData[listData?.length - 1].appStatus === 'Pending' ||
                listData[listData?.length - 1].appStatus === 'Accepted' ||
                listData[listData?.length - 1].appStatus === 'Approved' ||
                listData[listData?.length - 1].appStatus === 'Submitted') && (
                <Link href={formHref}>
                  <a className="theme-btn">Apply now</a>
                </Link>
              )}
            </>
          ) : (
            <Link href={formHref}>
              <a className="theme-btn">Apply now</a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default IncentiveBox;

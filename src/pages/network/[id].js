import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import PageBanner from '../../components/PageBanner';
import Layout from '../../components/Layout';
import CategoryFilter from '../../components/Filter/CategoryFilter/CategoryFilter';
import NetworkCard from '../../components/Cards/NetworkCard';
import serviceHandler from '../../lib/serviceHandler';
import filterJSON from './filters.json';
import InfiniteScroll from 'react-infinite-scroll-component';
import NiceSelect from '../../components/Select/NiceSelect';
import { slugify } from '../../utils/slugify';
import { getNetworkPage, getNetworkPageKN } from '../../lib/api';
import { useRouter } from 'next/router';
import Loading from '../../components/CommonLoader/Loading';
const mediaNav = [
  {
    key: 'startup',
    title: 'Startups',
    href: '/network/startup',
  },
  {
    key: 'investor',
    title: 'Investors',
    href: '/network/investor',
  },
  {
    key: 'incubator',
    title: 'Incubators',
    href: '/network/incubator',
  },
  {
    key: 'mentor',
    title: 'Mentors',
    href: '/network/mentor',
  },
  {
    key: 'partner',
    title: 'Partners',
    href: '/network/partner',
  },
];

const network = ({ networkData, networkDataKN }) => {
  const [path, setPath] = useState('en');
  const [tdata, setTData] = useState(networkData);
  const router = useRouter();
  const handleData = () => {
    if (
      router.asPath === `/network/startup?en` ||
      router.asPath === `/network/investor?en` ||
      router.asPath === `/network/investor?en` ||
      router.asPath === '/network/mentor?en' ||
      router.asPath === '/network/partner?en'
    ) {
      setTData(networkDataKN);
      setPath('kn');
    } else {
      setTData(networkData);
      setPath('en');
    }
  };

  useEffect(() => {
    router.push(`/network/${router.query.id}?${slugify(path)}`, undefined, {
      shallow: true,
    });
  }, [path]);

  let [details, setDetails] = useState({});
  let [active, setActive] = useState(router.query.id);
  let [search, setSearch] = useState('');
  let [sort, setSort] = useState(1);
  let [filterList, setFilterList] = useState({});
  let [apifilter, setApifilter] = useState([]);
  let [removedKey, setRemovedkey] = useState('');
  let [clearAll, setClearAll] = useState(false);
  let [defaultValue, setDefaultvalue] = useState({
    value: '1',
    label: 'A to Z',
  });
  let [type, setType] = useState('');
  useEffect(() => {
    reset();
    //sortedAlphabeticalOrder();
    setClearAll(false);
  }, [active]);

  useEffect(() => {
    setDetails({
      loading: true,
    });
    setClearAll(false);
    fetchDetails(active, {
      pageNo: 1,
      ...apifilter,
      sort: sort,
    });
  }, [active, apifilter, search, sort]);

  const reset = () => {
    setSearch('');
    setFilterList({});
    setApifilter([]);
    setSort(1);
    setDefaultvalue({
      value: '1',
      label: 'A to Z',
    });
    setClearAll(true);
  };

  const setFilters = (type, list) => {
    let object = { ...apifilter };
    object[type] = _.map(list, (item) => item.key);
    let display_filter = { ...filterList };
    display_filter[type] = list;
    setFilterList(display_filter);
    setApifilter(object);
  };

  const removeFilter = (type, value) => {
    let list = { ...filterList };
    list[type] = _.filter(filterList[type], (key) => key !== value);
    setFilterList(list);
    let object = { ...apifilter };
    object[type] = _.filter(apifilter[type], (key) => key !== value.key);
    setApifilter(object);
    setRemovedkey(value.key + '_' + active + '_' + type);
  };

  const fetchDetails = (active, filter) => {
    switch (active) {
      case 'investor':
        fetchInvestors(filter);
        break;
      case 'incubator':
        fetchIncubators(filter);
        break;
      case 'mentor':
        fetchMentors(filter);
        break;
      case 'partner':
        fetchPartners(filter);
        break;
      default:
        fetchStartUpdetails(filter);
        break;
    }
  };

  const fetchStartUpdetails = (filter) => {
    serviceHandler
      .get(`/api/v1/startup/find?filter=` + JSON.stringify(filter))
      .then((res) => {
        if (res.status === 'success') {
          let list = [];

          res.body.startupData.forEach((item) => {
            if (item.registeration && item.registeration.nameAndIntro) {
              let reg = item.registeration;
              list.push({
                img: reg.nameAndIntro.companyLogo,
                title: reg.nameAndIntro.incorporatedCompanyName
                  ? reg.nameAndIntro.incorporatedCompanyName
                  : 'N/A',
                sub_line_1: reg.industryInfo.productOrServiceBased,
                sub_line_2: reg.industryInfo.industrySectorType,
                profile: `/network/startup/${item._id}`,
                rating: false,
                tagline: reg.nameAndIntro.companyTagLine,
              });
            }
          });
          let data = {};
          data['count'] = res.body.count;
          data['loadMore'] = res.body.loadMore;
          data['list'] = list.filter((item) => {
            if (item.title === '') {
              return item;
            } else if (
              item.title.toLowerCase().includes(search.toLowerCase())
            ) {
              return item;
            }
          });
          data['loading'] = false;
          data['img_type'] = 'icon';
          setDetails(data);
        }
      });
  };
  const fetchInvestors = (filter) => {
    serviceHandler
      .get('/api/v1/investor/find?filter=' + JSON.stringify(filter))
      .then((res) => {
        if (res.status === 'success') {
          let list = [];
          res.body.investorData.forEach((item) => {
            if (item.registeration && item.registeration.investorIntro) {
              let reg = item.registeration;
              list.push({
                img: reg.investorIntro.logo,
                title: reg.investorIntro.firmName,
                sub_line_1: reg.investorIntro.investorType,
                sub_line_2: `Fund between ${reg.investmentDetails.investmentRange}`,
                profile: `/network/investor/${item._id}`,
                tagline: reg.investorIntro.tagline,
              });
            }
          });
          let data = {};
          data['count'] = res.body.count;
          data['loadMore'] = res.body.loadMore;
          data['list'] = list;
          data['loading'] = false;
          data['img_type'] = 'icon';
          setDetails(data);
        }
      });
  };

  const fetchIncubators = (filter) => {
    serviceHandler
      .get('/api/v1/incubator/find?filter=' + JSON.stringify(filter))
      .then((res) => {
        if (res.status === 'success') {
          let list = [];

          res.body.incubatorData.forEach((item) => {
            if (item && item.registeration) {
              list.push({
                img: item.registeration.intro.photos[0],
                title: item.registeration?.name,
                sub_line_1:
                  item.registeration?.intro.address +
                  ' (' +
                  (item.registeration.amenitiesOrEvents
                    ? item.registeration.amenitiesOrEvents?.totalSeats
                    : 'N/A') +
                  ')',
                profile: `/network/incubator/${item._id}`,
                tagline: item.registeration?.intro?.tagline,
              });
            }
          });
          let data = {};
          data['count'] = res.body.count;
          data['loadMore'] = res.body.loadMore;
          data['list'] = list;
          data['loading'] = false;
          setDetails(data);
        }
      });
  };

  const fetchMentors = (filter) => {
    serviceHandler
      .get('/api/v1/mentor/find?filter=' + JSON.stringify(filter))
      .then((res) => {
        if (res.status === 'success') {
          let list = [];
          res.body.mentorData.forEach((item) => {
            if (item && item.registeration) {
              list.push({
                img: `/assets/img/mentor.jpeg`,
                title: item.registeration?.intro?.name,
                sub_line_1: item.registeration?.experience.specialization,
                tagline: item.registeration?.intro?.aboutMentor,
                profile: `/network/mentor/${item._id}`,
                twitter: item.registeration?.intro?.twitterProfile,
                linkedin: item.registeration?.intro?.linkedInUrl,
                location: item?.registeration?.intro?.state,
              });
            }
          });
          let data = {};
          data['count'] = res.body.count;
          data['loadMore'] = res.body.loadMore;
          data['list'] = list.filter((item) => {
            if (item.title === '') {
              return item;
            } else if (
              item.title.toLowerCase().includes(search.toLowerCase())
            ) {
              return item;
            }
          });
          data['loading'] = false;
          data['align'] = 'center';
          data['type'] = 'mentor';
          setDetails(data);
        }
      });
  };
  const fetchPartners = (filter) => {
    serviceHandler
      .get('/api/v1/partner/find?filter=' + JSON.stringify(filter))
      .then((res) => {
        if (res.status === 'success') {
          let list = [];
          res.body.partnerData.forEach((item) => {
            if (item && item.registration) {
              list.push({
                img: item.registration?.partnerInfo?.comapnyLogo,
                title: item.registration?.partnerInfo?.companyName,
                profile: `/network/partner/${item._id}`,
                sub_line_1: item.registration?.partnerInfo?.partnerType,
                tagline:
                  item.registration?.partnerContactInfo
                    ?.contactPersoneDesignation,
                location: item.registration?.partnerContactInfo?.state,
                linkedin: item.registration?.partnerInfo?.comapnyLinkedInUrl,
                twitter: item.registration?.partnerInfo?.comapnyTwitterUrl,
              });
            }
          });
          let data = {};
          data['count'] = res.body.count;
          data['loadMore'] = res.body.loadMore;
          data['list'] = list.filter((item) => {
            if (item.title === '') {
              return item;
            } else if (
              item.title.toLowerCase().includes(search.toLowerCase())
            ) {
              return item;
            }
          });
          data['loading'] = false;
          data['align'] = 'center';
          data['type'] = 'mentor';
          setDetails(data);
        }
      });
  };
  const { title, subTitle, image } = tdata.page.commonBanner;
  // const {mediaNav} = tdata.page.network
  // const sortedAlphabeticalOrder = () => {
  //   if (type === 'asc') {
  //     details.sort();
  //
  //   } else if (type === 'desc') {
  //     alert('desc');
  //   } else {
  //
  //     setDetails(details);
  //   }
  // };
  return (
    <Layout handleChange={handleData} path={path}>
      <PageBanner
        networkBanner
        active={active}
        // setActive={(key) => setActive(key)}
        navTabs={mediaNav}
        loading={details.loading}
        className={'hero-area'}
        bgImage={`/assets/img/network-list.png`}
        title={title}
        desc={subTitle}
      />
      {active === 'incubator' && (
        <div className="container">
          <div className="download-pdf network">
            <a href={'/assets/Incubation USER Guide V1.pdf'} target={'_blank'}>
              <i className={`fas fa-file-download pdf`}></i>
              Incubator Connect Guidelines
            </a>
          </div>
        </div>
      )}
      {active === 'mentor' && (
        <div className="container">
          <div className="download-pdf network">
            <a href={'/assets/Mentor Connect Guide V1.pdf'} target={'_blank'}>
              <i className={`fas fa-file-download pdf`}></i>
              Mentor Connect Guidelines
            </a>
          </div>
        </div>
      )}
      <div className="tab-content" id="my-tabContent">
        <div>
          <div className="industry-area">
            <div className="container">
              <div className="row">
                <div className="col-lg-3">
                  <div className="industry-wrap">
                    <div className="industry-menu">
                      <ul>
                        {filterJSON[active].map((item, index) => {
                          return (
                            <>
                              <CategoryFilter
                                info={item}
                                key={index}
                                id={active + '_' + item.key}
                                active={active}
                                removedKey={removedKey}
                                clearAll={clearAll}
                                setFilters={(type, list) =>
                                  setFilters(type, list)
                                }
                              />
                            </>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="industry-inner">
                    <div className="industry-search">
                      <input
                        type="text"
                        placeholder={`Search for a particular ${active}`}
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                      />
                      <span>
                        <i className="fas fa-search"></i>
                      </span>
                    </div>
                    <div className="filter-wrap">
                      <p>Filters:</p>
                      {Object.keys(filterList)?.map((key) => {
                        return filterList[key].map((value) => (
                          <div
                            key={key + '_' + value.value}
                            className="filter-badge"
                          >
                            {value.value}{' '}
                            <span
                              className="close"
                              onClick={() => removeFilter(key, value)}
                            >
                              <img src="/assets/img/delete_symbol.svg" />
                            </span>
                          </div>
                        ));
                      })}
                      <div className="filter-btn">
                        <a href="#" onClick={() => reset()}>
                          Clear all
                        </a>
                      </div>
                    </div>
                    <div className="showing-wrap">
                      <div className="sinle-showing">
                        <p>
                          Showing {details.count} of {details.count} {active}
                        </p>
                      </div>
                      <div className="shoing-slct nice-div">
                        <div>Sort By :</div>
                        <NiceSelect
                          defaultValue={defaultValue}
                          setSelected={(option) => setSort(option.value)}
                          options={[
                            {
                              value: '1',
                              label: 'A to Z',
                              setType: (t) => setType(t),
                              //sortFunc: () => sortedAlphabeticalOrder(),
                            },
                            {
                              value: '-1',
                              label: 'Z to A',
                              setType: (t) => setType(t),
                              //sortFunc: () => sortedAlphabeticalOrder(),
                            },
                          ]}
                        />
                      </div>
                    </div>
                    {details.loading ? (
                      <div className="loding-wrap">
                        <p>
                          <i className="fas fa-spinner fa-pulse" />
                          <div>Hang on, loading content</div>
                        </p>
                      </div>
                    ) : (
                      <div className="vox-wrap" id="scrollableDiv">
                        <InfiniteScroll
                          dataLength={details.count ? details.count : 0}
                          next={() =>
                            fetchDetails(active, {
                              pageNo: 1,
                              ...apifilter,
                              search: search,
                              sort: sort,
                            })
                          }
                          hasMore={details.loadMore}
                          scrollableTarget="scrollableDiv"
                          loader={
                            <div className="loding-wrap pb-3">
                              <p>
                                <i className="fas fa-spinner fa-pulse" />
                                <div>Hang on, loading content</div>
                              </p>
                            </div>
                          }
                          endMessage={
                            details.list && details.list.length ? (
                              <div className="loding-wrap pb-3">
                                <p>
                                  <div>You have seen it all!</div>
                                </p>
                              </div>
                            ) : null
                          }
                        >
                          {details.list && details.list.length ? (
                            <div className="box-fx">
                              <div className="row">
                                {details.list.map((item, index) => {
                                  return (
                                    <NetworkCard
                                      networkClass={'mentor'}
                                      data={details}
                                      company={item}
                                      key={index}
                                      userType={details?.type}
                                    />
                                  );
                                })}
                              </div>
                            </div>
                          ) : (
                            <div className="text-center p-3">No data found</div>
                          )}
                        </InfiniteScroll>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default network;
export const getStaticProps = async (context) => {
  const networkData = await getNetworkPage();
  const networkDataKN = await getNetworkPageKN();
  return {
    props: {
      networkData: networkData,
      networkDataKN: networkDataKN,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
};

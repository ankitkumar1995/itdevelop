const StatisticsCard = ({ icon, logo, title, ytd, mtd }) => {
  return (
    <div className="stat_box">
      <div className="stat_wrap">
        <div className="stat_img">
          <div className="stat_icon">
            <img src={icon} alt="..." />
          </div>
          <div className="stat_logo">
            <img src={logo} alt="..." />
          </div>
        </div>
        <div className="stat_content">
          <div
            dangerouslySetInnerHTML={{ __html: title }}
            className="stat_title"
          />
          <div
            className="stat_date"
            style={{ justifyContent: 'space-between' }}
          >
            <div dangerouslySetInnerHTML={{ __html: ytd }} />
            &nbsp;
            <div dangerouslySetInnerHTML={{ __html: mtd }} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default StatisticsCard;

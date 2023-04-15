const WidgetHeader = (props) => {
  return (
    <div className="sub-fx-menu">
      <div className="single-sub">
        <div className="su-ti">
          <p>{props?.label}</p>
        </div>
        <div className="sub-list">
          <ul>
            {props?.data.map((item, index) => (
              <li key={index}>
                <a href={item.navLink.url}>{item.navLink.title}</a>
              </li>
            ))}
            {/* <li>
              <a href="/policies" style={{ color: '#ef6950' }}>
                Schemes & policies...
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WidgetHeader;

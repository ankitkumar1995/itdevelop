const WidgetBox = (props) => {
  return (
    <>
      {props.displayMegaMenu ? (
        <>
          <p>{props?.data?.label}</p>
          <div className="list pb-2">
            <ul>
              {props?.data?.navItems.map((item, index) => (
                <li key={index}>
                  <a href={item.navItem?.url}>
                    <div
                      dangerouslySetInnerHTML={{ __html: item.navItem?.title }}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <>
          <p>{props?.label}</p>
          <div className="list pb-2">
            <ul>
              {props?.data?.map((item, index) => (
                <li key={index}>
                  {props.email ? (
                    <p style={{ color: '#fff' }}>{item?.navLink?.title}</p>
                  ) : (
                    <>
                      {props.pagePdf ||
                      item?.navLink?.title === 'Covid-19 Challenge' ? (
                        <a
                          href={props?.pagePdf ? props.pagePdf : '#'}
                          target="_blank"
                        >
                          {item?.navLink?.title}
                        </a>
                      ) : (
                        <a href={item?.navLink?.url}>{item?.navLink?.title}</a>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default WidgetBox;

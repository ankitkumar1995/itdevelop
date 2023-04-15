const NainObjective = ({item}) => {
  return (
    <div class="prog-area">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <div class="prog-fl-img">
              <div class="prog-single-img">
                <div className="row">
                  <div className="col-6">
                    <img
                      className="img-1"
                      src={item.cardImage.topImage.image1.sourceUrl}
                      alt=""
                    />
                  </div>
                  <div className="col-6">
                    <img
                      className="img-1"
                      src={item.cardImage.topImage.image2.sourceUrl}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div class="prog-single-img bot mt-3">
                    <img src={item.cardImage.bottomImage.sourceUrl} alt="" />
                  </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="prog-containt">
              <div class="reg-containt">
                <span>{item.cardTitle}</span>
                <h3>{item.cardSubtitle}</h3>
                <div class="prog-list">
                  <ul>
                    {item.cardList.map((items, index) => (
                      <li>
                        <i class="fas fa-check"></i>
                        {items.item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div class="reg-btn prog">
                  <a href={item.cardButton.url} class="theme-btn">
                    {item.cardButton.title}
                    <i class="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NainObjective
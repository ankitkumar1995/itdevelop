const IndustryTypeBox = ({ data }) => {
  return (
    <tr>
      {data.map((item, index) => (
        <td key={index}>
          <div className="tb-linl">
            <a href="#">{item.label}</a>
          </div>
          <div className="table-text">
            <p>{item.text}</p>
          </div>
        </td>
      ))}
    </tr>
  );
};
export default IndustryTypeBox;

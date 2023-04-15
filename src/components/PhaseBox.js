import Link from 'next/link';
const PhaseBox = ({ city, college, website, handleClick }) => {
  return (
      <div className="our_row">
        <div className="our_cell">
          
            <h3>City : </h3>
            <p>{city}</p>
          
        </div>

        <div className="our_cell">
          
            <h3>College : </h3>
            <p>{college}</p>
          
        </div>

        <div className="our_cell">
          
            <h3>Website : </h3>
            <a href={website}>{website}</a>
          
        </div>
        <div className="our_cell">
          <Link href="#">
            <a onClick={handleClick}>{'view detail'}</a>
          </Link>
        </div>
      </div>
  );
};
export default PhaseBox;

import Link from 'next/link';
const SocialIcon = (props) => {
  return (
    <>
      {props.data.map((item, index) => (
        <Link href="#">
          <a>
            <i className={item.icon.title}></i>
          </a>
        </Link>
      ))}
    </>
  );
};

export default SocialIcon;

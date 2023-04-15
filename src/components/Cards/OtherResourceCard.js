import React from 'react';
import Card from '@material-ui/core/Card';
import Link from 'next/link';
import Image from 'next/image';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: 262,
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
  },

  title: {
    color: '#120F2D',
    fontfamily: 'Manrope',
    fontSize: 10,
    fontWeight: 'bold',
    paddingTop: 5,
  },
}));

const OtherResourceCard = (props) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <div className="resource-fx">
          <div className="resource-single-box">
            <div className="pdf-img">
              <Link href="#">
                <Image src={props?.pdfLogo} alt="" width={23} height={30} />
              </Link>
            </div>

            <div className="logo-img">
              <Link href="#">
                <Image
                  src={props?.companyLogo}
                  alt=""
                  width={91.2}
                  height={20}
                  layout="fixed"
                  paddingTop={700}
                />
              </Link>

              <div className="dot">
                <a
                  href="#"
                  id="navbarDropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-ellipsis-v"></i>
                </a>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <Link
                    className="dropdown-item"
                    href={props.data.node.otherResourceItem.pdf.mediaItemUrl}
                  >
                    <a target="_blank">
                      <i className="fas fa-folder-plus"></i>Open in new tab
                    </a>
                  </Link>
                  <Link
                    className="dropdown-item"
                    href={props.data.node.otherResourceItem.pdf.mediaItemUrl}
                  >
                    <a target="_blank">
                      <i className="fas fa-download"></i>Download file
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Typography className={classes.title}>
          {props.data.node.otherResourceItem.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OtherResourceCard;

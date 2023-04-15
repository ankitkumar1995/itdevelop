import React, { useState } from 'react';
import Popup from '../Popup';
import ScreenReader from '../ScreenReader';
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

const MobileHeader = (props) => {
  const [showModal, setShowModal] = useState(false);

  const [openKeys, setOpenKeys] = React.useState(['sub1']);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <>
      <div className={props.showMobileclass}>
        <div className="container-fluid mb_20">
          <div className="align-items-center d-flex top_bar">
            <div className="logo">
              <img
                src={'./assets/img/site-logo.png'}
                imgclassName="img-fluid"
              />
            </div>
            <div className="text-right">
              <a
                href="#"
                className="close_btn"
                onClick={() => props.setFullPageMobileMenu()}
              >
                ×
              </a>
            </div>
          </div>
          <div className="row page_menu">
            <div className="col-lg-3 col-md-4 col-sm-6 col-12">
              <Menu
                mode="inline"
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                style={{ width: 256 }}
              >
                <SubMenu
                  key="sub1"
                  icon={<MailOutlined />}
                  title="Navigation One"
                >
                  <Menu.Item key="1">Option 1</Menu.Item>
                  <Menu.Item key="2">Option 2</Menu.Item>
                  <Menu.Item key="3">Option 3</Menu.Item>
                  <Menu.Item key="4">Option 4</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  icon={<AppstoreOutlined />}
                  title="Navigation Two"
                >
                  <Menu.Item key="5">Option 5</Menu.Item>
                  <Menu.Item key="6">Option 6</Menu.Item>
                  <SubMenu key="sub3" title="Submenu">
                    <Menu.Item key="7">Option 7</Menu.Item>
                    <Menu.Item key="8">Option 8</Menu.Item>
                  </SubMenu>
                </SubMenu>
                <SubMenu
                  key="sub4"
                  icon={<SettingOutlined />}
                  title="Navigation Three"
                >
                  <Menu.Item key="9">Option 9</Menu.Item>
                  <Menu.Item key="10">Option 10</Menu.Item>
                  <Menu.Item key="11">Option 11</Menu.Item>
                  <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
              </Menu>
            </div>
          </div>
        </div>
      </div>
      <div className="reader_popup">
        <Popup
          show={showModal}
          onHide={() => setShowModal(false)}
          content={<ScreenReader handleClick={() => setShowModal(false)} />}
        />
      </div>
    </>
  );
};
export default MobileHeader;

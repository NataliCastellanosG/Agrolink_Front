import React from 'react';
import {Link} from 'react-router-dom';
import {Layout, Menu, Typography} from 'antd';
import {HomeOutlined, MenuOutlined} from '@ant-design/icons';

import './MenuSider.scss';

export default function MenuSider(props){

    const {menuCollapsed} = props;
    const {Sider} = Layout;

    return(
        <Sider className="admin-sider" collapsed={menuCollapsed}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                <Menu.Item key="1"> 
                    <Link to={"/admin"}></Link>
                    <HomeOutlined />
                    <Typography component={'span'} className="nav-text">Home</Typography>
                </Menu.Item>
                <Menu.Item key="2"> 
                    <Link to={"/admin/MenuWeb"}></Link>
                    <MenuOutlined />
                    <Typography component={'span'} className="nav-text">Menú Web</Typography>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}

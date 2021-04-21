import React from 'react';
import {Button, Typography} from 'antd';
import {MenuFoldOutlined, MenuUnfoldOutlined, PoweroffOutlined} from '@ant-design/icons';

import PlazaMercadoLogo from '../../../assets/img/png/LOGO_VERDE.png';
import './MenuTop.scss';

export default function MenuTop(props){

    const {menuCollapsed, setMenuCollapsed} = props;
    return(
        <Typography component={'div'} className="menu-top">
            <Typography component={'div'} className= "menu-top__left">
                <img 
                className="menu-top__left-logo"
                src={PlazaMercadoLogo}
                alt="Logo Plaza Mercado"
                />
                <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
                    {menuCollapsed ? <MenuUnfoldOutlined />: <MenuFoldOutlined />  }
                </Button>
            </Typography>
            <Typography component={'div'} className= "menu-top__left">
            <Button type="link">
                    <PoweroffOutlined />
                </Button>
            </Typography>
        </Typography>
    );

}
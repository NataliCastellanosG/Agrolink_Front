import React from 'react';
import { Redirect, Route, Switch} from 'react-router-dom';
import { Col, Layout, Menu, Row, Typography} from 'antd';


//import MenuTop from '../components/Admin/MenuTop';
//import MenuSider from '../components/Admin/MenuSider';
import Logo from '../assets/img/png/LOGO_FINAL.png';

//import useAuth from '../hooks/useAuth';
import AdminSignIn from '../pages/Admin/SignIn';

import "./LayoutAdmin.scss";


export default function LayoutAdmin({routes}){

    const { Header, Content, Footer } = Layout;
    const empresa = null;
    //const {empresa, isloading} = useAuth();

    if(!empresa){
        return(
            <>
            <Route path="/admin/login" component={AdminSignIn}/>
            <Redirect to="/admin/login"/>
            </>
        );
    }
    if(empresa ){
        return(
            <Layout className="layout-admin">
                <Row>
                    <Col span={24} className="layout-admin__img">
                    </Col>
                    <Header className="layout-admin__header">
                        <Col flex="auto" style={{padding:"0px 0px 0px 45px"}}>
                                <img className="layout-admin__menu-logo" src={Logo} alt="Logo Plaza Mercado"  />                                      
                        </Col>
                        <Col span={10}>
                            <Typography.Paragraph className="layout-admin__menu-title">
                                <Typography variant="h1" className="layout-admin__menu-title-h1">AGROLINK B2B</Typography>
                                <Typography variant="h2" className="layout-admin__menu-title-h2">MARCKETPLACE</Typography>
                            </Typography.Paragraph>
                        </Col>
                        <Col span={11} className="layout-admin__menu-right">
                            <Menu className="layout-admin__menu-right-items" mode="horizontal" defaultSelectedKeys={['2']}>
                                <Menu.Item key="1">INICIO</Menu.Item>
                                <Menu.Item key="2">PRODUCTO</Menu.Item>
                                <Menu.Item key="3">PROVEEDOR</Menu.Item>
                                <Menu.Item key="4"> PERFIL </Menu.Item>
                            </Menu>
                        </Col>    
                    </Header>
                </Row>
                <Content className ="layout-admin__content">
                    <LoadRoutes routes= {routes}/>
                </Content>
                <Row style={{background:"#fff"}}>
                    <Col span={24} className="layout-admin__footer-row">
                    </Col>
                </Row>
                <Footer className="layout-admin__footer">
                    <Row>
                        <Col span={24} className="layout-admin__footer-img">
                        </Col>
                    </Row>
                </Footer>
            </Layout>
        );
    }
    return null;
}

function LoadRoutes({routes}){

    return (
        <Switch>
            {routes.map((route, index)=> (
                <Route
                    key={index}
                    path = {route.path}
                    exact = {route.exact}
                    component = {route.component}
                />
            ))}
        </Switch>
    );
}
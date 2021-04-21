import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { Row, Col, Layout, Menu, Typography } from "antd";

import Logo from "../assets/img/png/LOGO_FINAL.png";

import "./LayoutBasic.scss";

export default function LayoutBasic({ routes }) {
  const { Header, Content, Footer } = Layout;

  return (
    <Layout className="layout-basic">
      <Row>
        <Col span={24} className="layout-basic__img"></Col>
        <Header className="layout-basic__header">
          <Col flex="auto" style={{ padding: "0px 0px 0px 45px" }}>
            <img
              className="layout-basic__menu-logo"
              src={Logo}
              alt="Logo Plaza Mercado"
            />
          </Col>
          <Col span={10}>
            <Typography.Paragraph className="layout-basic__menu-title">
              <Typography variant="h1" className="layout-basic__menu-title-h1">
                AGROLINK B2B
              </Typography>
              <Typography variant="h2" className="layout-basic__menu-title-h2">
                MARCKETPLACE
              </Typography>
            </Typography.Paragraph>
          </Col>
          <Col span={11} className="layout-basic__menu-right">
            <Menu
              className="layout-basic__menu-right-items"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
            >
              <Menu.Item key="1">INICIO</Menu.Item>
              <Menu.Item key="2">PRODUCTOS</Menu.Item>
              <Menu.Item key="3">PROVEEDORES</Menu.Item>
              <Menu.Item key="4">
                <Link to={"/activo"}> PERFIL</Link>
              </Menu.Item>
            </Menu>
          </Col>
        </Header>
      </Row>
      <Content>
        <Col span={24} className="layout-basic__fondo"></Col>
        <Col span={24} className="layout-basic__footer-row"></Col>
      </Content>
      <Footer className="layout-basic__footer">
        <Row>
          <Col span={24} className="layout-basic__footer-img"></Col>
        </Row>
      </Footer>
    </Layout>
  );
}

function LoadRouters({ routes }) {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
}

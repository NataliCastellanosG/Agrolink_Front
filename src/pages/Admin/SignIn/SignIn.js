import React from "react";
import { Col, Layout, Row, Tabs, Typography } from "antd";
import { Redirect } from "react-router-dom";

import Logo from "../../../assets/img/png/LOGO_FINAL.png";
import RegisterForm from "../../../components/Admin/RegistrarEmpresa";
import Sesion from "../../../components/Admin/InicioSesion";
import { getAccessTokenApi } from "../../../api/auth";

import "./SignIn.scss";

export default function SignIn() {
  const { Content, Footer, Header } = Layout;
  const { TabPane } = Tabs;

  if (getAccessTokenApi()) {
    return <Redirect to="/admin" />;
  }

  return (
    <Layout className="sign-in">
      <Row>
        <Col span={24} className="sign-in__img"></Col>
        <Header className="sign-in__header">
          <Col flex="auto" style>
            <img
              className="sign-in__menu-logo"
              src={Logo}
              alt="Logo Plaza Mercado"
            />
          </Col>
          <Col span={21}>
            <Typography.Paragraph className="sign-in__menu-title">
              <Typography variant="h1" className="sign-in__menu-title-h1">
                AGROLINK B2B
              </Typography>
              <Typography variant="h2" className="sign-in__menu-title-h2">
                MARCKETPLACE
              </Typography>
            </Typography.Paragraph>
          </Col>
        </Header>
      </Row>
      <Content className="sign-in__content">
        <Typography component={"div"} className="sign-in__content-tabs">
          <Tabs type="card">
            <TabPane
              tab={<Typography component={"span"}>INICIAR SESIÓN</Typography>}
              key="1"
            >
              <Sesion />
            </TabPane>
            <TabPane
              tab={<Typography component={"span"}>NUEVA EMPRESA</Typography>}
              key="2"
            >
              <RegisterForm />
            </TabPane>
          </Tabs>
        </Typography>
      </Content>
      <Row>
        <Col span={24} className="sign-in__footer-row"></Col>
      </Row>
      <Footer className="sign-in__footer">
        <Row>
          <Col span={24} className="sign-in__footer-img"></Col>
        </Row>
      </Footer>
    </Layout>
  );
}

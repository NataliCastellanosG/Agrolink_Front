import React from "react";
import { Link, Redirect, Route, Switch, withRouter } from "react-router-dom";
import { Button, Col, Dropdown, Layout, Menu, Row, Typography } from "antd";

import Logo from "../assets/img/png/LOGO_FINAL.png";

import useAuth from "../hooks/useAuth";
import AdminSignIn from "../pages/Admin/SignIn";
import { logout } from "../api/auth";

import "./LayoutAdmin.scss";

function LayoutAdmin(props) {
  const { routes } = props;

  const { Header, Content, Footer } = Layout;
  const { empresa, isloading } = useAuth();

  const logoutEmpresa = () => {
    logout();
    window.location.href = "/";
  };

  if (!empresa && !isloading) {
    return (
      <>
        <Route path="/activo/login" component={AdminSignIn} />
        <Redirect to="/activo/login" />
      </>
    );
  }
  if (empresa && !isloading) {
    const menu = (
      <Menu className="layout-admin__menu-right-dropdown">
        <Menu.Item>
          <Link to={"/activo/proveedor"}>
            <Typography
              component={"span"}
              className="layout-admin__menu-right-dropdown-item"
            >
              VER PERFIL
            </Typography>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link
            onClick={logoutEmpresa}
            className="layout-admin__menu-right-dropdown-item"
          >
            <Typography component={"span"}>CERRAR SESIÓN</Typography>
          </Link>
        </Menu.Item>
      </Menu>
    );

    localStorage.setItem("id", empresa.id);
    console.log(localStorage.getItem("id"));
    if (empresa.rol === "comprador") {
      return (
        <Layout className="layout-admin">
          <Row>
            <Col span={24} className="layout-admin__img"></Col>
            <Header className="layout-admin__header">
              <Col span={2}>
                <img
                  className="layout-admin__menu-logo"
                  src={Logo}
                  alt="Logo Plaza Mercado"
                />
              </Col>
              <Col span={10}>
                <Typography.Paragraph className="layout-admin__menu-title">
                  <Typography
                    variant="h1"
                    className="layout-admin__menu-title-h1"
                  >
                    AGROLINK B2B
                  </Typography>
                  <Typography
                    variant="h2"
                    className="layout-admin__menu-title-h2"
                  >
                    MARCKETPLACE
                  </Typography>
                </Typography.Paragraph>
              </Col>
              <Col span={11} className="layout-admin__menu-right">
                <Menu
                  className="layout-admin__menu-right-items"
                  mode="horizontal"
                  defaultSelectedKeys={[props.location.pathname]}
                >
                  <Menu.Item key="/activo">
                    <Link to={"/activo"}>INICIO</Link>
                  </Menu.Item>
                  <Menu.Item key="2">PRODUCTO</Menu.Item>
                  <Menu.Item key="3">PROVEEDOR</Menu.Item>
                  <Menu.Item key="4">
                    <Dropdown overlay={menu} placement="bottomCenter">
                      <Button>PERFIL</Button>
                    </Dropdown>
                  </Menu.Item>
                </Menu>
              </Col>
            </Header>
          </Row>
          <Content className="layout-admin__content">
            <LoadRoutes routes={routes} />
          </Content>
          <Footer className="layout-admin__footer">
            <Row>
              <Col span={24} className="layout-admin__footer-img"></Col>
            </Row>
          </Footer>
        </Layout>
      );
    } else {
      if (empresa.rol === "vendedor") {
        return (
          <Layout className="layout-admin">
            <Row>
              <Col span={24} className="layout-admin__img"></Col>
              <Header className="layout-admin__header">
                <Col span={2}>
                  <img
                    className="layout-admin__menu-logo"
                    src={Logo}
                    alt="Logo Plaza Mercado"
                  />
                </Col>
                <Col span={10}>
                  <Typography.Paragraph className="layout-admin__menu-title">
                    <Typography
                      variant="h1"
                      className="layout-admin__menu-title-h1"
                    >
                      AGROLINK B2B
                    </Typography>
                    <Typography
                      variant="h2"
                      className="layout-admin__menu-title-h2"
                    >
                      MARCKETPLACE
                    </Typography>
                  </Typography.Paragraph>
                </Col>
                <Col span={11} className="layout-admin__menu-right">
                  <Menu
                    className="layout-admin__menu-right-items"
                    mode="horizontal"
                    defaultSelectedKeys={[props.location.pathname]}
                  >
                    <Menu.Item key="/activo">
                      <Link to={"/activo"}>INICIO</Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Dropdown overlay={menu} placement="bottomCenter">
                        <Button>PERFIL</Button>
                      </Dropdown>
                    </Menu.Item>
                  </Menu>
                </Col>
              </Header>
            </Row>
            <Content className="layout-admin__content">
              <LoadRoutes routes={routes} />
            </Content>
            <Footer className="layout-admin__footer">
              <Row>
                <Col span={24} className="layout-admin__footer-img"></Col>
              </Row>
            </Footer>
          </Layout>
        );
      } else {
        return (
          <Layout className="layout-admin">
            <Row>
              <Col span={24} className="layout-admin__img"></Col>
              <Header className="layout-admin__header">
                <Col span={2}>
                  <img
                    className="layout-admin__menu-logo"
                    src={Logo}
                    alt="Logo Plaza Mercado"
                  />
                </Col>
                <Col span={10}>
                  <Typography.Paragraph className="layout-admin__menu-title">
                    <Typography
                      variant="h1"
                      className="layout-admin__menu-title-h1"
                    >
                      AGROLINK B2B
                    </Typography>
                    <Typography
                      variant="h2"
                      className="layout-admin__menu-title-h2"
                    >
                      MARCKETPLACE
                    </Typography>
                  </Typography.Paragraph>
                </Col>
                <Col span={11} className="layout-admin__menu-right">
                  <Menu
                    className="layout-admin__menu-right-items"
                    mode="horizontal"
                    defaultSelectedKeys={[props.location.pathname]}
                  >
                    <Menu.Item key="/activo">
                      <Link to={"/activo"}>INICIO</Link>
                    </Menu.Item>
                    <Menu.Item key="2">COMPRADOR</Menu.Item>
                    <Menu.Item key="3">PROVEEDOR</Menu.Item>
                    <Menu.Item key="4">
                      <Dropdown overlay={menu} placement="bottomCenter">
                        <Button>PERFIL</Button>
                      </Dropdown>
                    </Menu.Item>
                  </Menu>
                </Col>
              </Header>
            </Row>
            <Content className="layout-admin__content">
              <LoadRoutes routes={routes} />
            </Content>
            <Footer className="layout-admin__footer">
              <Row>
                <Col span={24} className="layout-admin__footer-img"></Col>
              </Row>
            </Footer>
          </Layout>
        );
      }
    }
  }
  return null;
}

function LoadRoutes({ routes }) {
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

export default withRouter(LayoutAdmin);

import React, { useState } from "react";
import { Button, Col, Input, Form, notification, Row, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../utils/constants";
import { signInApi } from "../../../api/empresa";

import "./Sesion.scss";

export default function LoginForm() {
  const [inputs, setInputs] = useState({
    correo_electronico: "",
    contrasena: "",
  });

  const changeForm = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e) => {
    const result = await signInApi(inputs);

    if (result.message) {
      notification["error"]({
        message: result.message,
      });
    } else {
      const { accessToken, refreshToken } = result;
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);

      notification["success"]({
        message: "Login correcto.",
      });
      window.location.href = "/activo";
    }
  };
  return (
    <Form className="sesion-form" onFinish={login} onChange={changeForm}>
      <Row gutter={16}>
        <Col className="gutter-row" span={24}>
          <Form.Item>
            <Input
              name="correo_electronico"
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
              placeholder="Correro electrónico"
              className="sesion-form__input"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={24}>
          <Form.Item>
            <Input
              name="contrasena"
              type="password"
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
              placeholder="Contraseña"
              className="sesion-form__input"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={24}>
          <Typography variant="h5" className="sesion-form__texto">
            ¿Olvidó su contraseña?
          </Typography>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={24}>
          <Form.Item>
            <Button htmlType="submit" className="sesion-form__button">
              INICIAR SESIÓN
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

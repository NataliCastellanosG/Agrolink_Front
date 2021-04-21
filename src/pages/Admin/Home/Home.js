import React from "react";
import { Col, Row, Typography } from "antd";

import "./Home.scss";

export default function Home() {
  return (
    <Row className="home">
      <Col span="24" className="home__fondo">
        <Typography className="home__fondo-titulo">
          LO MEJOR DEL CAMPO <br /> A UN SOLO CLIC
        </Typography>
      </Col>
      <Col span="24" className="home__row"></Col>
    </Row>
  );
}

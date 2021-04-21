import React from "react";

import { Card, Col, Row } from "antd";

const contentStyle = {
  height: "160px",
  color: "#000",
  lineHeight: "160px",
  textAlign: "center",
  background: "#fff",
  width: "240px",
};

export default function Home() {
  return (
    <Row className="home__content">
      <Col span="24" className="home__fondo"></Col>
      <Col span="24" className="home__row"></Col>
    </Row>
  );
}

import React from "react";

import { Col, Row } from "antd";

export default function Home() {
  return (
    <Row className="home__content">
      <Col span="24" className="home__fondo"></Col>
      <Col span="24" className="home__row"></Col>
    </Row>
  );
}

import React from "react";
import { Layout, Row } from "antd";

import RegistroProducto from "../../../../components/Admin/RegistrarProducto";

import "./RegistroProducto.scss";

export default function RegistrarProducto(props) {
  return (
    <Layout className="registro-producto">
      <Row className="registro-producto__row"></Row>
      <Row className="registro-producto__fondo">
        <Row className="registro-producto__fondo-contenido">
          <Row className="registro-producto__fondo-row-contenido">
            <RegistroProducto empresaid={props.location.row} />
          </Row>
        </Row>
      </Row>
      <Row className="registro-producto__row"></Row>
    </Layout>
  );
}

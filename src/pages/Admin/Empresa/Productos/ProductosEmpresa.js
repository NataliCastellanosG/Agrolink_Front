import React from "react";
import { Col, Layout, Row, Typography } from "antd";

//import Productos from '../../../components/Admin/RegistrarProducto';
//import InfoEmpresa from "../../../../components/Admin/InfoEmpresa";

import "./ProductosEmpresa.scss";

export default function InformacionEmpresa(props) {
  return (
    <Layout className="productos">
      <Row className="productos__row-alta">
        <Col className="productos__row-alta-medio">
          <Typography variant="h1" className="productos__row-alta-medio-h1">
            AGROLINK B2B
          </Typography>
        </Col>
      </Row>
      <Row className="productos__fondo">
        <Row className="productos__row-contenido"></Row>
      </Row>
    </Layout>
  );
}

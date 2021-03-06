import React from "react";
import { Col, Layout, Row, Typography } from "antd";

//import Productos from '../../../components/Admin/RegistrarProducto';
import InfoEmpresa from "../../../../components/Admin/InfoEmpresa";

import "./InfoEmpresa.scss";

export default function InformacionEmpresa(props) {
  return (
    <Layout className="info-empresa">
      <Row className="info-empresa__row-alta">
        <Col className="info-empresa__row-alta-medio">
          <Typography variant="h1" className="info-empresa__row-alta-medio-h1">
            AGROLINK B2B
          </Typography>
        </Col>
      </Row>
      <Row className="info-empresa__fondo">
        <Row className="info-empresa__row-contenido">
          <InfoEmpresa
            empresa={props.location.row.empresa}
            asociaciones={props.location.row.asociaciones}
          />
        </Row>
      </Row>
      <Row className="info-empresa__row-bajo"></Row>
    </Layout>
  );
}

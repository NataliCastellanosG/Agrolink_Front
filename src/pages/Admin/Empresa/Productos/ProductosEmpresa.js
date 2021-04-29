import React from "react";
import { Col, Layout, Row, Typography } from "antd";
import { Link } from "react-router-dom";

import Productos from "../../../../components/Admin/ListarProductos";

import "./ProductosEmpresa.scss";

export default function InformacionEmpresa(props) {
  var id = props.location.row[0];
  var productosActivos = props.location.row[1];
  var productosInactivos = props.location.row[2];

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
        <Row className="productos__row-contenido_1">
          <Link
            to={{
              pathname: "/activo/registrarProducto",
              row: id,
            }}
            className="productos__row-contenido_1-boton"
          >
            <Typography>
              AÑADIR <br />
              PRODUCTO
            </Typography>
          </Link>
        </Row>
        <Row className="productos__row-contenido_2">
          <Row className="productos__row-contenido_2-titulo">
            <Typography>PRODUCTOS</Typography>
          </Row>
          <Row className="productos__row-contenido_2-lista">
            <Productos
              productosActivos={productosActivos}
              productosInactivos={productosInactivos}
            />
          </Row>
        </Row>
      </Row>
    </Layout>
  );
}

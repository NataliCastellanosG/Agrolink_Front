import React, { useState, useEffect } from "react";
import { Col, Layout, Row, Typography } from "antd";
import { Link } from "react-router-dom";

//import Productos from '../../../components/Admin/RegistrarProducto';
//import InfoEmpresa from '../../../components/Admin/InfoEmpresa';

import { getAccessTokenApi } from "../../../api/auth";
import { mostrarEmpresaApi } from "../../../api/empresa";
import {
  mostrarProductosActivos,
  mostrarProductosInactivos,
} from "../../../api/producto";
import { mostrarAsociacionesApi } from "../../../api/asociacion";

import "./Empresa.scss";

export default function Empresa(props) {
  var id = props.location.row;

  const [empresa, setEmpresa] = useState();
  const [productosActivos, setProductosActivos] = useState([]);
  const [productosInactivos, setProductosInactivos] = useState([]);
  const [asociaciones, setAsociaciones] = useState([]);
  const token = getAccessTokenApi();

  useEffect(() => {
    mostrarEmpresaApi(token, id).then((response) => {
      setEmpresa(response.empresa);
    });
  }, [token, id]);

  useEffect(() => {
    mostrarProductosActivos(token, id, true).then((response) => {
      setProductosActivos(response);
    });
    mostrarProductosActivos(token, id, false).then((response) => {
      setProductosInactivos(response);
    });
  }, [token, id]);

  useEffect(() => {
    mostrarAsociacionesApi(token, true).then((response) => {
      setAsociaciones(response.asociaciones);
    });
  }, [token]);

  return (
    <Layout className="empresa">
      <Row className="empresa__row-alta">
        <Col className="empresa__row-alta-medio">
          <Typography variant="h1" className="empresa__row-alta-medio-h1">
            {" "}
            AGROLINK B2B
          </Typography>
        </Col>
      </Row>
      <Row className="empresa__fondo">
        <Row className="empresa__row">
          <Col span={12} className="empresa__col">
            <Link
              to={{
                pathname: "/activo/informacionProveedor",
                row: { empresa, asociaciones },
              }}
              className="empresa__col-button"
            >
              <Typography variant="h1" className="empresa__col-button-h1">
                FICHA <br /> TÉCNICA
              </Typography>
            </Link>
          </Col>
          <Col span={12} className="empresa__col">
            <Link
              to={{
                pathname: "/activo/proveedorProductos",
                row: [id, productosActivos, productosInactivos],
              }}
              className="empresa__col-button"
            >
              <Typography variant="h1" className="empresa__col-button-h1_2">
                PRODUCTOS
              </Typography>
            </Link>
          </Col>
        </Row>
      </Row>
      <Row className="empresa__row-baja"></Row>
    </Layout>
  );
}

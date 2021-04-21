import React, { useState, useEffect } from "react";
import { Layout, Row, Typography } from "antd";

import { getAccessTokenApi } from "../../../api/auth";
import { mostrarEmpresa } from "../../../api/empresa";

import "./InformacionEmpresa.scss";

export default function Informacion(props) {
  const [empresa, setEmpresa] = useState();
  const { id } = props;
  const token = getAccessTokenApi();

  useEffect(() => {
    mostrarEmpresa(token, id).then((response) => {
      console.log(response);
      setEmpresa(response);
    });
  }, [token, id]);

  console.log("empresa", empresa);
  return (
    <Layout className="informacion">
      <Row className="informacion__row-alta"></Row>
      <Row className="informacion__row-medio">
        <Typography variant="h1" className="informacion__row-medio-h1">
          FICHA TÉCNICA
        </Typography>
      </Row>
      <Row className="informacion__content" datasource={empresa}>
        <Typography.Paragraph>
          {empresa.asociacion ? empresa.asociacion : "..."}
        </Typography.Paragraph>
      </Row>
    </Layout>
  );
}

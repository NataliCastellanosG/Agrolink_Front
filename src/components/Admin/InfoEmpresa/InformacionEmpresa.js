import React from "react";
import { Layout, Row, Typography } from "antd";

import "./InformacionEmpresa.scss";

export default function Informacion(props) {
  const { empresa } = props;
  console.log("empresa", props.empresa._id);
  console.log("empresa2", empresa);
  return (
    <Layout className="informacion">
      <Row className="informacion__row-alta"></Row>
      <Row className="informacion__row-medio">
        <Typography variant="h1" className="informacion__row-medio-h1">
          FICHA TÉCNICA
        </Typography>
      </Row>
      <Row className="informacion__content">
        <Typography variant={"h1"} className="informacion__content-titulo">
          {empresa.nombre}
        </Typography>
        <Typography.Paragraph className="informacion__content-info">
          <b>NIT:</b> {empresa.nit}
          <br />
          <b>Asocación:</b> {empresa.asociacion}
          <br />
          <b>Representante legal:</b> {empresa.representante_legal}
          <br />
          <b>Cédula del representante legal:</b>
          {empresa.cedula_representante_legal}
          <br />
          <b>Correo electrónico</b> {empresa.correo_electronico}
          <br />
          <b>Ubicación</b> {empresa.departamento} ,{empresa.municipio},{" "}
          {empresa.direccion_empresa}
          <br />
          <b>Reseña:</b> {empresa.resena}
        </Typography.Paragraph>
      </Row>
    </Layout>
  );
}

import React, { useState, useEffect } from "react";
import { Layout, Row, Typography } from "antd";

import { getAccessTokenApi } from "../../../api/auth";
import { mostrarEmpresa } from "../../../api/empresa";

import "./InformacionEmpresa.scss";

export default function Informacion() {
  const [empresa, setEmpresa] = useState();
  const token = getAccessTokenApi();
  var id = localStorage.getItem("id");
  useEffect(() => {
    mostrarEmpresa(token, id).then((response) => {
      console.log("response", response);
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
      <Row className="informacion__content">
        <Typography variant={"h1"} className="informacion__content-titulo">
          {empresa.empresa.nombre}
        </Typography>
        {/*<Typography.Paragraph className="informacion__content-info">
          <b>NIT:</b> {empresa.empresa.nit}
          <br />
          <b>Asocación:</b> {empresa.empresa.asociacion}
          <br />
          <b>Representante legal:</b> {empresa.empresa.representante_legal}
          <br />
          <b>Cédula del representante legal:</b>
          {empresa.empresa.cedula_representante_legal}
          <br />
          <b>Correo electrónico</b> {empresa.empresa.correo_electronico}
          <br />
          <b>Ubicación</b> {empresa.empresa.departamento} ,{" "}
          {empresa.empresa.municipio}, {empresa.empresa.direccion_empresa}
          <br />
          <b>Reseña:</b> {empresa.empresa.resena}
  </Typography.Paragraph>*/}
      </Row>
    </Layout>
  );
}

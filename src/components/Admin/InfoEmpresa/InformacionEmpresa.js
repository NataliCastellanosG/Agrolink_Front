import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Layout, Row, Typography } from "antd";
import { EditOutlined } from "@ant-design/icons";

import ModalFront from "../../Modal";
import EditarEmpresaForm from "../EditarEmpresa";
import "./InformacionEmpresa.scss";

export default function Informacion(props) {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const { empresa } = props;

  const editarEmpresa = (emp) => {
    setIsVisibleModal(true);
    setModalTitle("Modificar ficha técnica");
    setModalContent("esto es una prueba");
    console.log(isVisibleModal, modalTitle, modalContent);
  };

  return (
    <Layout className="informacion">
      <Row className="informacion__row-alta"></Row>
      <Row className="informacion__row-medio">
        <Col span={22}>
          <Typography variant="h1" className="informacion__row-medio-h1">
            FICHA TÉCNICA
          </Typography>
        </Col>
        <Col span={2}>
          <Link onClick={() => editarEmpresa(empresa)}>
            <EditOutlined className="informacion__row-medio-icono" />
          </Link>
        </Col>
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

      <ModalFront
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </ModalFront>
    </Layout>
  );
}

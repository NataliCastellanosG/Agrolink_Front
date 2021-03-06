import React, { useState, useEffect } from "react";
import { Col, Layout, Modal as ModalAntd, Row, Typography, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { obtenerCCApi, obtenerRutApi } from "../../../api/empresa";
import Modal from "../../Modal";
import EditarEmpresaForm from "../EditarEmpresa";
import "./InformacionEmpresa.scss";

const { confirm } = ModalAntd;

export default function Informacion(props) {
  const { empresa, asociaciones } = props;

  const [camara_comercio, setCamara_comercio] = useState(null);
  const [rut, setRut] = useState(null);
  const [empresaData, setEmpresaData] = useState({});
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    setEmpresaData({
      asociacion: empresa.asociacion,
      rol: empresa.rol,
      nombre: empresa.nombre,
      nit: empresa.nit,
      representante_legal: empresa.representante_legal,
      cedula_representante_legal: empresa.cedula_representante_legal,
      correo_electronico: empresa.correo_electronico,
      departamento: empresa.departamento,
      municipio: empresa.municipio,
      direccion_empresa: empresa.direccion_empresa,
      camara_comercio: empresa.camara_comercio,
      rut: empresa.rut,
      resena: empresa.resena,
      video_presentacion: empresa.video_presentacion,
    });
  }, [empresa]);
  useEffect(() => {
    if (empresa.camara_comercio) {
      obtenerCCApi(empresa.camara_comercio).then((response) => {
        setCamara_comercio(response);
      });
    } else {
      setCamara_comercio(null);
    }
  }, [empresa]);

  useEffect(() => {
    if (empresa.rut) {
      obtenerRutApi(empresa.rut).then((response) => {
        setRut(response);
      });
    } else {
      setRut(null);
    }
  }, [empresa]);

  useEffect(() => {
    if (camara_comercio) {
      setEmpresaData({ ...empresaData, camara_comercio: camara_comercio.file });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camara_comercio]);

  useEffect(() => {
    if (rut) {
      setEmpresaData({ ...empresaData, rut: rut.file });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rut]);

  const editarEmpresa = (emp) => {
    setIsVisibleModal(true);
    setModalTitle("MODIFICAR FICHA T??CNICA");
    setModalContent(
      <EditarEmpresaForm empresa={emp} asociaciones={asociaciones} />
    );
  };

  const mostrarRUT = (url) => {
    setIsVisibleModal(true);
    setModalTitle("RUT");
    setModalContent(
      <img style={{ width: "100%", height: "100%" }} src={url} alt="archivo" />
    );
  };
  const mostrarCC = (url) => {
    setIsVisibleModal(true);
    setModalTitle("CAMARA Y COMERCIO");
    setModalContent(
      <img style={{ width: "100%", height: "100%" }} src={url} alt="archivo" />
    );
  };

  return (
    <Layout className="informacion">
      <Row className="informacion__row-alta"></Row>
      <Row className="informacion__row-medio">
        <Col span={22}>
          <Typography variant="h1" className="informacion__row-medio-h1">
            FICHA T??CNICA
          </Typography>
        </Col>
        <Col span={2}>
          <Button
            onClick={() => editarEmpresa(empresa)}
            className="informacion__row-medio-boton"
          >
            <EditOutlined className="informacion__row-medio-icono" />
          </Button>
        </Col>
      </Row>
      <Row className="informacion__content">
        <Typography variant={"h1"} className="informacion__content-titulo">
          {empresaData.nombre}
        </Typography>
        <Typography.Paragraph className="informacion__content-info">
          <b>NIT:</b> {empresaData.nit}
          <br />
          <b>Asocaci??n:</b> {empresaData.asociacion}
          <br />
          <b>Representante legal:</b> {empresaData.representante_legal}
          <br />
          <b>C??dula del representante legal:</b>
          {empresaData.cedula_representante_legal}
          <br />
          <b>Correo electr??nico</b> {empresaData.correo_electronico}
          <br />
          <b>Ubicaci??n</b> {empresaData.departamento} ,{empresaData.municipio},{" "}
          {empresaData.direccion_empresa}
          <br />
          <b>Rese??a:</b> {empresaData.resena}
          <Row gutter={16}>
            <Col span={12}>
              <Button
                onClick={() => mostrarCC(camara_comercio)}
                style={{ color: "rgba(0,0,0,0.3)" }}
                className="informacion__content-boton"
              >
                <img
                  style={{ width: "100%", height: "100%" }}
                  size={150}
                  src={camara_comercio}
                  alt="archivo"
                />
              </Button>
            </Col>
            <Col span={12}>
              <Button
                onClick={() => mostrarRUT(rut)}
                style={{ color: "rgba(0,0,0,0.3)" }}
                className="informacion__content-boton"
              >
                <img
                  style={{ width: "100%", height: "100%" }}
                  size={150}
                  src={rut}
                  alt="archivo"
                />
              </Button>
            </Col>
          </Row>
        </Typography.Paragraph>
      </Row>

      <Modal
        className="informacion__modal"
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </Layout>
  );
}

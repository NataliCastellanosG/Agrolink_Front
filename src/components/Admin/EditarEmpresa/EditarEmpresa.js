import React, { useState, useCallback, useEffect } from "react";
import { Button, Col, Form, Input, Layout, Row, Select, Tooltip } from "antd";
import {
  EnvironmentOutlined,
  HomeOutlined,
  IdcardOutlined,
  MailOutlined,
  PicRightOutlined,
  TagsOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useDropzone } from "react-dropzone";
import { obtenerCCApi, obtenerRutApi } from "../../../api/empresa";
import Modal from "../../Modal";
import NoDocument from "../../../assets/img/png/documento.png";
import "./EditarEmpresa.scss";

export default function EditarForm(props) {
  const { empresa, asociaciones } = props;
  const [camara_comercio, setCamara_comercio] = useState(null);
  const [rut, setRut] = useState(null);
  const [empresaData, setEmpresaData] = useState({
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

  console.log(rut);

  const actualizarEmpresa = (e) => {
    console.log(empresaData);
  };

  return (
    <Layout className="editar-form">
      <Form onFinish={actualizarEmpresa}>
        <Row gutter={16}>
          <Col className="gutter-row" span={24}>
            <Form.Item>
              <Tooltip
                placement="left"
                title="Debe seleccionar la asociación a la que pertence su empresa"
              >
                <Select
                  name="asociaciones"
                  placeholder="Seleccione una asociación"
                  defaultValue={empresaData.asociacion}
                  onChange={(e) =>
                    setEmpresaData({ ...empresaData, asociacion: e })
                  }
                >
                  {asociaciones.map((aso) => (
                    <Select.Option key={aso._id} value={aso._id}>
                      {aso.nombre}
                    </Select.Option>
                  ))}
                </Select>
              </Tooltip>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className="gutter-row" span={8}>
            <Form.Item>
              <Tooltip
                placement="left"
                title="Debe seleccionar el rol que va a tener su empresa"
              >
                <Input
                  name="rol"
                  prefix={
                    <TagsOutlined style={{ color: "rgba(0,0,0,0.25)" }} />
                  }
                  placeholder="Rol de la empresa (Comprador - Vendedor)"
                  className="editar-form__input"
                  defaultValue={empresaData.rol}
                  onChange={(e) =>
                    setEmpresaData({ ...empresaData, rol: e.target.value })
                  }
                />
              </Tooltip>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item>
              <Tooltip
                placement="left"
                title="Debe diligenciar el nombre completo de su empresa"
              >
                <Input
                  name="nombre"
                  prefix={
                    <UserOutlined style={{ color: "rgba(0,0,0,0.25)" }} />
                  }
                  placeholder="Nombre de la empresa"
                  className="editar-form__input"
                  defaultValue={empresaData.nombre}
                  onChange={(e) =>
                    setEmpresaData({ ...empresaData, nombre: e.target.value })
                  }
                />
              </Tooltip>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item>
              <Tooltip
                placement="left"
                title="Debe diligenciar el NIT de su empresa"
              >
                <Input
                  name="nit"
                  prefix={
                    <IdcardOutlined style={{ color: "rgba(0,0,0,0.25)" }} />
                  }
                  placeholder="NIT"
                  className="editar-form__input"
                  defaultValue={empresaData.nit}
                  onChange={(e) =>
                    setEmpresaData({ ...empresaData, nit: e.target.value })
                  }
                />
              </Tooltip>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className="gutter-row" span={8}>
            <Form.Item>
              <Tooltip
                placement="left"
                title="Debe diligenciar el nombre del representante legal de su empresa"
              >
                <Input
                  name="representante_legal"
                  prefix={
                    <UserOutlined style={{ color: "rgba(0,0,0,0.25)" }} />
                  }
                  placeholder="Representante legal"
                  className="editar-form__input"
                  defaultValue={empresaData.representante_legal}
                  onChange={(e) =>
                    setEmpresaData({
                      ...empresaData,
                      representante_legal: e.target.value,
                    })
                  }
                />
              </Tooltip>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item>
              <Tooltip
                placement="left"
                title="Debe diligenciar la cédula del representante legal de su empresa"
              >
                <Input
                  name="cedula_representante_legal"
                  prefix={
                    <IdcardOutlined style={{ color: "rgba(0,0,0,0.25)" }} />
                  }
                  placeholder="Cédula representante legal"
                  className="editar-form__input"
                  defaultValue={empresaData.cedula_representante_legal}
                  onChange={(e) =>
                    setEmpresaData({
                      ...empresaData,
                      cedula_representante_legal: e.target.value,
                    })
                  }
                />
              </Tooltip>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item>
              <Tooltip
                placement="left"
                title="Debe diligenciar el correo electrónico que este asociado al proceso"
              >
                <Input
                  name="correo_electronico"
                  type="email"
                  prefix={
                    <MailOutlined style={{ color: "rgba(0,0,0,0.25)" }} />
                  }
                  placeholder="Correo electrónico"
                  className="editar-form__input"
                  defaultValue={empresaData.correo_electronico}
                  onChange={(e) =>
                    setEmpresaData({
                      ...empresaData,
                      correo_electronico: e.target.value,
                    })
                  }
                />
              </Tooltip>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className="gutter-row" span={8}>
            <Form.Item>
              <Tooltip
                placement="left"
                title="Debe Seleccionar el departamento donde reside su empresa"
              >
                <Input
                  name="departamento"
                  prefix={
                    <EnvironmentOutlined
                      style={{ color: "rgba(0,0,0,0.25)" }}
                    />
                  }
                  placeholder="Departamento"
                  className="editar-form__input"
                  defaultValue={empresaData.departamento}
                  onChange={(e) =>
                    setEmpresaData({
                      ...empresaData,
                      departamento: e.target.value,
                    })
                  }
                />
              </Tooltip>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item>
              <Tooltip
                placement="left"
                title="Debe Seleccionar el municipio donde reside su empresa"
              >
                <Input
                  name="municipio"
                  prefix={
                    <EnvironmentOutlined
                      style={{ color: "rgba(0,0,0,0.25)" }}
                    />
                  }
                  placeholder="Municipio"
                  className="editar-form__input"
                  defaultValue={empresaData.municipio}
                  onChange={(e) =>
                    setEmpresaData({
                      ...empresaData,
                      municipio: e.target.value,
                    })
                  }
                />
              </Tooltip>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item>
              <Tooltip
                placement="left"
                title="Debe diligenciar la dirección de su empresa"
              >
                <Input
                  name="direccion_empresa"
                  prefix={
                    <HomeOutlined style={{ color: "rgba(0,0,0,0.25)" }} />
                  }
                  placeholder="dirección donde reside la empresa"
                  className="editar-form__input"
                  defaultValue={empresaData.direccion_empresa}
                  onChange={(e) =>
                    setEmpresaData({
                      ...empresaData,
                      direccion_empresa: e.target.value,
                    })
                  }
                />
              </Tooltip>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <Form.Item>
              <Tooltip
                placement="right"
                title="Debe cargar el documento pdf del certificado de Cámara y Comercio de su empresa"
              >
                <CargarCC
                  camara_comercio={camara_comercio}
                  setCamara_comercio={setCamara_comercio}
                />
              </Tooltip>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item>
              <Tooltip
                placement="right"
                title="Debe cargar el documento pdf del certificado de Cámara y Comercio de su empresa"
              >
                <CargarRUT rut={rut} setRut={setRut} />
              </Tooltip>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <Form.Item>
              <Tooltip
                placement="left"
                title="Debe diligenciar la reseña o descripción de su empresa"
              >
                <Input.TextArea
                  type="text"
                  name="resena"
                  rows={1}
                  icon={
                    <PicRightOutlined style={{ color: "rgba(0,0,0,0.25)" }} />
                  }
                  placeholder="Reseña"
                  className="editar-form__input"
                  maxLength={300}
                  defaultValue={empresaData.resena}
                  onChange={(e) =>
                    setEmpresaData({ ...empresaData, resena: e.target.value })
                  }
                />
              </Tooltip>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item hasFeedback>
              <Tooltip
                placement="left"
                title="Debe ingresar el enlace del youtube en el que se encuentra el video de presentación de su empresa"
              >
                <Input
                  name="video_presentacion"
                  prefix={
                    <UserOutlined style={{ color: "rgba(0,0,0,0.25)" }} />
                  }
                  placeholder="URL de youtube  - video de presentación"
                  className="editar-form__input"
                  defaultValue={empresaData.video_presentacion}
                  onChange={(e) =>
                    setEmpresaData({
                      ...empresaData,
                      video_presentacion: e.target.value,
                    })
                  }
                />
              </Tooltip>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className="gutter-row" span={24}>
            <Form.Item>
              <Button htmlType="submit" className="editar-form_button">
                REGISTRAR
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
}

function CargarCC(props) {
  const { camara_comercio, setCamara_comercio } = props;
  const [camara_comercioUrl, setCamara_comercioUrl] = useState(null);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    if (camara_comercio) {
      if (camara_comercio.preview) {
        setCamara_comercioUrl(camara_comercio.preview);
      } else {
        setCamara_comercioUrl(camara_comercio);
      }
    } else {
      setCamara_comercioUrl(null);
    }
  }, [camara_comercio]);

  const onDrop = useCallback(
    (acceptedFile) => {
      const file = acceptedFile[0];
      setCamara_comercio({ file, preview: URL.createObjectURL(file) });
    },
    [setCamara_comercio]
  );
  const { getRootProps, getInputProps } = useDropzone({
    noKeyboard: true,
    accept: ".jpeg,.png",
    maxFiles: 1,
    onDrop,
  });

  const mostrarImagen = (url) => {
    setIsVisibleModal(true);
    setModalTitle("RUT");
    setModalContent(
      <img
        style={{ width: "100%", height: "100%" }}
        size={150}
        src={url}
        alt="archivo"
      />
    );
  };

  return (
    <section>
      <div {...getRootProps({ className: "upload" })}>
        <input {...getInputProps({})} />
        <p>Carcar Cámara y Comercio</p>
      </div>
      <aside>
        <button
          onClick={() => mostrarImagen(camara_comercioUrl)}
          className="upload__boton"
        >
          <img
            className="upload__boton-img"
            size={10}
            src={camara_comercioUrl ? camara_comercioUrl : NoDocument}
            alt="archivo"
          />
        </button>
      </aside>
      <Modal
        className="upload__modal"
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </section>
  );
}

function CargarRUT(props) {
  const { rut, setRut } = props;
  const [rutUrl, setRutUrl] = useState(null);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    console.log(rut);
    if (rut) {
      if (rut.preview) {
        setRutUrl(rut.preview);
      } else {
        setRutUrl(rut);
      }
    } else {
      setRutUrl(null);
    }
  }, [rut]);

  const onDrop = useCallback(
    (acceptedFile) => {
      const file = acceptedFile[0];
      setRut({ file, preview: URL.createObjectURL(file) });
    },
    [setRut]
  );
  const { getRootProps, getInputProps } = useDropzone({
    noKeyboard: true,
    accept: ".jpeg,.png",
    maxFiles: 1,
    onDrop,
  });

  const mostrarImagen = (url) => {
    setIsVisibleModal(true);
    setModalTitle("RUT");
    setModalContent(
      <img
        style={{ width: "100%", height: "100%" }}
        size={150}
        src={url}
        alt="archivo"
      />
    );
  };

  return (
    <section>
      <div {...getRootProps({ className: "upload" })}>
        <input {...getInputProps({})} />
        <p>Carcar RUT</p>
      </div>
      <aside>
        <button onClick={() => mostrarImagen(rutUrl)} className="upload__boton">
          <img
            className="upload__boton-img"
            size={10}
            src={rutUrl ? rutUrl : NoDocument}
            alt="archivo"
          />
        </button>
      </aside>
      <Modal
        className="upload__modal"
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </section>
  );
}

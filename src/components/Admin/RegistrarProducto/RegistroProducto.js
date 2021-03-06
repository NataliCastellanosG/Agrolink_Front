import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Layout,
  notification,
  Row,
  Tooltip,
  Typography,
} from "antd";
import {
  BarcodeOutlined,
  CalendarOutlined,
  BorderlessTableOutlined,
  DollarCircleOutlined,
  GoldOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import Modal from "../../Modal";
import NoDocument from "../../../assets/img/png/documento.png";
import { useDropzone } from "react-dropzone";
import { minLengthValidation } from "../../../utils/formValidation";
import { registrarProductoApi } from "../../../api/producto";

import "./RegistroProducto.scss";

export default function RegisterForm(props) {
  const [imagen, setImagen] = useState(null);
  const [inputs, setInputs] = useState({
    empresaid: props.empresaid,
    nombre: "",
    descripcion: "",
    imagen: "",
    unidad_venta: "",
    precio: "",
    cantidad: "",
    fecha_entrega: "",
  });

  const [formValid, setFormValid] = useState({
    nombre: false,
    descripcion: false,
    unidad_venta: false,
    imagen: false,
    precio: false,
    cantidad: false,
    fecha_entrega: false,
  });

  const changeForm = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const inputValidation = (e) => {
    const { name } = e.target;

    if (e.target.value) {
      setFormValid({ ...formValid, [name]: minLengthValidation(e.target, 1) });
    }
  };

  useEffect(() => {
    if (imagen) {
      setInputs({ ...inputs, imagen });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagen]);

  const registrarProducto = async (e) => {
    const empresaidVal = props.empresaid;
    const nombreVal = inputs.nombre;
    const descripcionVal = inputs.descripcion;
    const imagenVal = inputs.imagen;
    const unidad_ventaVal = inputs.unidad_venta;
    const precioVal = inputs.precio;
    const cantidadVal = inputs.cantidad;
    const fecha_entregaVal = inputs.fecha_entrega;

    if (
      !empresaidVal ||
      !nombreVal ||
      !descripcionVal ||
      !imagenVal ||
      !unidad_ventaVal ||
      !precioVal ||
      !cantidadVal ||
      !fecha_entregaVal
    ) {
      notification["error"]({ message: "Todos los campos son obligatorios" });
    } else {
      const result = await registrarProductoApi(inputs);
      if (result.ok) {
        notification["error"]({ message: result.message });
      } else {
        notification["success"]({ message: "resultado" + result.message });
        resetForm();
        window.location.href = "/activo";
      }
    }
  };

  const resetForm = () => {
    const inputs = document.getElementsByTagName("input");

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].classList.remove("success");
      inputs[i].classList.remove("error");
    }

    setInputs({
      nombre: "",
      descripcion: "",
      imagen: "",
      unidad_venta: "",
      precio: "",
      cantidad: "",
      fecha_entrega: "",
    });

    setFormValid({
      nombre: false,
      descripcion: false,
      imagen: false,
      unidad_venta: false,
      precio: false,
      cantidad: false,
      fecha_entrega: false,
    });
  };
  return (
    <Layout className="form-producto">
      <Row className="form-producto__row-alta"></Row>
      <Row className="form-producto__row-medio">
        <Typography variant="h1" className="form-producto__row-medio-h1">
          REGISTRO DE PRODUCTO
        </Typography>
      </Row>
      <Row className="form-producto__content">
        <Form
          className="form-producto__content-register-form"
          onFinish={registrarProducto}
          onChange={changeForm}
        >
          <Row gutter={16}>
            <Col className="gutter-row" span={24}>
              <Form.Item>
                <Tooltip
                  placement="left"
                  title="Debe ingresar el nombre del producto que desea registrar"
                >
                  <Input
                    name="nombre"
                    size="large"
                    prefix={
                      <BarcodeOutlined style={{ color: "rgba(0,0,0,0.25)" }} />
                    }
                    placeholder="Nombre del producto"
                    className="form-producto__content-register-form-input"
                    onChange={inputValidation}
                    value={inputs.nombre}
                  />
                </Tooltip>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col className="gutter-row" span={24}>
              <Form.Item>
                <Tooltip
                  placement="left"
                  title="Debe ingresar la descripci??n del producto que desea registrar"
                >
                  <Input.TextArea
                    name="descripcion"
                    size="large"
                    prefix={
                      <MenuOutlined style={{ color: "rgba(0,0,0,0.25)" }} />
                    }
                    placeholder="Descripci??n"
                    className="form-producto__content-register-form-input"
                    onChange={inputValidation}
                    value={inputs.descripcion}
                  />
                </Tooltip>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col className="gutter-row" span={24}>
              <Form.Item>
                <Tooltip
                  placement="right"
                  title="Debe cargar la imagen del producto"
                >
                  <CargarImagen imagen={imagen} setImagen={setImagen} />
                </Tooltip>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <Form.Item>
                <Tooltip
                  placement="left"
                  title="Debe diligenciar la unidad de venta con la que va a vender su producto"
                >
                  <Input
                    name="unidad_venta"
                    size="large"
                    prefix={
                      <GoldOutlined style={{ color: "rgba(0,0,0,0.25)" }} />
                    }
                    placeholder="Unidad de venta"
                    className="form-producto__content-register-form-input"
                    onChange={inputValidation}
                    value={inputs.unidad_venta}
                  />
                </Tooltip>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item>
                <Tooltip
                  placement="left"
                  title="Debe diligenciar el valor del producto en pesos Colombianos"
                >
                  <Input
                    name="precio"
                    type="number"
                    size="large"
                    defaultValue={0}
                    prefix={
                      <DollarCircleOutlined
                        style={{ color: "rgba(0,0,0,0.25)" }}
                      />
                    }
                    placeholder="Precio del producto"
                    className="form-producto__content-register-form-input"
                    onChange={inputValidation}
                    value={inputs.precio}
                    style={{ color: "rgba(0,0,0,0.25)" }}
                  />
                </Tooltip>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <Form.Item>
                <Tooltip
                  placement="left"
                  title="Debe diligenciar la cantidad disponible"
                >
                  <Input
                    name="cantidad"
                    type="number"
                    size="large"
                    defaultValue={0}
                    max={100000000000}
                    prefix={
                      <BorderlessTableOutlined
                        style={{ color: "rgba(0,0,0,0.25)" }}
                      />
                    }
                    placeholder="Cantidad disponible"
                    className="form-producto__content-register-form-input"
                    onChange={inputValidation}
                    value={inputs.cantidad}
                    style={{ color: "rgba(0,0,0,0.25)" }}
                  />
                </Tooltip>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item>
                <Tooltip
                  placement="left"
                  title="Debe diligenciar los d??as h??biles en los que se generar??a la entrega del producto"
                >
                  <Input
                    name="fecha_entrega"
                    size="large"
                    prefix={
                      <CalendarOutlined style={{ color: "rgba(0,0,0,0.25)" }} />
                    }
                    placeholder="D??as h??biles en los que se genera la entrega, ej. 10 d??as h??biles"
                    className="form-producto__content-register-form-input"
                    onChange={inputValidation}
                    value={inputs.fecha_entrega}
                  />
                </Tooltip>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col className="gutter-row" span={24}>
              <Form.Item>
                <Button
                  htmlType="submit"
                  className="form-producto__content-register-form-button"
                >
                  REGISTRAR
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Row>
    </Layout>
  );
}

function CargarImagen(props) {
  const { imagen, setImagen } = props;
  const [imagenUrl, setImagenUrl] = useState(null);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    if (imagen) {
      if (imagen.preview) {
        setImagenUrl(imagen.preview);
      } else {
        setImagenUrl(imagen);
      }
    } else {
      setImagenUrl(null);
    }
  }, [imagen]);

  const onDrop = useCallback(
    (acceptedFile) => {
      const file = acceptedFile[0];
      setImagen({ file, preview: URL.createObjectURL(file) });
    },
    [setImagen]
  );
  const { getRootProps, getInputProps } = useDropzone({
    noKeyboard: true,
    accept: ".jpeg,.png",
    maxFiles: 1,
    onDrop,
  });

  const mostrarImagen = (url) => {
    setIsVisibleModal(true);
    setModalTitle("Imagen del producto");
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
        <p>Carcar C??mara y Comercio</p>
      </div>
      <aside>
        <button
          onClick={() => mostrarImagen(imagenUrl)}
          className="upload__boton"
        >
          <img
            className="upload__boton-img"
            size={10}
            src={imagenUrl ? imagenUrl : NoDocument}
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

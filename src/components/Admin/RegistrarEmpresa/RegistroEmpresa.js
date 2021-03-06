import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Checkbox,
  Col,
  Input,
  Form,
  notification,
  Row,
  Select,
  Tooltip,
} from "antd";
import {
  EnvironmentOutlined,
  HomeOutlined,
  IdcardOutlined,
  LockOutlined,
  MailOutlined,
  PicRightOutlined,
  TagsOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  emailValidation,
  minLengthValidation,
} from "../../../utils/formValidation";
import { useDropzone } from "react-dropzone";
import Modal from "../../Modal";
import { signUpApi } from "../../../api/empresa";
import NoDocument from "../../../assets/img/png/documento.png";
import "./RegistroEmpresa.scss";

export default function RegisterForm(props) {
  const { asociaciones } = props;
  const [camara_comercio, setCamara_comercio] = useState(null);
  const [rut, setRut] = useState(null);
  const [inputs, setInputs] = useState({
    asociacion: "",
    rol: "",
    nombre: "",
    nit: "",
    representante_legal: "",
    cedula_representante_legal: "",
    correo_electronico: "",
    departamento: "",
    municipio: "",
    direccion_empresa: "",
    camara_comercio: "",
    rut: "",
    resena: "",
    video_presentacion: "",
    contrasena: "",
    repeatcontrasena: "",
    privacyPolicy: false,
  });

  const [formValid, setFormValid] = useState({
    asociacion: false,
    rol: false,
    nombre: false,
    nit: false,
    representante_legal: false,
    cedula_representante_legal: false,
    correo_electronico: false,
    departamento: false,
    municipio: false,
    direccion_empresa: false,
    camara_comercio: false,
    rut: false,
    resena: false,
    video_presentacion: false,
    contrasena: false,
    repeatcontrasena: false,
    privacyPolicy: false,
  });

  const changeForm = (e) => {
    if (e.target.name === "privacyPolicy") {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.checked,
      });
    } else {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    }
  };

  const inputValidation = (e) => {
    const { type, name } = e.target;

    if (e.target.value) {
      setFormValid({ ...formValid, [name]: minLengthValidation(e.target, 1) });
    }

    if (type === "email") {
      setFormValid({ ...formValid, [name]: emailValidation(e.target) });
    }

    if (type === "password") {
      setFormValid({ ...formValid, [name]: minLengthValidation(e.target, 6) });
    }

    if (type === "checkbox") {
      setFormValid({ ...formValid, [name]: e.target.checked });
    }
  };

  useEffect(() => {
    if (camara_comercio) {
      setInputs({ ...inputs, camara_comercio });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camara_comercio]);

  useEffect(() => {
    if (rut) {
      setInputs({ ...inputs, rut });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rut]);

  const registrarEmpresa = async (e) => {
    const asociacionVal = inputs.asociacion;
    const rolVal = inputs.rol;
    const nombreVal = inputs.nombre;
    const nitVal = inputs.nit;
    const representante_legalVal = inputs.representante_legal;
    const cedula_representante_legalVal = inputs.cedula_representante_legal;
    const correo_electronicoVal = inputs.correo_electronico;
    const departamentoVal = inputs.departamento;
    const municipioVal = inputs.municipio;
    const direccion_empresaVal = inputs.direccion_empresa;
    const camara_comercioVal = inputs.camara_comercio;
    const rutVal = inputs.rut;
    const resenaVal = inputs.resena;
    const contrasenaVal = inputs.contrasena;
    const repeatcontrasenaVal = inputs.repeatcontrasena;
    const privacyPolicyVal = inputs.privacyPolicy;

    if (
      !asociacionVal ||
      !rolVal ||
      !nombreVal ||
      !nitVal ||
      !representante_legalVal ||
      !cedula_representante_legalVal ||
      !correo_electronicoVal ||
      !departamentoVal ||
      !municipioVal ||
      !direccion_empresaVal ||
      !camara_comercioVal ||
      !rutVal ||
      !resenaVal ||
      !contrasenaVal ||
      !repeatcontrasenaVal ||
      !privacyPolicyVal
    ) {
      notification["error"]({ message: "Todos los campos son obligatorios" });
    } else {
      if (contrasenaVal !== repeatcontrasenaVal) {
        notification["error"]({ message: "Las contrase??as deben ser iguales" });
      } else {
        const result = await signUpApi(inputs);

        if (!result.ok) {
          notification["error"]({ message: result.message });
        } else {
          notification["success"]({ message: result.message });
          resetForm();
        }
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
      asociacion: "",
      rol: "",
      nombre: "",
      nit: "",
      representante_legal: "",
      cedula_representante_legal: "",
      correo_electronico: "",
      departamento: "",
      municipio: "",
      direccion_empresa: "",
      camara_comercio: "",
      rut: "",
      resena: "",
      video_presentacion: "",
      contrasena: "",
      repeatcontrasena: "",
      privacyPolicy: false,
    });

    setFormValid({
      asociacion: false,
      rol: false,
      nombre: false,
      nit: false,
      representante_legal: false,
      cedula_representante_legal: false,
      correo_electronico: false,
      departamento: false,
      municipio: false,
      direccion_empresa: false,
      camara_comercio: false,
      rut: false,
      resena: false,
      video_presentacion: false,
      contrasena: false,
      repeatcontrasena: false,
      privacyPolicy: false,
    });
    setCamara_comercio(null);
    setRut(null);
  };

  return (
    <Form
      className="register-form"
      onFinish={registrarEmpresa}
      onChange={changeForm}
    >
      <Row gutter={16}>
        <Col className="gutter-row" span={24}>
          <Form.Item>
            <Tooltip
              placement="left"
              title="Debe seleccionar la asociaci??n a la que pertence su empresa"
            >
              <Select
                name="asociaciones"
                placeholder="Seleccione una asociaci??n"
                defaultValue={inputs.asociacion}
                onChange={(e) => setInputs({ ...inputs, asociacion: e })}
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
                prefix={<TagsOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
                placeholder="Rol de la empresa (Comprador - Vendedor)"
                className="register-form__input"
                onChange={inputValidation}
                value={inputs.rol}
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
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
                placeholder="Nombre de la empresa"
                className="register-form__input"
                onChange={inputValidation}
                value={inputs.nombre}
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
                className="register-form__input"
                onChange={inputValidation}
                value={inputs.nit}
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
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
                placeholder="Representante legal"
                className="register-form__input"
                onChange={inputValidation}
                value={inputs.representante_legal}
              />
            </Tooltip>
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item>
            <Tooltip
              placement="left"
              title="Debe diligenciar la c??dula del representante legal de su empresa"
            >
              <Input
                name="cedula_representante_legal"
                prefix={
                  <IdcardOutlined style={{ color: "rgba(0,0,0,0.25)" }} />
                }
                placeholder="C??dula representante legal"
                className="register-form__input"
                onChange={inputValidation}
                value={inputs.cedula_representante_legal}
              />
            </Tooltip>
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item>
            <Tooltip
              placement="left"
              title="Debe diligenciar el correo electr??nico que este asociado al proceso"
            >
              <Input
                name="correo_electronico"
                type="email"
                prefix={<MailOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
                placeholder="Correo electr??nico"
                className="register-form__input"
                onChange={inputValidation}
                value={inputs.correo_electronico}
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
                  <EnvironmentOutlined style={{ color: "rgba(0,0,0,0.25)" }} />
                }
                placeholder="Departamento"
                className="register-form__input"
                onChange={inputValidation}
                value={inputs.departamento}
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
                  <EnvironmentOutlined style={{ color: "rgba(0,0,0,0.25)" }} />
                }
                placeholder="Municipio"
                className="register-form__input"
                onChange={inputValidation}
                value={inputs.municipio}
              />
            </Tooltip>
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item>
            <Tooltip
              placement="left"
              title="Debe diligenciar la direcci??n de su empresa"
            >
              <Input
                name="direccion_empresa"
                prefix={<HomeOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
                placeholder="direcci??n donde reside la empresa"
                className="register-form__input"
                onChange={inputValidation}
                value={inputs.direccion_empresa}
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
              title="Debe cargar el documento pdf del certificado de C??mara y Comercio de su empresa"
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
              title="Debe cargar el documento pdf del certificado de C??mara y Comercio de su empresa"
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
              title="Debe diligenciar la rese??a o descripci??n de su empresa"
            >
              <Input.TextArea
                type="text"
                name="resena"
                rows={1}
                icon={
                  <PicRightOutlined style={{ color: "rgba(0,0,0,0.25)" }} />
                }
                placeholder="Rese??a"
                className="register-form__input"
                maxLength={300}
                onChange={inputValidation}
                value={inputs.resena}
              />
            </Tooltip>
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item hasFeedback>
            <Tooltip
              placement="left"
              title="Debe ingresar el enlace del youtube en el que se encuentra el video de presentaci??n de su empresa"
            >
              <Input
                name="video_presentacion"
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
                placeholder="URL de youtube  - video de presentaci??n"
                className="register-form__input"
                onChange={inputValidation}
                value={inputs.video_presentacion}
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
              title="Ingrese una contrase??a segura para acceder a la plataforma"
            >
              <Input
                name="contrasena"
                type="password"
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
                placeholder="Contrase??a"
                className="register-form__input"
                onChange={inputValidation}
                value={inputs.contrasena}
              />
            </Tooltip>
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item>
            <Tooltip placement="left" title="Ingrese nuevamente la contrase??a">
              <Input
                name="repeatcontrasena"
                type="password"
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
                placeholder="Repetir contrase??a"
                className="register-form__input"
                onChange={inputValidation}
                value={inputs.repeatcontrasena}
              />
            </Tooltip>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={24} style={{ textAlign: "left" }}>
          <Form.Item>
            <Checkbox name="privacyPolicy" onChange={inputValidation}>
              He le??do y acepto la pol??tica de privacidad
            </Checkbox>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={24}>
          <Form.Item>
            <Button htmlType="submit" className="register-form_button">
              REGISTRAR
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
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
        <p>Carcar C??mara y Comercio</p>
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
            //<div>Iconos dise??ados por <a href="https://www.flaticon.es/autores/xnimrodx" title="xnimrodx">xnimrodx</a> from <a href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></div>
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

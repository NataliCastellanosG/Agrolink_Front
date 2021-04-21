import React, {useState} from 'react';
import {Button, Checkbox, Col, Input, Form,notification, Row,  Tooltip } from 'antd'
import {EnvironmentOutlined, HomeOutlined, IdcardOutlined, LockOutlined, MailOutlined , PicRightOutlined, TagsOutlined, TeamOutlined, UserOutlined} from '@ant-design/icons';

import {emailValidation, minLengthValidation} from '../../../utils/formValidation'
import {signUpApi} from '../../../api/empresa';

import './RegistroEmpresa.scss'

export default function RegisterForm(){

    const [inputs, setInputs] =useState({
        asociacion: "",
        rol:"",
        nombre:"",
        nit:"",
        representante_legal:"",
        cedula_representante_legal:"",
        correo_electronico:"",
        departamento:"",
        municipio:"",
        direccion_empresa:"",
        resena:"",
        video_presentacion:"",
        contrasena:"",
        repeatcontrasena:"",
        privacyPolicy: false,
    })

    const [formValid, setFormValid] = useState({
        asociacion: false,
        rol:false,
        nombre:false,
        nit:false,
        representante_legal:false,
        cedula_representante_legal:false,
        correo_electronico:false,
        departamento:false,
        municipio:false,
        direccion_empresa:false,
        resena:false,
        video_presentacion:false,
        contrasena:false,
        repeatcontrasena:false,
        privacyPolicy: false,
    })

    const changeForm = e =>{
        if(e.target.name ==="privacyPolicy"){
            setInputs({
                ...inputs,
                [e.target.name] : e.target.checked
            });
        }else        
        {
            setInputs({
                ...inputs,
                [e.target.name] : e.target.value
            })
        }
    };

    const inputValidation = e =>{
        const { type, name} = e.target;

        if(e.target.value )
        {
            setFormValid({ ...formValid, [name]: minLengthValidation(e.target, 1)});
        }

        if(type === "email"){
            setFormValid({ ...formValid, [name] : emailValidation(e.target)});
        }

        if(type === "password"){
            setFormValid({ ...formValid, [name]: minLengthValidation(e.target, 6)});
        }

        if(type === "checkbox")
        {
            setFormValid({...formValid, [name]: e.target.checked});
        }

        
    }

    const registrarEmpresa = async e=>{
        /*const {asociacion, rol, nombre, nit, representante_legal, cedula_representante_legal, correo_electronico, departamento,
               municipio, direccion_empresa, resena, video_presentacion, contrasena, repeatcontrasena, privacyPolicy} = formValid;*/
        const asociacionVal = inputs.asociacion;
        const rolVal = inputs.rol;
        const nombreVal=inputs.nombre;
        const nitVal = inputs.nit;
        const representante_legalVal= inputs.representante_legal;
        const cedula_representante_legalVal = inputs.cedula_representante_legal;
        const correo_electronicoVal = inputs.correo_electronico;
        const departamentoVal = inputs.departamento;
        const municipioVal = inputs.municipio;
        const direccion_empresaVal = inputs.direccion_empresa;
        const resenaVal = inputs.resena;
        const contrasenaVal=inputs.contrasena;
        const repeatcontrasenaVal = inputs.repeatcontrasena;
        const privacyPolicyVal = inputs.privacyPolicy;

        if(!asociacionVal || !rolVal || !nombreVal || !nitVal || !representante_legalVal || !cedula_representante_legalVal || !correo_electronicoVal ||
           !departamentoVal || !municipioVal || !direccion_empresaVal || !resenaVal || !contrasenaVal || !repeatcontrasenaVal || !privacyPolicyVal){
            notification['error']({message: "Todos los campos son obligatorios"})
        }else{
            if(contrasenaVal !== repeatcontrasenaVal)
            {
                notification['error']({message:"Las contraseñas deben ser iguales"})
            }else {
                const result= await signUpApi(inputs);

                if(!result.ok){
                    notification['error']({message: result.message})
                }else{
                    notification['success']({message: result.message})
                    resetForm();
                }
            }
        }
        
    }

    const resetForm = () =>{
        const inputs = document.getElementsByTagName('input');

        for(let i=0; i<inputs.length; i++){
            inputs[i].classList.remove("success");
            inputs[i].classList.remove("error");
        }

        setInputs({
            asociacion: "",
            rol:"",
            nombre:"",
            nit:"",
            representante_legal:"",
            cedula_representante_legal:"",
            correo_electronico:"",
            departamento:"",
            municipio:"",
            direccion_empresa:"",
            resena:"",
            video_presentacion:"",
            contrasena:"",
            repeatcontrasena:"",
            privacyPolicy: false,
        })

        setFormValid({
            asociacion: false,
            rol:false,
            nombre:false,
            nit:false,
            representante_legal:false,
            cedula_representante_legal:false,
            correo_electronico:false,
            departamento:false,
            municipio:false,
            direccion_empresa:false,
            resena:false,
            video_presentacion:false,
            contrasena:false,
            repeatcontrasena:false,
            privacyPolicy: false,
        })
    }
    return (
        <Form className="register-form" onFinish={registrarEmpresa} onChange={changeForm}>
            <Row gutter={16}>
                <Col className="gutter-row" span={24}>
                    <Form.Item>
                        <Tooltip placement="left" title="Debe seleccionar la asociación a la que pertence su empresa">
                            <Input 
                                    name="asociacion"
                                    prefix={<TeamOutlined style={{ color: "rgba(0,0,0,0.25)"}} />}
                                    placeholder="Nombre de la asociación"
                                    className="register-form__input"
                                    onChange={inputValidation}
                                    value={inputs.asociacion}/>
                        </Tooltip>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col  className="gutter-row" span={8} >
                    <Form.Item>
                        <Tooltip placement="left" title="Debe seleccionar el rol que va a tener su empresa">
                        <Input 
                                name="rol"
                                prefix={<TagsOutlined style={{ color: "rgba(0,0,0,0.25)"}} />}
                                placeholder="Rol de la empresa (Comprador - Vendedor)"
                                className="register-form__input"
                                onChange={inputValidation}
                                value={inputs.rol}/>
                        </Tooltip>
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={8}>
                    <Form.Item>
                        <Tooltip  placement="left" title="Debe diligenciar el nombre completo de su empresa">
                            <Input 
                                name="nombre"
                                prefix={<UserOutlined style={{ color: "rgba(0,0,0,0.25)"}} />}
                                placeholder="Nombre de la empresa"
                                className="register-form__input"
                                onChange={inputValidation}
                                value={inputs.nombre}/>
                        </Tooltip>
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={8}>
                    <Form.Item>
                        <Tooltip placement="left" title="Debe diligenciar el NIT de su empresa">
                            <Input
                                name="nit"
                                prefix={<IdcardOutlined style={{ color: "rgba(0,0,0,0.25)"}} />}
                                placeholder="NIT"
                                className="register-form__input"
                                onChange={inputValidation}
                                value={inputs.nit}/>
                        </Tooltip>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col className="gutter-row" span={8}>
                    <Form.Item>
                            <Tooltip placement="left" title="Debe diligenciar el nombre del representante legal de su empresa">
                                <Input
                                    name="representante_legal"
                                    prefix={<UserOutlined style={{ color: "rgba(0,0,0,0.25)"}} />}
                                    placeholder="Representante legal"
                                    className="register-form__input"
                                    onChange={inputValidation}
                                    value={inputs.representate_legal}/>
                            </Tooltip>
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={8}>
                    <Form.Item>
                        <Tooltip placement="left" title="Debe diligenciar la cédula del representante legal de su empresa">
                            <Input
                                name="cedula_representante_legal"
                                prefix={<IdcardOutlined style={{ color: "rgba(0,0,0,0.25)"}} />}
                                placeholder="Cédula representante legal"
                                className="register-form__input"
                                onChange={inputValidation}
                                value={inputs.cedula_representante_legal}/>
                        </Tooltip>
                        
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={8}>
                    <Form.Item>
                            <Tooltip placement="left" title="Debe diligenciar el correo electrónico que este asociado al proceso">
                                <Input
                                    name="correo_electronico"
                                    type= "email"
                                    prefix={<MailOutlined  style={{ color: "rgba(0,0,0,0.25)"}} />}
                                    placeholder="Correo electrónico"
                                    className="register-form__input"
                                    onChange={inputValidation}
                                    value={inputs.correo_electronico}/>
                            </Tooltip>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col className="gutter-row" span={8}>
                        <Form.Item>
                            <Tooltip placement="left" title="Debe Seleccionar el departamento donde reside su empresa">
                            <Input
                                    name="departamento"
                                    prefix={<EnvironmentOutlined  style={{ color: "rgba(0,0,0,0.25)"}} />}
                                    placeholder="Departamento"
                                    className="register-form__input"
                                    onChange={inputValidation}
                                    value={inputs.departamento}/>
                            </Tooltip>
                        </Form.Item>
                    </Col>
                <Col className="gutter-row" span={8}>
                    <Form.Item>
                        <Tooltip placement="left" title="Debe Seleccionar el municipio donde reside su empresa">
                        <Input
                                    name="municipio"
                                    prefix={<EnvironmentOutlined  style={{ color: "rgba(0,0,0,0.25)"}} />}
                                    placeholder="Municipio"
                                    className="register-form__input"
                                    onChange={inputValidation}
                                    value={inputs.municipio}/>
                        </Tooltip>
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={8}>
                    <Form.Item>
                        <Tooltip placement="left" title="Debe diligenciar la dirección de su empresa">
                            <Input
                                name="direccion_empresa"
                                prefix={<HomeOutlined style={{ color: "rgba(0,0,0,0.25)"}} />}
                                placeholder="dirección donde reside la empresa"
                                className="register-form__input"
                                onChange={inputValidation}
                                value={inputs.direccion_empresa}/>
                        </Tooltip>
                    </Form.Item>
                </Col>
            </Row>

            {/*<Row gutter={16}>  RECORDAD QUE SE DEBEN AGREGAR NUEVAMENTO LOS DATOS EN EL ESQUEMA DE LA BASE DE DATOS
                <Col className="gutter-row" span={16}>
                    <Form.Item
                        name="certificado_camara_comercio" 
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Seleccione un archivo',
                                
                            }
                            ]}
                        valuePropName="file"
                        getValueFromEvent={normFile}>
                        <Tooltip placement="right" title="Debe cargar el documento pdf del certificado de Cámara y Comercio de su empresa">
                            <Upload name="logo" action="/upload.do" listType="text">
                                <Button style={{width:'100%'}} icon={<UploadOutlined />}>Cargar el certificado de Cámara y Comercio</Button>
                            </Upload>
                        </Tooltip>  
                    </Form.Item>                    
                </Col>
                <Col className="gutter-row" span={8}>
                    <Form.Item style={{width:'100%'}}
                        name="certificado_camara_comercio" 
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Seleccione un archivo',
                            }
                            ]}
                        valuePropName="file"
                        getValueFromEvent={normFile}>
                        <Tooltip placement="right" title="Debe cargar el documento pdf del RUT de su empresa">
                            <Upload  name="logo" action="/upload.do" listType="text">
                                <Button style={{width:'100%'}}  icon={<UploadOutlined />}>Cargar el RUT</Button>
                            </Upload>
                        </Tooltip>
                    </Form.Item>                    
                </Col>
                        </Row>*/}
            <Row gutter={16}>
                <Col className="gutter-row" span={12}>
                    <Form.Item>
                        <Tooltip placement="left" title="Debe diligenciar la reseña o descripción de su empresa">
                            <Input.TextArea 
                                type="text"
                                name="resena"
                                rows={1}
                                icon={<PicRightOutlined  style={{ color: "rgba(0,0,0,0.25)"}} />}
                                placeholder="Reseña"
                                className="register-form__input"
                                maxLength = {300}
                                onChange={inputValidation}
                                value={inputs.resena}/>
                                
                        </Tooltip>
                    </Form.Item> 
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item hasFeedback>
                        <Tooltip placement="left" title="Debe ingresar el enlace del youtube en el que se encuentra el video de presentación de su empresa">
                            <Input
                                name="video_presentacion"
                                prefix={<UserOutlined style={{ color: "rgba(0,0,0,0.25)"}} />}
                                placeholder="URL de youtube  - video de presentación"
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
                        <Tooltip placement="left" title="Ingrese una contraseña segura para acceder a la plataforma">
                            <Input
                                name="contrasena"
                                type="password"
                                prefix={<LockOutlined style={{color: "rgba(0,0,0,0.25)"}}/> }
                                placeholder="Contraseña"
                                className="register-form__input"
                                onChange={inputValidation}
                                value={inputs.contrasena}/>
                        </Tooltip>
                    </Form.Item> 
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item>
                        <Tooltip placement="left" title="Ingrese nuevamente la contraseña">
                            <Input
                                name="repeatcontrasena"
                                type="password"
                                prefix={<LockOutlined style={{color: "rgba(0,0,0,0.25)"}}/>}
                                placeholder="Repetir contraseña"
                                className="register-form__input"
                                onChange={inputValidation}
                                value={inputs.repeatcontrasena}/>
                        </Tooltip>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col className="gutter-row" span={24} style={{textAlign:'left'}}>
                    <Form.Item>
                        <Checkbox name="privacyPolicy" onChange={inputValidation}>
                            He leído y acepto la política de privacidad
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
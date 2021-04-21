import React from 'react';
import {Button, Col, Layout, Row, Typography } from 'antd';
import { Redirect } from "react-router-dom";

//import Productos from '../../../components/Admin/RegistrarProducto';
//import InfoEmpresa from '../../../components/Admin/InfoEmpresa';

import './Empresa.scss';

export default function Empresa(){
    return (
        <Layout className="empresa">
            <Row className="empresa__row-alta">
                <Col className="empresa__row-alta-medio">
                    <Typography variant="h1" className="empresa__row-alta-medio-h1"> AGROLINK B2B</Typography>
                </Col>
            </Row>
            <Row className="empresa__fondo">
                <Row className="empresa__row">
                    <Col span={12} className="empresa__col">
                        <Button type="link" className="empresa__col-button">
                            <Typography variant="h1" className="empresa__col-button-h1">FICHA <br /> TÉCNICA</Typography>                 
                        </Button>
                    </Col>
                    <Col span={12} className="empresa__col">
                        <Button type="link" className="empresa__col-button">
                            <Typography variant="h1" className="empresa__col-button-h1_2">PRODUCTOS</Typography>                 
                        </Button>
                    </Col>
                </Row>
            </Row>
            <Row className="empresa__row-baja"></Row>
        </Layout>
    )
}
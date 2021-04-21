import React from 'react';

import {Card, Col,Row} from 'antd';

const contentStyle = {
    height: '160px',
    color: '#000',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#fff',
    width: '240px',

  };

export default function Home(){

    const { Meta } = Card;

    return(

            <Row style={{justifyContent : "center"}}>
                <Col span={4}>
                    <Card
                        hoverable
                        style={contentStyle}
                        cover={<img alt="example" src="../assets/img/png/LOGO_VERDE.png" />}
                    >
                        <Meta style={{height: "200px", width:"auto"}} title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                </Col>
                
                <Col span={4}>
                    <Card
                        hoverable
                        style={contentStyle}
                        cover={<img alt="example" src="../assets/img/png/LOGO_VERDE.png" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                </Col>
                <Col span={4}>
                    <Card
                        hoverable
                        style={contentStyle}
                        cover={<img alt="example" src="../assets/img/png/LOGO_VERDE.png" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                </Col>
                <Col span={4}>
                    <Card
                        hoverable
                        style={contentStyle}
                        cover={<img alt="example" src="../assets/img/png/LOGO_VERDE.png" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                </Col>
                <Col span={4}>
                    <Card
                        hoverable
                        style={contentStyle}
                        cover={<img alt="example" src="../assets/img/png/LOGO_VERDE.png" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                </Col>                
            </Row>
    )
    
}
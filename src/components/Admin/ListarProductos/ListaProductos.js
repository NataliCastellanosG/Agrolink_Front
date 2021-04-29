import React from "react";
import { Carousel, Layout, Row } from "antd";

import "./ListaProductos.scss";

export default function listarProductos(props) {
  const { productosActivos, productosInactivos } = props;
  console.log(productosActivos, productosInactivos);
  return (
    <Layout className="lista-productos">
      <Carousel></Carousel>
    </Layout>
  );
}

import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button, Carousel, Layout, Row } from "antd";
import {
  LeftOutlined,
  RadiusBottomrightOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { obtenerImagenApi } from "../../../api/producto";
import NoDocument from "../../../assets/img/png/documento.png";

import "./ListaProductos.scss";

export default function ListarProductos(props) {
  const { productosActivos, productosInactivos } = props;

  return (
    <Layout className="lista-productos">
      <Layout className="lista-productos__contenedor-principal">
        <Button
          id="flecha-izquierda"
          class="lista-productos__contenedor-principal-boton lista-productos__contenedor-principal-boton-izq"
        >
          <LeftOutlined style={{ color: "#f4e995", fontWeight: "900" }} />
        </Button>
        <div className="lista-productos__contenedor-carousel">
          <Carousel>
            <div>
              {productosActivos.productos.map((producto) => (
                <AsignarURL producto={producto} />
              ))}
            </div>
          </Carousel>
        </div>

        <Button
          id="flecha-izquierda"
          class="lista-productos__contenedor-principal-boton lista-productos__contenedor-principal-boton-der"
        >
          <RightOutlined style={{ color: "#f4e995" }} />
        </Button>
      </Layout>
    </Layout>
  );
}

function AsignarURL(props) {
  const { producto } = props;
  const [imagenUrl, setImagenUrl] = useState();

  useEffect(() => {
    if (producto.imagen) {
      obtenerImagenApi(producto.imagen).then((response) => {
        setImagenUrl(response);
      });
    } else {
      setImagenUrl(null);
    }
  }, [producto]);

  return (
    <Button className="asignarImagen">
      <img
        className="asignarImagen__img"
        src={imagenUrl ? imagenUrl : NoDocument}
        alt="archivo"
      />
    </Button>
  );
}

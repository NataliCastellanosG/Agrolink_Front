import { basePath, apiVersion } from "./config";
import { ACCESS_TOKEN } from "../utils/constants";

export function registrarProductoApi(data) {
  const url = `${basePath}/${apiVersion}/registrar-producto/${data.productoid}`;
  console.log(url);
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem(ACCESS_TOKEN),
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.producto) {
        return { ok: true, message: result.message };
      }
      return { ok: false, message: result.message };
    })
    .catch((err) => {
      return { ok: false, message: err.message };
    });
}

export function mostrarProductosActivos(token, id, status) {
  const url = `${basePath}/${apiVersion}/productosActivos/${id}?active=${status}`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function cargarImagenApi(token, imagen, productoId) {
  const url = `${basePath}/${apiVersion}/cargar-imagen/${productoId}`;

  const formData = new FormData();
  formData.append("imagen", imagen, imagen.name);

  const params = {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function obtenerImagenApi(imagenName) {
  const url = `${basePath}/${apiVersion}/obtener-imagen/${imagenName}`;

  return fetch(url)
    .then((response) => {
      return response.url;
    })
    .catch((err) => {
      return err.message;
    });
}

export function actualizarProductoApi(token, producto, productoId) {
  const url = `${basePath}/${apiVersion}/actualizar-producto/${productoId}`;

  const params = {
    method: "PUT",
    body: JSON.stringify(producto),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

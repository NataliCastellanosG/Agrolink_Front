import { basePath, apiVersion } from "./config";

export function registrarProductoApi(data) {
  console.log(data);
  const url = `${basePath}/${apiVersion}/registrar-producto/${data.i}`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.empresa) {
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
